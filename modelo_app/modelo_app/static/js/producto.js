document.addEventListener("DOMContentLoaded", function () {
    cargarLocalidades();
    mostrarProductos();

    const form = document.querySelector("#create-product-form");

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();
            await agregarProducto();
        });
    }
});

async function cargarLocalidades() {
    try {
        let response = await fetch('/examen/api/localidades/');
        if (!response.ok) throw new Error("Error al obtener las localidades");

        let localidades = await response.json();
        let select = document.querySelector("#localidad");

        select.innerHTML = ""; 
        localidades.forEach(localidad => {
            let option = document.createElement("option");
            option.value = localidad.name;
            option.textContent = localidad.name;
            select.appendChild(option);
        });

        console.log("Localidades cargadas correctamente:", localidades);
    } catch (error) {
        console.error("Error cargando localidades:", error);
    }
}

async function contarProductosHoy() {
    try {
        let response = await fetch('/examen/api/productos/');
        if (!response.ok) throw new Error("No se pudieron obtener los productos");

        let productos = await response.json();
        let hoy = new Date().toISOString().split("T")[0];

        let productosHoy = productos.filter(producto => producto.fecha_creacion.startsWith(hoy));

        console.log(`Productos agregados hoy: ${productosHoy.length}`);
        return productosHoy.length;
    } catch (error) {
        console.error("Error al contar productos del día:", error);
        return 0; 
    }
}

async function agregarProducto() {
    const name = document.querySelector("#name").value;
    const precio = document.querySelector("#precio").value;
    const localidad = document.querySelector("#localidad").value;

    if (!name || !precio || !localidad) {
        alert("Todos los campos son obligatorios");
        return;
    }

    if (precio <= 0) {
        alert("El precio debe ser mayor a 0");
        return;
    }

    let productosHoy = await contarProductosHoy();
    if (productosHoy >= 10) {
        alert("No puedes agregar más de 10 productos en un solo día.");
        return;
    }

    const data = {
        name: name,
        precio: precio,
        localidad: localidad
    };

    console.log("Datos Enviados:", data);

    try {
        let response = await fetch('/examen/api/productos/crear/', {
            method: 'POST',
            headers: {
                "X-CSRFToken": document.querySelector("input[name=csrfmiddlewaretoken]").value,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        let result = await response.json();
        console.log("Respuesta del servidor:", result); 

        if (response.ok) {
            let productosRestantes = 9 - productosHoy;
            let mensaje = productosRestantes > 0 
                ? `Producto agregado con éxito. Te quedan ${productosRestantes} productos para agregar hoy.`
                : "Producto agregado con éxito. No puedes agregar más productos hoy.";

            alert(mensaje);

            document.querySelector("#create-product-form").reset();
            mostrarProductos();
        } else {
            alert("Error: " + result.message);
        }
    } catch (error) {
        console.error("Error al enviar producto:", error);
    }
}

async function mostrarProductos() {
    try {
        let response = await fetch('/examen/api/productos/');
        if (!response.ok) throw new Error("No se pudieron obtener los productos");

        let productos = await response.json();
        let tbody = document.querySelector("#productos-lista");
        tbody.innerHTML = "";

        productos.forEach(producto => {
            let fila = `
                <tr>
                    <td>${producto.name}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.localidad__name}</td>
                    <td><button class='boton-eliminar' onclick='eliminarProducto(${producto.id})'>Eliminar</button></td>
                </tr>
            `;
            tbody.innerHTML += fila;
        });

        console.log("Productos cargados correctamente:", productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
}

async function eliminarProducto(id) {
    if (!confirm("¿Estás seguro de que quieres eliminar este producto?")) return;

    try {
        let response = await fetch(`/examen/api/productos/${id}/`, {
            method: 'DELETE',
            headers: {
                "X-CSRFToken": window.CSRF_TOKEN,  
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            let errorData = await response.text();
            console.error("Error en el servidor:", errorData);
            alert("Error al eliminar el producto: " + errorData);
            return;
        }

        let result = await response.json();
        console.log("Respuesta del servidor:", result);

        alert("Producto eliminado con éxito");
        mostrarProductos();
    } catch (error) {
        console.error("Error al eliminar producto:", error);
    }
}
