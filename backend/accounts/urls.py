from django.urls import path
from .views import GoogleLoginWithJWT
from .views import   LoginView,  VerifyOTPView, UserRegistrationView

 
urlpatterns = [
    path("google-login/", GoogleLoginWithJWT.as_view(), name="google-login-jwt"),

    
    ################################

    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
]