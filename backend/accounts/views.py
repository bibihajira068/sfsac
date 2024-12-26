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