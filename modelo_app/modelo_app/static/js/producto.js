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

// ✅ 1. Cargar localidades dinámicamente en el `<select>`
async function cargarLocalidades() {
    try {
        let response = await fetch('/examen/api/localidades/');
        if (!response.ok) throw new Error("Error al obtener las localidades");

        let localidades = await response.json();
        let select = document.querySelector("#localidad");

        select.innerHTML = ""; // Limpiar opciones antes de agregar nuevas
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

// ✅ 2. Agregar un nuevo producto con `fetch`
async function agregarProducto() {
    const name = document.querySelector("#name").value;
    const precio = document.querySelector("#precio").value;
    const localidad = document.querySelector("#localidad").value;

    // 📌 Validaciones
    if (!name || !precio || !localidad) {
        alert("Todos los campos son obligatorios");
        return;
    }

    if (precio <= 0) {
        alert("El precio debe ser mayor a 0");
        return;
    }

    const data = {
        name: name,
        precio: precio,
        localidad: localidad
    };

    console.log("Datos Enviados:", data); // 🔥 Verifica que los datos se están enviando correctamente

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
        console.log("Respuesta del servidor:", result); // 🔥 Verifica la respuesta

        if (response.ok) {
            alert("Producto agregado con éxito");
            document.querySelector("#create-product-form").reset();
            mostrarProductos(); // ✅ Refrescar la lista
        } else {
            alert("Error: " + result.message);
        }
    } catch (error) {
        console.error("Error al enviar producto:", error);
    }
}

// ✅ 3. Mostrar los productos en la tabla
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

// ✅ 4. Eliminar un producto
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
