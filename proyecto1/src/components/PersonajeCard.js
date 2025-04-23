import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/personajeCard.css"

export default function PersonajeCard({ personaje }) {
const navigate = useNavigate();
const [likes, setLikes] = useState(0);

const verDetalle = () => {
    navigate(`/personaje/${personaje.id}`);
};

return (
    <div className="personaje-card" onClick={verDetalle}>
        <img src={personaje.image} alt={personaje.name} className="personaje-img" />
        <p className="personaje-nombre">{personaje.name}</p>

        <div className="personaje-detalle">
            <button onClick={verDetalle}>Ver Detalle</button>
        </div>
        <div className="personaje-botones" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setLikes(likes + 1)}>👍 Like ({likes})</button>
        </div>
    </div>
);
}
