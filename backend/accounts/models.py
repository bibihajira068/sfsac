from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin
from django.db import models

class UserManager(BaseUserManager):
    
    def create_user(self, email, username=None, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        extra_fields.setdefault('is_active', True)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password=password, **extra_fields)

class User(AbstractUser, PermissionsMixin):
    
    email = models.EmailField(unique=True) 
    profile_picture = models.URLField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    google_id = models.CharField(max_length=100, blank=True, null=True, unique=True)
    profile_picture = models.URLField(blank=True, null=True)
    is_google_authenticated = models.BooleanField(default=False)
    otp = models.CharField(max_length=10, null=True, blank=True)
    objects = UserManager()

    USERNAME_FIELD = 'email'  
    REQUIRED_FIELDS = ['username'] 
    def _str_(self):
        return self.email