from django.db import models

# Modelo de Localidad
class Localidad(models.Model):
    name = models.CharField(max_length=100, null=False)
    estatus = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "Localidades"

    def __str__(self):
        return self.name

# Modelo de Evento
class Evento(models.Model):
    name = models.CharField(max_length=300, null=False)
    fecha_inicio = models.DateTimeField(null=False)
    fecha_fin = models.DateTimeField(null=False)
    localidad = models.ForeignKey(Localidad, on_delete=models.CASCADE)

    descripcion = models.TextField(
        default="Descripción no disponible.",
        verbose_name="Descripción del Evento"
    )

    imagen_url = models.CharField(
        max_length=500,
        default="https://via.placeholder.com/300x180",
        verbose_name="Imagen del Evento"
    )

    def __str__(self):
        return self.name

# Modelo de Producto
class Producto(models.Model):
    name = models.CharField(max_length=200)
    precio = models.FloatField()
    localidad = models.ForeignKey(Localidad, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

# Modelo de Tipo de Boleto
class TipoBoleto(models.Model):
    name = models.CharField(max_length=100, unique=True)  

    def __str__(self):
        return self.name

# Modelo de Boleto
class Boleto(models.Model):
    precio = models.FloatField(null=False)
    tipo_boleto = models.ForeignKey(TipoBoleto, on_delete=models.SET_NULL, null=True, blank=True)
    evento = models.ForeignKey(Evento, on_delete=models.CASCADE)
    fecha = models.DateTimeField()

    def __str__(self):
        return f"{self.tipo_boleto.name if self.tipo_boleto else 'Sin Tipo'} - {self.evento.name} - ${self.precio}"
    

class Noticia(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=200)  
    imagen_url = models.CharField(
        max_length=500, 
        default="https://via.placeholder.com/300", 
        verbose_name="Imagen de la Noticia"
    )

    def __str__(self):
        return self.nombre

