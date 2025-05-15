import "./../styles/platilloCard.css";

export default function PlatilloCard({ platillo }) {
    return (
        <div className="platillo-card">
        <div className="platillo-img-container">
            <img src={platillo.strMealThumb} alt={platillo.strMeal} />
        </div>
        <p className="platillo-nombre">{platillo.strMeal}</p>
        </div>
    );
}
