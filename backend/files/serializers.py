from rest_framework import serializers
from .models import SecureFile, FileShare

class SecureFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SecureFile
        fields = ['id', 'name', 'file', 'uploaded_by', 'uploaded_at']

class FileShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileShare
        fields = ['id', 'secure_file', 'shared_with_user', 'shared_with_email', 'permission', 'expiration_date', 'shared_by', 'created_at']
        read_only_fields = ['shared_by', 'created_at']
