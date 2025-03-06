document.addEventListener("DOMContentLoaded", function () {
    cargarLocalidades();
    mostrarEventos();
    const form = document.querySelector("#create-event-form");

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();
            await agregarEvento();
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

async function verificarUltimaLocalidad(localidad) {
    try {
        let response = await fetch('/examen/api/eventos/');
        if (!response.ok) throw new Error("No se pudieron obtener los eventos");

        let eventos = await response.json();
        if (eventos.length > 0) {
            let ultimoEvento = eventos[eventos.length - 1]; 
            if (ultimoEvento.localidad__name === localidad) {
                alert("No puedes agregar dos eventos seguidos de la misma localidad.");
                return false;
            }
        }
        return true;
    } catch (error) {
        console.error("Error al verificar la última localidad:", error);
        return false;
    }
}

async function agregarEvento() {
    const name = document.querySelector("#name").value;
    const fecha_inicio = document.querySelector("#fecha_inicio").value;
    const fecha_fin = document.querySelector("#fecha_fin").value;
    const localidad = document.querySelector("#localidad").value;
    const imagen_url = document.querySelector("#imagen_url").value;

    let hoy = new Date();
    let inicio = new Date(fecha_inicio);
    let fin = new Date(fecha_fin);

    if (!name || !fecha_inicio || !fecha_fin || !localidad || !imagen_url) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    if (inicio < hoy) {
        alert("La fecha de inicio debe ser mayor al día de hoy.");
        return;
    }

    if (fin < inicio) {
        alert("La fecha de fin no puede ser menor que la fecha de inicio.");
        return;
    }

    let esValido = await verificarUltimaLocalidad(localidad);
    if (!esValido) return;  

    const data = {
        name: name,
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin,
        localidad: localidad,
        imagen_url: imagen_url
    };

    console.log("Datos Enviados:", data);

    try {
        let response = await fetch('/examen/api/eventos/crear/', {
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
            alert("Evento agregado con éxito");
            document.querySelector("#create-event-form").reset();
            mostrarEventos(); 
        } else {
            alert("Error: " + result.message);
        }
    } catch (error) {
        console.error("Error al enviar evento:", error);
    }
}

async function mostrarEventos() {
    try {
        let response = await fetch('/examen/api/eventos/');
        if (!response.ok) throw new Error("No se pudieron obtener los eventos");

        let eventos = await response.json();
        let tbody = document.querySelector("#eventos-lista");
        tbody.innerHTML = "";

        eventos.forEach(evento => {
            let fila = `
                <tr>
                    <td>${evento.name}</td>
                    <td>${evento.fecha_inicio}</td>
                    <td>${evento.fecha_fin}</td>
                    <td>${evento.localidad__name}</td>
                    <td><button class='boton-eliminar' onclick='eliminarEvento(${evento.id})'>Eliminar</button></td>
                </tr>
            `;
            tbody.innerHTML += fila;
        });

        console.log("Eventos cargados correctamente:", eventos);
    } catch (error) {
        console.error("Error al obtener eventos:", error);
    }
}

async function eliminarEvento(id) {
    if (!confirm("¿Estás seguro de que quieres eliminar este evento?")) return;

    try {
        let response = await fetch(`/examen/api/eventos/${id}/`, {
            method: 'DELETE',
            headers: {
                "X-CSRFToken": window.CSRF_TOKEN,  
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            let errorData = await response.text();
            console.error("Error en el servidor:", errorData);
            alert("Error al eliminar el evento: " + errorData);
            return;
        }

        let result = await response.json();
        console.log("Respuesta del servidor:", result);

        alert("Evento eliminado con éxito");
        mostrarEventos();
    } catch (error) {
        console.error("Error al eliminar evento:", error);
    }
}
