from django.urls import path
from .views import SecureFileUploadView, SecureFileListView, FileShareView, SharedFileDownloadView

urlpatterns = [
    path('upload/', SecureFileUploadView.as_view(), name='secure_file_upload'),
    path('listfiles/', SecureFileListView.as_view(), name='secure_file_list'),
    path('share/', FileShareView.as_view(), name='file_share'),
    path('shared/<int:share_id>/', SharedFileDownloadView.as_view(), name='shared_file_download'),
]
