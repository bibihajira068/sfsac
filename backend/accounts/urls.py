from django.urls import path
from .views import GoogleLoginWithJWT
from .views import RegisterView, LoginView, LogoutView, OTPVerificationView


urlpatterns = [
    path("google-login/", GoogleLoginWithJWT.as_view(), name="google-login-jwt"),

    
    ################################

    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('verify-otp/', OTPVerificationView.as_view(), name='verify-otp'),
]