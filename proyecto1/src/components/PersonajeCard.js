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

    setLoaded(true); // ✅ listo para guardar después
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
        <img src={personaje.image} alt={personaje.name} className="personaje-img" />
        <p className="personaje-nombre">{personaje.name}</p>

        <div className="personaje-botones">
            <button onClick={verDetalle}>Ver Detalle</button>
            <button onClick={(e) => {
            e.stopPropagation();
            setLikes(prev => prev + 1);
            }}>
            👍 Like ({likes})
            </button>
        </div>
        </div>
);
}
