from django.shortcuts import render
from .models import Evento, Boleto , Noticia

def home(request):
    noticias = list(Noticia.objects.all()[:2])  
    eventos = list(Evento.objects.all()[:3])

    print("Noticias obtenidas:", noticias) 
    print("Eventos obtenidos:", eventos)

    return render(request, 'examen/index.html', {'noticias': noticias, 'eventos': eventos})

def eventos(request):
    eventos = Evento.objects.all()
    return render(request, 'examen/eventos.html', {'eventos': eventos})

def boletos(request):
    boletos = Boleto.objects.all()
    return render(request, 'examen/boletos.html', {'boletos': boletos})

