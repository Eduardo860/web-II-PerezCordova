import "./../styles/platilloCard.css";
import { useNavigate } from "react-router-dom";
export default function PlatilloCard({ platillo }) {

    const navigate = useNavigate()

    const handleClick = () =>{
        navigate(`/Platillo/${platillo.idMeal}`)
    }

    return (
        <div className="platillo-card" onClick={handleClick}>
        <div className="platillo-img-container">
            <img src={platillo.strMealThumb} alt={platillo.strMeal} />
        </div>
        <p className="platillo-nombre">{platillo.strMeal}</p>
        </div>
    );
}
