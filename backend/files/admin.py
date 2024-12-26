from django.contrib import admin

# Register your models here.
from .models import SecureFile, FileShare

@admin.register(SecureFile)
class SecureFileAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    readonly_fields = ('key',)
    search_fields = ('name',)

@admin.register(FileShare)
class FileShareAdmin(admin.ModelAdmin):
    list_display = ('id', 'secure_file', 'shared_with', 'expiration_date', 'permission')
    search_fields = ('shared_with',)
    list_filter = ('expiration_date', 'permission')
