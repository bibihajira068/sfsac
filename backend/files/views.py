from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import SecureFile , FileShare
from django.http import HttpResponse
from cryptography.fernet import Fernet
from django.urls import reverse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.timezone import now
from .models import SecureFile, FileShare
from datetime import timedelta



class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        uploaded_file = request.FILES['file']
        file_data = uploaded_file.read()
        
        encrypted_data, key = SecureFile.encrypt_file(file_data)

        secure_file = SecureFile.objects.create(
            name=uploaded_file.name,
            encrypted_file=encrypted_data,
            key=key
        )

        return Response({"message": "File uploaded and encrypted successfully", "file_id": secure_file.id})




class FileDownloadView(APIView):
    def get(self, request, file_id):
        try:
            secure_file = SecureFile.objects.get(id=file_id)
            cipher = Fernet(secure_file.key)
            decrypted_data = cipher.decrypt(secure_file.encrypted_file)
            
            response = HttpResponse(decrypted_data, content_type="application/octet-stream")
            response['Content-Disposition'] = f'attachment; filename="{secure_file.name}"'
            return response
        except SecureFile.DoesNotExist:
            return Response({"error": "File not found"}, status=404)




class SharedFileDownloadView(APIView):
    def get(self, request, share_id):
        try:
            share = FileShare.objects.get(id=share_id)
            if not share.is_valid():
                return Response({"error": "Link expired"}, status=403)

            cipher = Fernet(share.secure_file.key)
            decrypted_data = cipher.decrypt(share.secure_file.encrypted_file)

            response = HttpResponse(decrypted_data, content_type="application/octet-stream")
            response['Content-Disposition'] = f'attachment; filename="{share.secure_file.name}"'
            return response
        except FileShare.DoesNotExist:
            return Response({"error": "Invalid link"}, status=404)




class FileShareView(APIView):
    def post(self, request, file_id):
        try:
            # Fetch the secure file
            secure_file = SecureFile.objects.get(id=file_id)
            
            # Extract data from the request
            shared_with = request.data.get("email")
            permission = request.data.get("permission", "read")  # Default to read permission
            expiration_days = request.data.get("expiration", 7)  # Default to 7 days

            # Calculate expiration date
            expiration_date = now() + timedelta(days=expiration_days)

            # Create the FileShare object
            share_link = FileShare.objects.create(
                secure_file=secure_file,
                shared_with=shared_with,
                permission=permission,
                expiration_date=expiration_date
            )

            # Generate the shareable link
            share_url = request.build_absolute_uri(
                reverse("file-share", kwargs={"share_id": share_link.id})
            )

            return Response(
                {
                    "message": "Share link created successfully",
                    "share_link": share_url,
                },
                status=status.HTTP_201_CREATED,
            )
        except SecureFile.DoesNotExist:
            return Response(
                {"error": "File not found"}, status=status.HTTP_404_NOT_FOUND
            )
