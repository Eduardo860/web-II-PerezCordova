import { FaStar } from "react-icons/fa"; 
import "../styles/propiedadCard.css";
import House from "../img/House.png"
import User from "../img/User.webp"
export default function PropiedadCard({ propiedad }) {
    return (
        <div className="propiedad-card">
        {propiedad.superhost && (
            <div className="superhost">
            Superhost <FaStar size={12} color="#FFD700" />
            </div>
        )}
        <img src={propiedad.image} alt={propiedad.title} className="propiedad-img" />

        <div className="propiedad-info">
            <h3 className="propiedad-title">{propiedad.title}</h3>
            <p className="propiedad-desc">{propiedad.description}</p>

            <div className="propiedad-capacidad">
                <div className="icon">
                    <img src={House} alt="Casa"/>
                    <p>{propiedad.capacity.bedroom} BedRoom</p>
                </div>

                <div className="icon">
                    <img src={User} alt="User`"/>
                    <p>{propiedad.capacity.people} Guest</p>
                </div>
            
            </div>

            <div className="linea-blanca"></div>

            <div className="propiedad-precio-rating">
            <span>${propiedad.price}/night</span>
            <div className="rating">
                <FaStar size={14} color="#FFD700" />
                <span>{propiedad.rating}</span>
            </div>
            </div>
        </div>
        </div>
    );
}
