from django.contrib import admin
from django.urls import include, path
from .views import index_view 

urlpatterns = [
    path('admin/', admin.site.urls),
    path("orders/",include('orders.urls')),
    path("users/",include('users.urls')),
    path("", index_view, name="index"),
   ]
