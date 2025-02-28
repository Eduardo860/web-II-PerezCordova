from django.urls import path
from .views import eventos, home , boletos

urlpatterns = [
    path('', home, name='home'),
    path('eventos/', eventos, name='eventos'),
    path('boletos/', boletos, name='boletos'),  

]