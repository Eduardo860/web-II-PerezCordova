from django.contrib import admin
from .models import Localidad, Evento, Producto, TipoBoleto, Boleto , Noticia

# Registrar los modelos en el Django Admin
admin.site.register(Localidad)
admin.site.register(Evento)
admin.site.register(Producto)
admin.site.register(TipoBoleto)
admin.site.register(Boleto)
admin.site.register(Noticia)