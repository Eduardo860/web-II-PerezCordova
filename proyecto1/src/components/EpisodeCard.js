import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EpisodeCard({ episode }) {
const navigate = useNavigate();
const [votes, setVotes] = useState({ likes: 0, dislikes: 0 });
const [loaded, setLoaded] = useState(false); 

useEffect(() => {
    if (!episode?.id) return;

    const stored = JSON.parse(localStorage.getItem("episodio-votos")) || {};
    const votoEpisodio = stored[episode.id];
    if (votoEpisodio) {
        setVotes(votoEpisodio);
    }
    setLoaded(true); 
}, [episode]);

useEffect(() => {
    if (!loaded || !episode?.id) return;

    const stored = JSON.parse(localStorage.getItem("episodio-votos")) || {};
    stored[episode.id] = votes;
    localStorage.setItem("episodio-votos", JSON.stringify(stored));
}, [votes, loaded, episode]);

const detalleCapitulo = () => {
    navigate(`/episodio/${episode.id}`);
};

return (
        <div className="episode-card" onClick={detalleCapitulo}>
        <h3>{episode.name}</h3>
        <p><strong>Fecha:</strong> {episode.air_date}</p>
        <p><strong>Código:</strong> {episode.episode}</p>

        <div className="btns" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setVotes(prev => ({ ...prev, likes: prev.likes + 1 }))}>
            👍 Like ({votes.likes})
            </button>
            <button onClick={() => setVotes(prev => ({ ...prev, dislikes: prev.dislikes + 1 }))}>
            👎 No Like ({votes.dislikes})
            </button>
        </div>
        </div>
);
}
