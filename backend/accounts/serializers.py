from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.mail import send_mail
from rest_framework.exceptions import ValidationError
import random
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from accounts.models import User


User = get_user_model()
 
################################
# User Registration Serializer  
################################
 
class UserRegisterationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    class Meta:
        model = User
        fields = ["email", "username", "password", "password2"]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    # Validating Password and Confirm Password while Registering
    def validate(self, attrs):
        if User.objects.filter(email=attrs.get("email")).exists() or User.objects.filter(username=attrs.get("username")).exists():
            print("nonuniueerror") 
            raise serializers.ValidationError("User with this email or username already exists...")
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError("Passwords do not match")
        return attrs


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        # Authenticate the user
        user = authenticate(email=email, password=password)
        if not user:
            raise AuthenticationFailed("Invalid email or password")

        # Check if the user is active
        if not user.is_active:
            raise AuthenticationFailed("Your account is deactivated. Please contact support.")

        # Return the authenticated user
        data['user'] = user
        return data


 


################################
# Verify OTPs Serializer 
################################
    
class VerifyOTPSerializer(serializers.Serializer):
    email_otp = serializers.CharField(max_length=8)
    session_key = serializers.CharField(max_length=50)

    def validate(self, attrs):
        email_otp = attrs.get('email_otp')
        if email_otp is None :
            raise serializers.ValidationError("Please Enter the OTP")
        return attrs