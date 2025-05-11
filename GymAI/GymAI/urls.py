from django.contrib import admin
from django.urls import path
from core import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('saludo/', views.saludo, name='saludo'),
    path('register/', views.registrar, name='registrar'),
    path('home/', views.home, name='home'),
    path('', views.user_login, name='user_login'),
    path('logout/', views.logout_view, name='logout'),
    path('subir-ejercicio/', views.up_exercise, name='subir-ejercicio'),
    path('mis-ejercicios/', views.list_my_exercises, name='listar_ejercicios'),
    path('ejercicios-comunidad/', views.list_exercises, name='ejercicios-comunidad'),
    path('agente-ejercicios/', views.exercise_agent, name='agente-ejercicios'),

]
