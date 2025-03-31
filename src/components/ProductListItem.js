import { useNavigate } from "react-router-dom";
import "../style/products.css";

export default function ProductListItem({title, id, description, images}) {
    const navigate = useNavigate();
    const image = images?.[0] ?? ""
    return (
        <div className="product-list-item-container" id="{id}" onClick={() => navigate(`/products/${id}`)}>
            <div className="product-list-item">
                <div>
                    <img src={image} />
                </div>
                <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}
