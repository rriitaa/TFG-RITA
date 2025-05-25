from django.contrib import admin
from django.urls import path
from core import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', views.registrar, name='registrar'),
    path('home/', views.home, name='home'),
    path('', views.index, name='index'),
    path('login/', views.user_login, name='user_login'),
    path('logout/', views.logout_view, name='logout'),
    path('subir-ejercicio/', views.up_exercise, name='subir-ejercicio'),
    path('mis-ejercicios/', views.list_my_exercises, name='listar_ejercicios'),
    path('ejercicios-comunidad/', views.list_exercises, name='ejercicios-comunidad'),
    path('agente-ejercicios/', views.exercise_agent, name='agente-ejercicios'),
    path('recuperar-contrasena/', views.recuperar_contrasena, name='recuperar-contrasena'),
    path('categorias/', views.categorias, name='categorias'),
    path('categoria_fuerza/', views.categoria_fuerza, name='categoria_fuerza'),
    path('categoria_cardio/', views.categoria_cardio, name='categoria_cardio'),
    path('categoria_flexibilidad/', views.categoria_flexibilidad, name='categoria_flexibilidad'),
    path('categoria_gluteos/', views.categoria_gluteos, name='categoria_gluteos'),
    path('categoria_espalda/', views.categoria_espalda, name='categoria_espalda'),
    


]
