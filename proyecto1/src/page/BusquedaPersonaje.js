import { useState, useContext } from "react";
import { FiltroContext } from "../context/FiltroContext";
import PersonajeCard from "../components/PersonajeCard";
import "../styles/busquedaPersonaje.css";

export default function BusquedaPersonaje() {
const { filtros, dispatch } = useContext(FiltroContext);
const [personajes, setPersonajes] = useState([]);

const handleChange = (e) => {
    dispatch({
    type: "SET_FILTRO",
    payload: { field: e.target.name, value: e.target.value },
    });
};

const buscarPersonajes = () => {
    const query = new URLSearchParams(
    Object.entries(filtros).filter(([_, v]) => v !== "")
    ).toString();

    fetch(`https://rickandmortyapi.com/api/character/?${query}`)
    .then((res) => res.json())
    .then((data) => setPersonajes(data.results || []))
    .catch(() => setPersonajes([]));
};

const resetFiltros = () => {
    dispatch({ type: "RESET" });
    setPersonajes([]);
};

return (
        <div className="busqueda-page">
        <h2>Buscador de Personajes</h2>
        <form className="formulario-filtros" onSubmit={(e) => e.preventDefault()}>
            <input
            name="name"
            placeholder="Nombre"
            value={filtros.name}
            onChange={handleChange}
            />

            <select name="status" value={filtros.status} onChange={handleChange}>
            <option value="">Cualquiera</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
            </select>

            <input
            name="species"
            placeholder="Especie"
            value={filtros.species}
            onChange={handleChange}
            />

            <input
            name="type"
            placeholder="Tipo"
            value={filtros.type}
            onChange={handleChange}
            />

            <select name="gender" value={filtros.gender} onChange={handleChange}>
            <option value="">Cualquiera</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
            </select>

            <div className="botones-busqueda">
            <button type="button" onClick={buscarPersonajes}>
                Buscar
            </button>
            <button type="button" onClick={resetFiltros}>
                Reset
            </button>
            </div>
        </form>

        <div className="resultados">
            {personajes.length > 0 ? (
            personajes.map((p) => <PersonajeCard key={p.id} personaje={p} />)
            ) : (
            <p>No se encontraron personajes.</p>
            )}
        </div>
        </div>
);
}
