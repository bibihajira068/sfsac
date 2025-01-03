# Generated by Django 5.1.4 on 2024-12-26 12:42

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='SecureFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('file', models.FileField(upload_to='secure_files/')),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
                ('key', models.BinaryField()),
                ('uploaded_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='FileShare',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('shared_with_email', models.EmailField(blank=True, max_length=254, null=True)),
                ('permission', models.CharField(choices=[('read', 'Read'), ('write', 'Write')], default='read', max_length=10)),
                ('expiration_date', models.DateTimeField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('shared_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_shares', to=settings.AUTH_USER_MODEL)),
                ('shared_with_user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='received_shares', to=settings.AUTH_USER_MODEL)),
                ('secure_file', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='files.securefile')),
            ],
        ),
    ]
