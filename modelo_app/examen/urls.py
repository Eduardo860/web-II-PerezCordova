from django.urls import path
from .views import eventos, home , boletos , boletos_por_evento , agregar_evento , localidades_api ,createEvent , getEventos , deleteEvent , createProducto , getProductos , deleteProducto , agregarProducto

urlpatterns = [
    path('', home, name='home'),
    path('eventos/', eventos, name='eventos'),
    path('boletos/', boletos, name='boletos'),  
    path('boletos/<int:evento_id>/', boletos_por_evento, name='boletos_por_evento'),
    path('eventos/agregar/', agregar_evento, name='agregar_evento'),
    path('api/localidades/', localidades_api, name='localidades_api'),
    path('api/eventos/crear/', createEvent, name='crear_evento'), 
    path('api/eventos/', getEventos, name='get_eventos'),
    path('api/eventos/<int:id>/', deleteEvent, name='delete_event'),  
    path('productos/agregar/', agregarProducto, name='agregar_producto'),
    path('api/productos/crear/', createProducto, name='crear_producto'),
    path('api/productos/', getProductos, name='get_productos'),
    path('api/productos/<int:id>/', deleteProducto, name='delete_producto'),


]