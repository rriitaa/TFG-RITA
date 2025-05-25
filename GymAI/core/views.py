from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth import login, authenticate
from .forms import EmailLoginForm, UserRegisterForm, EjercicioForm
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import logout
from .models import Ejercicio
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
#import openai

# Definimos el cliente de OpenAI

def index(request):
    return render(request, 'core/index.html')

def categorias(request):
    return render(request, "core/categorias.html")

def categoria_fuerza(request):
    return render(request, "core/ejercicios_fuerza.html")

def categoria_cardio(request):
    return render(request, "core/ejercicios_cardio.html")

def categoria_flexibilidad(request):
    return render(request, "core/ejercicios_flexibilidad.html")

def categoria_gluteos(request):
    return render(request, "core/ejercicios_gluteos.html")

def categoria_espalda(request):
    return render(request, "core/ejercicios_espalda.html")

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
    if not request.user.is_authenticated:
        messages.warning(request, "Debes iniciar sesión para subir ejercicios.")
        return redirect('user_login')
    return render(request, "core/inicio.html")

def recuperar_contrasena(request):
    return render(request, 'core/recuperar.html')

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


def up_exercise(request):
    if not request.user.is_authenticated:
        messages.warning(request, "Debes iniciar sesión para subir ejercicios.")
        return redirect('user_login')


    if request.method == 'POST':
        form = EjercicioForm(request.POST)
        if form.is_valid():
            ejercicio = form.save(commit=False)
            ejercicio.usuario = request.user  # Asignar el usuario actual
            ejercicio.save()
            return redirect('listar_ejercicios')
        else:
            print("Error en el formulario", form.errors)
            messages.error(request, "Error al subir el ejercicio")
            return redirect('subir-ejercicio')
    else:
        print("Es Get")
        form = EjercicioForm()
    return render(request, 'core/sube-ejers.html', {'form': form})

def list_exercises(request):
    if not request.user.is_authenticated:
        messages.warning(request, "Debes iniciar sesión para subir ejercicios.")
        return redirect('user_login')

    ejercicios = Ejercicio.objects.order_by('-fecha_creacion')[:6]
    return render(request, 'core/mis-publis.html', {'ejercicios': ejercicios})


def list_my_exercises(request):
    if not request.user.is_authenticated:
        messages.warning(request, "Debes iniciar sesión para subir ejercicios.")
        return redirect('user_login')

    ejercicios = Ejercicio.objects.filter(usuario=request.user)
    return render(request, 'core/mis-publis.html', {'ejercicios': ejercicios})


@csrf_exempt
def exercise_agent(request):
    print("Ejecutando el agente de ejercicios")

    if not request.user.is_authenticated:
        messages.warning(request, "Debes iniciar sesión para utilizar la plataforma.")
        return redirect('user_login')

    if request.method == "POST":
        data = json.loads(request.body)
        user_message = data.get("message", "")

        if not user_message:
            return JsonResponse({"response": "No se recibió ningún mensaje."})

        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "Eres un entrenador personal experto en rutinas y consejos de ejercicio físico."},
                    {"role": "user", "content": user_message}
                ]
            )

            respuesta = response.choices[0].message.content
            return JsonResponse({"response": respuesta})
        except Exception as e:
            print("Error con OpenAI:", str(e))
            return JsonResponse({"response": "Ocurrió un error al conectar con la IA. Intenta nuevamente."})
    else:
        return render(request, "core/ia-asistente.html")

def logout_view(request):
    logout(request)
    return redirect('user_login')