from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.mail import send_mail
from rest_framework.exceptions import ValidationError
import random
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken


User = get_user_model()

#Registration serializers
class RegistrationSerializer(serializers.ModelSerializer):
    print("serializers.RegistrationSerializer")
    password = serializers.CharField(write_only=True, validators=[validate_password])
    otp = serializers.IntegerField(read_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'otp']

    def create(self, validated_data):
        otp = random.randint(100000, 999999)  
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
        )
        user.is_active = False  # Inactive until OTP is verified
        user.save()

        # Send OTP via email
        send_mail(
            subject='Your OTP for Registration',
            message=f'Your OTP is {otp}',
            from_email = "akashkr.sahebjung5@gmail.com",
            recipient_list=[user.email],
        )
       
        user.otp = otp  # Assuming you add an `otp` field to the User model temporarily
        user.save()
        return user

#login serializers

# class LoginSerializer(TokenObtainPairSerializer):
#     def validate(self, attrs):
#         data = super().validate(attrs)
#         user = self.user

#         if not user.is_google_authenticated:
#             if not user.is_active:
#                 raise ValidationError('User is not active. Please complete the OTP verification.')
#         data['email'] = user.email
#         data['username'] = user.username
#         return data
    
        
        
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from accounts.models import User

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


#logout serializers

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            token.blacklist()
        except Exception as e:
            raise ValidationError('Invalid token.')


#otp serializer
class OTPVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    # otp = serializers.IntegerField()
    otp = serializers.CharField()

    def validate(self, attrs):
        email = attrs['email']
        otp = attrs['otp']
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise ValidationError('Invalid email or OTP.')
        
        if user.otp != otp:
            raise ValidationError('Invalid OTP.')
        return attrs

    def save(self, **kwargs):
        email = self.validated_data['email']
        user = User.objects.get(email=email)
        user.is_active = True  # Activate the user
        user.otp = None  # Clear OTP
        user.save()
        return user
