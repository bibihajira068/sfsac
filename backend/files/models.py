from django.db import models

# Create your models here.
from cryptography.fernet import Fernet
from accounts.models import User
from django.utils.timezone import now

class SecureFile(models.Model):
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to="secure_files/")
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    key = models.BinaryField()  # Store the encryption key securely
    
    @staticmethod
    def encrypt_file(file_data):
        key = Fernet.generate_key()
        cipher = Fernet(key)
        encrypted_data = cipher.encrypt(file_data)
        return encrypted_data, key

class FileShare(models.Model):
    secure_file = models.ForeignKey(SecureFile, on_delete=models.CASCADE)
    shared_with_user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name="received_shares"
    )
    shared_with_email = models.EmailField(null=True, blank=True)
    permission = models.CharField(max_length=10, choices=[("read", "Read"), ("write", "Write")], default="read")
    expiration_date = models.DateTimeField(null=True, blank=True)
    shared_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="created_shares")
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        return self.expiration_date and self.expiration_date < now()

    def is_valid(self):
        return now() < self.expiration_date