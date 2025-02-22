from django.shortcuts import render , get_object_or_404
from django.http import HttpResponse, JsonResponse , HttpResponseRedirect
from django.urls import reverse
import json
from .models import User

def createUserView(request):
    return render(request,"users/create.html")

def createUserByFetch(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    return JsonResponse({
        "NOMBRE_RECIBIDO": body.get("name")
    })

def createUser(request):
    data = {}
    try:
        if request.method == "POST":
            name = request.POST.get("name")
            email = request.POST.get("email")
            age = request.POST.get("age")
            rfc = request.POST.get("rfc")
            photo = request.POST.get("photo")

            user = User(name=name,email=email,age=age,rfc=rfc,photo=photo)
            user.save()
            data["user"] = user
            data["message"] = "User created"
            data["status"] = "success"
    except Exception as e:
        print("Error al crear usuario:", e)
        data["message"] = str(e)
        data["status"] = "error"
    return render(request, "users/create.html",data)


def userDetail(request,id):
    user = get_object_or_404(User, id=id)
    return render(request,"users/detail.html",{"user": user})

def usersIndex(request):
    users = User.objects.all()
    data = {
        "users": users,
        "titulo": "Lista de Clientes",
        "total_users": users.count()
    }
    return render(request, 'users/index.html', data)


def updateUser(request, id):
    user = get_object_or_404(User, id=id)

    if request.method == "POST":
        user.name = request.POST["name"]
        user.email = request.POST["email"]
        user.age = request.POST["age"]
        user.rfc = request.POST["rfc"]
        user.photo = request.POST["photo"]
        user.save()
        
        return HttpResponseRedirect(reverse("indexUsers")) 

    return render(request, "users/detail.html", {"user": user})