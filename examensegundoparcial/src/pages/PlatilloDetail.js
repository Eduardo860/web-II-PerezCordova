import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./../styles/platilloDetail.css";

export default function PlatilloDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [platillo, setPlatillo] = useState(null);
    const [ingredientes, setIngredientes] = useState([]);

    const getYoutubeId = (url) => {
        const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
        const match = url.match(regExp);
        return match ? match[1] : null;
    };

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => res.json())
        .then((data) => {
            const meal = data.meals[0];
            setPlatillo(meal);

            const lista = [];
            for (let i = 1; i <= 20; i++) {
            const ingrediente = meal[`strIngredient${i}`];
            const medida = meal[`strMeasure${i}`];
            if (ingrediente && ingrediente.trim()) {
                lista.push(`${ingrediente} - ${medida}`);
            }
            }

            const eliminados = JSON.parse(localStorage.getItem(`eliminados_${id}`)) || [];
            const filtrados = lista.filter(item => !eliminados.includes(item));
            setIngredientes(filtrados);
        });
    }, [id]);

    const eliminarIngrediente = (index) => {
        const eliminado = ingredientes[index];
        const nuevos = ingredientes.filter((_, i) => i !== index);
        setIngredientes(nuevos);

        // Guardar en localStorage
        const actuales = JSON.parse(localStorage.getItem(`eliminados_${id}`)) || [];
        localStorage.setItem(`eliminados_${id}`, JSON.stringify([...actuales, eliminado]));
    };

    if (!platillo) return <p className="cargando">Cargando...</p>;

    return (
        <div className="detalle-container">
            <button className="btn-back" onClick={() => navigate("/")}>← Regresar</button>

            <div className="detalle-header">
                <img src={platillo.strMealThumb} alt={platillo.strMeal} className="detalle-img" />
                    <div className="detalle-info">
                        <h1>{platillo.strMeal}</h1>
                        <p><strong>ID:</strong> {platillo.idMeal}</p>
                        <p><strong>Categoría:</strong> {platillo.strCategory}</p>
                        {platillo.strSource && (
                            <p><strong>Página web:</strong> <a href={platillo.strSource} target="_blank" rel="noreferrer">Ver receta</a></p>
                        )}
                    </div>
            </div>

            <div className="detalle-instrucciones">
                <h3>Instrucciones</h3>
                <p>{platillo.strInstructions}</p>
            </div>

            {platillo.strYoutube && (
                <div className="video-preview" onClick={() => window.open(platillo.strYoutube, "_blank")}>
                    <img
                        src={`https://img.youtube.com/vi/${getYoutubeId(platillo.strYoutube)}/hqdefault.jpg`}
                        alt="Vista previa del video"
                        className="video-thumbnail"/>
                        
                    <div className="play-icon">▶</div>
                </div>
            )}

            <div className="detalle-ingredientes">
                <h3>Ingredientes</h3>
                <ul>
                {ingredientes.map((item, index) => (
                    <li key={index}>
                    {item}{" "}
                    <button className="btn-delete" onClick={() => eliminarIngrediente(index)}><strong>X</strong></button>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
}
