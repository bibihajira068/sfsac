from django.contrib import admin
from .models import SecureFile, FileShare

@admin.register(SecureFile)
class SecureFileAdmin(admin.ModelAdmin):
    list_display = ('name', 'uploaded_by', 'uploaded_at', 'file')
    list_filter = ('uploaded_at', 'uploaded_by')
    search_fields = ('name', 'uploaded_by__username')
    ordering = ('-uploaded_at',)
    readonly_fields = ('uploaded_at',)

@admin.register(FileShare)
class FileShareAdmin(admin.ModelAdmin):
    list_display = (
        'secure_file', 
        'shared_with_user', 
        'shared_with_email', 
        'shared_by', 
        'permission', 
        'expiration_date', 
        'created_at',
        'is_expired'
    )
    list_filter = ('permission', 'expiration_date', 'shared_by')
    search_fields = (
        'secure_file__name', 
        'shared_with_email', 
        'shared_by__username', 
        'shared_with_user__username'
    )
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)

    def is_expired(self, obj):
        return obj.is_expired()
    is_expired.boolean = True  # Show True/False as a tick/cross icon
    is_expired.short_description = 'Expired?'
