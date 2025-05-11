from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Profile, Ejercicio
from django.contrib.auth import authenticate


class UserRegisterForm(UserCreationForm):
    first_name = forms.CharField(max_length=30, required=True, help_text='Nombre')
    last_name = forms.CharField(max_length=30, required=True, help_text='Apellido')
    peso = forms.FloatField(required=False)
    altura = forms.FloatField(required=False)
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password1', 'password2', 'email']

    def save(self, commit=True):
        
        user = super().save(commit=False)
        if commit:
            user.save()
        return user


class EmailLoginForm(forms.Form):
    email = forms.EmailField(label="Correo electrónico")
    password = forms.CharField(label="Contraseña", widget=forms.PasswordInput)

    def clean(self):
        email = self.cleaned_data.get('email')
        password = self.cleaned_data.get('password')
        if email and password:
            # Buscar el usuario manualmente
            from django.contrib.auth.models import User
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                raise forms.ValidationError("Usuario no encontrado.")

            # Verificar la contraseña
            self.user = authenticate(username=user.username, password=password)
            if self.user is None:
                raise forms.ValidationError("Email o contraseña incorrectos.")
        return self.cleaned_data

    def get_user(self):
        return self.user

class EjercicioForm(forms.ModelForm):
    class Meta:
        model = Ejercicio
        fields = ['titulo', 'categoria', 'descripcion']