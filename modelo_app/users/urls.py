from django.urls import path

from . import views

urlpatterns = [
    path("home", views.usersIndex, name="indexUsers"),
    path("create", views.createUserView, name="createUserView"),
    path("createUser", views.createUser, name="createUser"),
    path("details/<int:id>",views.userDetail,name="userDetail"),
    path("update/<int:id>/", views.updateUser, name="updateUser"),
    path("createUser-by-fetch/",views.createUserByFetch,name="createUser-by-fetch"),

]

