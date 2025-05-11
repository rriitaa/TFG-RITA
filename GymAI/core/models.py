from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    peso = models.FloatField(null=True, blank=True)
    altura = models.FloatField(null=True, blank=True)
    email = models.EmailField(max_length=254)
    fecha_nacimiento = models.DateField(null=True, blank=True)
    
    def __str__(self):
        return f"Perfil de {self.user.username}"

class Ejercicio(models.Model):
    titulo = models.CharField(max_length=100)
    categoria = models.CharField(max_length=100)
    descripcion = models.TextField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)  # <-- Este campo se llena automáticamente
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.titulo

