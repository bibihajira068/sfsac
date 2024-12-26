from django.urls import path
from .views import GoogleLoginWithJWT

urlpatterns = [
    path("login/", GoogleLoginWithJWT.as_view(), name="google-login-jwt"),
]