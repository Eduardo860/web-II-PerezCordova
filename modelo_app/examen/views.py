from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404 , redirect
from django.urls import reverse
import json
from .models import Evento, Boleto, Noticia, Localidad , Producto
from django.utils.timezone import now
from django.views.decorators.csrf import csrf_exempt


def home(request):
    noticias = list(Noticia.objects.all()[:2])  
    eventos = list(Evento.objects.all()[:3])

    print("Noticias obtenidas:", noticias) 
    print("Eventos obtenidos:", eventos)

    return render(request, 'examen/index.html', {'noticias': noticias, 'eventos': eventos})

def eventos(request):
    eventos = Evento.objects.all()
    return render(request, 'examen/eventos.html', {'eventos': eventos})

def agregar_evento(request):
    return render(request, 'examen/agregar_evento.html')

def boletos(request):
    boletos = Boleto.objects.all()
    return render(request, 'examen/boletos.html', {'boletos': boletos})

def boletos_por_evento(request, evento_id):
    evento = get_object_or_404(Evento, id=evento_id)
    boletos = Boleto.objects.filter(evento=evento)

    return render(request, 'examen/boletos.html', {'evento': evento, 'boletos': boletos})

def agregarProducto(request):
    return render(request, "examen/agregar_producto.html")



# Obtener localidades 
def localidades_api(request):
    localidades = list(Localidad.objects.values('id', 'name'))
    return JsonResponse(localidades, safe=False)


# Crear Evento
def createEvent(request):
    if request.method == "POST":
        try:
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)  # ✅ Leer JSON correctamente

            name = body.get("name")
            fecha_inicio = body.get("fecha_inicio")
            fecha_fin = body.get("fecha_fin")
            localidad = body.get("localidad")
            imagen_url = body.get("imagen_url")

            print("Datos Recibidos:", name, fecha_inicio, fecha_fin, localidad, imagen_url)

            if not name or not fecha_inicio or not fecha_fin or not localidad:
                return JsonResponse({"message": "Todos los campos son obligatorios", "status": "error"}, status=400)

            if now().isoformat() > fecha_inicio:
                return JsonResponse({"message": "La fecha de inicio debe ser mayor al día actual", "status": "error"}, status=400)

            localidad_obj = get_object_or_404(Localidad, name=localidad)

            evento = Evento(
                name=name,
                fecha_inicio=fecha_inicio,
                fecha_fin=fecha_fin,
                localidad=localidad_obj,
                imagen_url=imagen_url if imagen_url else "https://via.placeholder.com/300x180"
            )
            evento.save()

            print("Evento Creado:", evento.id)

            return JsonResponse({"message": "Evento creado con éxito", "status": "success", "evento_id": evento.id}, status=201)

        except Exception as e:
            print("Error al crear evento:", e)
            return JsonResponse({"message": "Error interno", "error": str(e), "status": "error"}, status=500)

    return JsonResponse({"message": "Método no permitido, usa POST", "status": "error"}, status=405)
    

# Listar eventos
def getEventos(request):
    eventos = Evento.objects.all().values(
        "id", "name", "fecha_inicio", "fecha_fin", "localidad__name"
    )

    eventos_list = list(eventos)

    return JsonResponse(eventos_list, safe=False)

# Eliminar Evento
def deleteEvent(request, id):
    if request.method == "DELETE":
        try:
            evento = get_object_or_404(Evento, id=id)
            evento.delete()
            return JsonResponse({"message": "Evento eliminado con éxito"}, status=200)
        except Exception as e:
            return JsonResponse({"message": "Error al eliminar evento", "error": str(e)}, status=500)

    return JsonResponse({"message": "Método no permitido", "status": "error"}, status=405)


# Crear Producto
def createProducto(request):
    if request.method == "POST":
        try:
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode) 

            name = body.get("name")
            precio = body.get("precio")
            localidad = body.get("localidad")

            if not name or not precio or not localidad:
                return JsonResponse({"message": "Todos los campos son obligatorios", "status": "error"}, status=400)

            if float(precio) <= 0:
                return JsonResponse({"message": "El precio debe ser mayor a 0", "status": "error"}, status=400)

            localidad_obj = get_object_or_404(Localidad, name=localidad)

            producto = Producto(
                name=name,
                precio=precio,
                localidad=localidad_obj,
                fecha_creacion=now()  
            )
            producto.save()

            print("Producto Creado:", producto.id)

            return JsonResponse({"message": "Producto creado con éxito", "status": "success", "producto_id": producto.id}, status=201)

        except Exception as e:
            print("Error al crear producto:", e)
            return JsonResponse({"message": "Error interno", "error": str(e), "status": "error"}, status=500)

    return JsonResponse({"message": "Método no permitido, usa POST", "status": "error"}, status=405)


# Listar productos
def getProductos(request):
    productos = Producto.objects.all().values(
        "id", "name", "precio", "fecha_creacion", "localidad__name"
    )

    productos_list = list(productos)

    return JsonResponse(productos_list, safe=False)


# Eliminar Producto 
def deleteProducto(request, id):
    if request.method == "DELETE":
        try:
            producto = get_object_or_404(Producto, id=id)
            producto.delete()
            return JsonResponse({"message": "Producto eliminado con éxito"}, status=200)
        except Exception as e:
            return JsonResponse({"message": "Error al eliminar producto", "error": str(e)}, status=500)

    return JsonResponse({"message": "Método no permitido", "status": "error"}, status=405)




