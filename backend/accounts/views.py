from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from django.http import JsonResponse
from django.contrib.sessions.backends.db import SessionStore
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.serializers import LoginSerializer
from .models import *
from .serializers import *
from .utils import *
import pyotp 
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated



# # Create your views here.
# class GoogleLogin(SocialLoginView): # if you want to use Authorization Code Grant, use this
#     adapter_class = GoogleOAuth2Adapter
#     callback_url = "http://localhost:8000/accounts/google/login/callback/"
#     client_class = OAuth2Client

# class GoogleLogin(SocialLoginView): # if you want to use Implicit Grant, use this
#     adapter_class = GoogleOAuth2Adapter


class GoogleLoginWithJWT(SocialLoginView):
    """
    Handles Google OAuth2 login and returns JWT tokens.
    """
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    callback_url = "http://127.0.0.1:8000/accounts/google/login/callback/"  # Replace with your callback URL

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        # Get the user from the response
        user = self.request.user

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        tokens = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }

        # Include tokens in the response
        return Response({
            "tokens": tokens,
            "user": {
                "id": user.id,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
            },
        })
    


    ################################

 

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


# Create your views here.
################################
# User Registration APIView
################################

class UserRegistrationView(APIView):

    def post(self, request, format=None):
        
        if not request.session.exists(request.session.session_key):
            request.session.create() 
        # try:
        # print("session:", request.session)
        request.session["user"] = request.data
        request.session["username"] = request.data["username"]
        request.session["email"] = request.data["email"]
        request.session["password"] = request.data["password"]
        email = request.data["email"]
        # print("email:", email)
        print("data", request.data)
        if User.objects.filter(email=email).exists() or User.objects.filter(username=request.data["username"]).exists():
            # print("nonuniueerror") 
            # raise serializers.ValidationError("User with this email or username already exists...")
            return Response(
                {
                    "errors": {
                        "non_field_errors": ["User with this email or username already exists..."]
                    }
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = UserRegisterationSerializer(data=request.data)
        # print(serializer)
        serializer.is_valid(raise_exception=True)
        try:
            email_otp = send_otp_to_email(request, email)
        except Exception as e:
            return Response(
                {
                    "errors": {
                        "non_field_errors": ["Some technical Error Occured ...."]
                    }
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        print(email_otp)
    
    
        request.session["email_otp"] = email_otp
        print("session1", request.session._dict_)
        
        request.session.save()
        
        
    
        session_key = str(request.session.session_key)
        # print("session1key", session_key)
        return JsonResponse(
            # {"token": token, "msg": "Registration Successful"},
            {"session_key": session_key, "msg": "Credentials Taken, verify OTP for registration"},
            status=status.HTTP_201_CREATED,
        )
        # except Exception as e:
        #     print("Error sending", e)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 


################################
# Verify OTPs APIView
################################
 

class VerifyOTPView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        data = request.data
        # print("dict", data["sessionKey"])
     
        
        # if not request.session.exists(request.session.session_key):
        session_stored = SessionStore(session_key=data["session_key"])
        # print("session2", session_stored._dict_ ) 
        serializer = VerifyOTPSerializer(data=request.data)
        print(serializer)
        # serializer = VerifyOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email_otp = serializer.data["email_otp"]
        print('otps:', email_otp)
        print(request.session._dict_)
        # phone_otp_secret_key = request.session["phone_otp_secret_key"]
        email_otp_secret_key = session_stored.get("email_otp_secret_key")
        # email_otp_secret_key = request.session["email_otp_secret_key"]
        
        print("secret key:",  email_otp_secret_key)
        # valid_time = request.session["valid_time"]
        valid_time = session_stored.get("valid_time")
        print("valid time:", valid_time)
        if valid_time and email_otp_secret_key is not None:
            valid_untill = datetime.fromisoformat(valid_time)
            print(valid_untill)
            print(datetime.now())
            if valid_untill > datetime.now():
                email_totp = pyotp.TOTP(email_otp_secret_key, interval=900)
                if  email_totp.verify(email_otp):
                    print("all ok")
                    username=session_stored.get('username')
                    email=session_stored.get('email')
                    password=session_stored.get('password')
                    user= User.objects.create(username=username, email=email )
                    user.set_password(password)
                    token = get_tokens_for_user(user)
                    print("user", user)
                    # user.is_active = False # user will be active only when admin approves 
                    user.is_google_authenticated = True
                    user.save()
       
                    # here i'll delete the sessions
                    del session_stored
                    # del request.session['phone_otp_secret_key']
                    # del request.session['email_otp_secret_key']
                    # del request.session['phone_otp']
                    # del request.session['email_otp']
                    # del request.session['name']
                    # del request.session['password']
                    return JsonResponse({"token": token,"msg": "OTP Verified Successfully"}, status=status.HTTP_202_ACCEPTED)
            else:
                return JsonResponse({"msg": "OTP Time Expired"}, status=status.HTTP_408_REQUEST_TIMEOUT)
        else:
            return JsonResponse({"msg": "Please Enter the OTP"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(
                {
                    "errors": {
                        "non_field_errors": ["OTP Not correct, try again...."]
                    }
                },
            status=status.HTTP_406_NOT_ACCEPTABLE)
    
 
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'username': user.username,
                    'is_google_authenticated': user.is_google_authenticated,
                }
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)