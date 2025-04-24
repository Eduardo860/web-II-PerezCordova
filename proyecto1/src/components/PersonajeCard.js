import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/personajeCard.css";

export default function PersonajeCard({ personaje }) {
const navigate = useNavigate();
const [likes, setLikes] = useState(0);
const [loaded, setLoaded] = useState(false);

useEffect(() => {
    if (!personaje?.id) return;

    const stored = JSON.parse(localStorage.getItem("personaje-votos")) || {};
    const votos = stored[personaje.id];
    if (votos) {
        setLikes(votos.likes || 0);
    }

    setLoaded(true); 
}, [personaje]);

useEffect(() => {
    if (!loaded || !personaje?.id) return;

    const stored = JSON.parse(localStorage.getItem("personaje-votos")) || {};
    stored[personaje.id] = { likes };
    localStorage.setItem("personaje-votos", JSON.stringify(stored));
}, [likes, loaded, personaje]);

const verDetalle = () => {
    navigate(`/personaje/${personaje.id}`);
};

return (
    <div className="personaje-card">
        <div className="personaje-contenido">
            <div className="personaje-texto">
                <h3>{personaje.name}</h3>
                <p>Conócelo a fondo y descubre su historia en la serie.</p>
                <button className="btn-detalle" onClick={verDetalle}>VER DETALLE</button>
            </div>

            <div className="personaje-imagen">
                <img src={personaje.image} alt={personaje.name} className="personaje-img" />
            </div>
        </div>

        <button className="btn-like" onClick={(e) => {
        e.stopPropagation();
        setLikes(prev => prev + 1);
        }}>
        👍 {likes}
        </button>
    </div>
);
}
