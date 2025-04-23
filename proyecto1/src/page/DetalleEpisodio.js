import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/detalleEpisodio.css"
import PersonajeCard from "../components/PersonajeCard";

export default function DetalleEpisodio() {
const { id } = useParams();
const [episodio, setEpisodio] = useState(null);
const [personajes, setPersonajes] = useState([])

useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/episode/${id}`)
    .then((res) => res.json())
    .then((data) => {
        setEpisodio(data);

        const primerosTres = data.characters.slice(0, 3);  
        Promise.all(
            primerosTres.map((url) => fetch(url).then((res) => res.json()))
        ).then((dataPersonajes) => setPersonajes(dataPersonajes));
    })
    .catch((err) => console.log("Error:", err));
}, [id]);


if (!episodio) return <p>Cargando episodio...</p>;


return (

    <div className="detalle-episodio">

        <div className="titulo">
            <h2>{episodio.name}</h2>
        </div>

        <div className="subtitulo">
            <p><strong>Fecha de estreno:</strong> {episodio.air_date}</p>
            <p><strong>Código:</strong> {episodio.episode}</p>
        </div>

        <div className="personajes">
            {personajes.map((p) => (
            <PersonajeCard key={p.id} personaje={p} />
            ))}
        </div>

    </div>
);
}
