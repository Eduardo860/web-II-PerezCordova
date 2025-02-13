from django.shortcuts import render
from django.http import HttpResponse
from .models import User

def usersIndex(request):
    users = User.objects.all()
    data = {
        "users": users,
        "titulo": "Lista de Clientes",
        "total_users": users.count()
    }
    return render(request, 'users/index.html', data)
