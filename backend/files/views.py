from django.utils.timezone import now
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import SecureFile, FileShare
from .serializers import SecureFileSerializer, FileShareSerializer
from django.shortcuts import get_object_or_404

# Upload a secure file
class SecureFileUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        file_data = request.FILES['file'].read()  # Get the file data
        encrypted_data, key = SecureFile.encrypt_file(file_data)  # Encrypt the file
        file_instance = SecureFile.objects.create(
            name=request.data.get('name'),
            file=request.FILES['file'],
            uploaded_by=request.user,
            key=key
        )
        serializer = SecureFileSerializer(file_instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# List all files uploaded by the user
class SecureFileListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        files = SecureFile.objects.filter(uploaded_by=request.user)
        serializer = SecureFileSerializer(files, many=True)
        return Response(serializer.data)

# Share a file
class FileShareView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = FileShareSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(shared_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Retrieve a shared file
class SharedFileDownloadView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, share_id):
        file_share = get_object_or_404(FileShare, id=share_id)

        # Check if the link is expired
        if file_share.is_expired():
            return Response({"error": "This share link has expired."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the user is authorized
        if file_share.shared_with_user != request.user and file_share.shared_with_email != request.user.email:
            return Response({"error": "You are not authorized to access this file."}, status=status.HTTP_403_FORBIDDEN)

        # Return file details
        serializer = SecureFileSerializer(file_share.secure_file)
        return Response(serializer.data)
