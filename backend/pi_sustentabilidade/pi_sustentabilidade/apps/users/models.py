from django.db import models

class Users(models.Model):  # ← Herdar de models.Model
    name = models.CharField(max_length=100)  # ← Campo Django
    email = models.EmailField(unique=True)
    image_url = models.URLField(blank=True, null=True)
    password = models.CharField(max_length=128)
    
    class Meta:
        verbose_name = "Usuário"
        verbose_name_plural = "Usuários"