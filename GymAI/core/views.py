from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth import login, authenticate
from .forms import EmailLoginForm, UserRegisterForm
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import logout

def saludo(request):
    return HttpResponse("Hola Mundo")

def registrar(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Cuenta creada exitosamente")
            return redirect('home')
    else:
        form = UserRegisterForm()
    return render(request, 'core/signup.html', {'form': form})

def home(request):
    return render(request, "core/inicio.html")

def user_login(request):
    if request.method == 'POST':
        form = EmailLoginForm(request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('home')
    else:
        form = EmailLoginForm()
    return render(request, 'core/login.html', {'form': form})

def logout_view(request):
    logout(request) # Esto lo hace django por nosotros
    return redirect('user_login')