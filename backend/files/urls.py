from django.urls import path
from .views import (
    FileUploadView,
    FileDownloadView,
    SharedFileDownloadView,
)

urlpatterns = [
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('download/<int:file_id>/', FileDownloadView.as_view(), name='file-download'),
    path('share/<int:share_id>/', SharedFileDownloadView.as_view(), name='file-share'),
]
