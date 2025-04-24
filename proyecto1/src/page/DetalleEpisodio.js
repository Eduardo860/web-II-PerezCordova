import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/detalleEpisodio.css";
import PersonajeCard from "../components/PersonajeCard";

export default function DetalleEpisodio() {
const { id } = useParams();
const [episodio, setEpisodio] = useState(null);
const [masVotados, setMasVotados] = useState([]);
const [menosVotados, setMenosVotados] = useState([]);

useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/episode/${id}`)
    .then(res => res.json())
    .then(data => {
        setEpisodio(data);
        const urls = data.characters;

        Promise.all(urls.map(url => fetch(url).then(res => res.json())))
        .then(dataPersonajes => {
            const votos = JSON.parse(localStorage.getItem("personaje-votos")) || {};

            const personajesConLikes = dataPersonajes.map(p => ({
            ...p,
            likes: votos[p.id]?.likes || 0,
            }));

            const ordenados = [...personajesConLikes].sort((a, b) => b.likes - a.likes);

            setMasVotados(ordenados.slice(0, 2));
            setMenosVotados(ordenados.slice(-2));
        });
    })
    .catch(err => console.log("Error:", err));
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

        <div className="votados-contenedor">
            <h3>Personajes más votados</h3>
            <div className="mas-votados">
            {masVotados.map(p => (
                <PersonajeCard key={p.id} personaje={p} />
            ))}
            </div>

            <h3>Personajes menos votados</h3>
            <div className="menos-votados">
            {menosVotados.map(p => (
                <PersonajeCard key={p.id} personaje={p} />
            ))}
            </div>
        </div>
        </div>
);
}
