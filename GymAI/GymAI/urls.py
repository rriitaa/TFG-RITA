from django.contrib import admin
from django.urls import path
from core import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('saludo/', views.saludo, name='saludo'),
    path('register/', views.registrar, name='registrar'),
    path('home/', views.home, name='home'),
    path('login/', views.user_login, name='user_login'),
    path('logout/', views.logout_view, name='logout'),
]
