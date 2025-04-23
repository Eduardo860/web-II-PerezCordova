import "../styles/home.css";
import EpisodeCard from "../components/EpisodeCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [episodes, setEpisodes] = useState([]);
  const [votes, setVotes] = useState({});

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/episode')
      .then(res => res.json())
      .then(data => setEpisodes(data.results))
      .catch(error => console.log('Error:', error));
  }, []);

  const handleVote = (episodeId, type) => {
    setVotes(prev => {
      const prevVotes = prev[episodeId] || { likes: 0, dislikes: 0 };
      return {
        ...prev,
        [episodeId]: {
          ...prevVotes,
          [type]: prevVotes[type] + 1,
        },
      };
    });
  };

  return (
    <div>
      <div className="Titulo">
        <p>Lista de Episodios</p>
      </div>

      <div className="episodes-container">
        {episodes.map(ep => (
          <EpisodeCard
            key={ep.id}
            episode={ep}
            votes={votes[ep.id]}
            onVote={handleVote}
          />
        ))}
      </div>
    </div>
  );
}
