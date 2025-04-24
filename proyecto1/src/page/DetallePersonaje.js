import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/detallePersonaje.css";

export default function DetallePersonaje() {
const { id } = useParams();
const [personaje, setPersonaje] = useState(null);
const [episodios, setEpisodios] = useState([]);
const [likes, setLikes] = useState(0);
const [loaded, setLoaded] = useState(false);

  // ✅ Cargar personaje y episodios
useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then(res => res.json())
    .then(data => {
        setPersonaje(data);

        // Obtener primeros episodios (limitado a 20 para evitar sobrecarga)
        Promise.all(
        data.episode.slice(0, 20).map(url => fetch(url).then(res => res.json()))
        ).then(setEpisodios);
    })
    .catch(err => console.log("Error:", err));
}, [id]);

  // ✅ Leer likes desde localStorage
useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("personaje-votos")) || {};
    const votos = stored[id];
    if (votos) setLikes(votos.likes || 0);
    setLoaded(true);
}, [id]);

  // ✅ Guardar likes en localStorage cuando cambian
useEffect(() => {
    if (!loaded) return;
    const stored = JSON.parse(localStorage.getItem("personaje-votos")) || {};
    stored[id] = { likes };
    localStorage.setItem("personaje-votos", JSON.stringify(stored));
}, [likes, loaded, id]);

if (!personaje) return <p className="loading">Cargando personaje...</p>;

return (
        <div className="detalle-personaje">
            <div className="avatar-info">
                <div className="avatar-name">
                    <img src={personaje.image} alt={personaje.name} className="avatar" />
                    <h2>{personaje.name}</h2>
                </div>

                <div className="info-like">
                    <div className="info">
                        <p><strong>Estado:</strong> {personaje.status}</p>
                        <p><strong>Especie:</strong> {personaje.species}</p>
                        {personaje.type && <p><strong>Tipo:</strong> {personaje.type}</p>}
                        <p><strong>Género:</strong> {personaje.gender}</p>
                        <p><strong>Origen:</strong> {personaje.origin.name}</p>
                        <p><strong>Ubicación:</strong> {personaje.location.name}</p>
                    </div>

                    <div className="like">
                        <button onClick={() => setLikes(prev => prev + 1)}>
                        👍 Like ({likes})
                        </button>
                    </div>
                </div>
            </div>

            <div className="lista-episodios">
                <h3>Aparece en:</h3>
                <ul className="episodios">
                {episodios.map(ep => (
                    <li key={ep.id}>
                    <strong>{ep.episode} — {ep.name}</strong>
                    </li>
                ))}
                </ul>
            </div>
        </div>
);
}
