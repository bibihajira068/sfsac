from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView

# class GoogleLogin(SocialLoginView): # if you want to use Authorization Code Grant, use this
#     adapter_class = GoogleOAuth2Adapter
#     callback_url = "http://localhost:8000/accounts/google/login/callback/"
#     client_class = OAuth2Client

# class GoogleLogin(SocialLoginView): # if you want to use Implicit Grant, use this
#     adapter_class = GoogleOAuth2Adapter

# # Create your views here.
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

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

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView

from .serializers import (
    RegistrationSerializer,
    LoginSerializer,
    LogoutSerializer,
    OTPVerificationSerializer,
)

# class RegisterView(generics.CreateAPIView):
#     serializer_class = RegistrationSerializer
#     permission_classes = [AllowAny]

class RegisterView(APIView):

    def post(self, request, format = None):
        serializer = RegistrationSerializer(data = request.data)
        serializer.is_valid(raise_exception= True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# class LoginView(TokenObtainPairView):
#     serializer_class = LoginSerializer
#     permission_classes = [AllowAny]


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.serializers import LoginSerializer

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


class LogoutView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"detail": "Successfully logged out."}, status=status.HTTP_204_NO_CONTENT)

class OTPVerificationView(generics.GenericAPIView):
    serializer_class = OTPVerificationSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({"detail": "OTP verified successfully. Account activated."}, status=status.HTTP_200_OK)
