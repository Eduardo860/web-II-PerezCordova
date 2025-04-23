import { useNavigate } from "react-router-dom";

export default function EpisodeCard({ episode, votes, onVote }) {
const navigate = useNavigate();

const detalleCapitulo = () => { navigate(`/episodio/${episode.id}`);};

return (
    <div className="episode-card" onClick={detalleCapitulo}>
        <h3>{episode.name}</h3>
        <p><strong>Fecha:</strong> {episode.air_date}</p>
        <p><strong>Código:</strong> {episode.episode}</p>

        <div className="btns" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => onVote(episode.id, 'likes')}>
            👍 Like ({votes?.likes || 0})
            </button>
            <button onClick={() => onVote(episode.id, 'dislikes')}>
            👎 No Like ({votes?.dislikes || 0})
            </button>
        </div>
    </div>
);
}
