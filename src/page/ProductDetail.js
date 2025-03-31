import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/productDetail.css";
import ValidateToken from "../utils/ValidateToken";

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cantidad, setCantidad] = useState(1);
    const [mensaje, setMensaje] = useState("");

    ValidateToken();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`https://dummyjson.com/products/${id}`);
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.error("Error al cargar el producto", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const agregarAlCarrito = () => {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        // Reglas de cantidad
        if (cantidad > product.stock) {
            setMensaje(`Solo hay ${product.stock} en stock`);
            return;
        }

        // Validaciones de total y productos diferentes
        let total = 0;
        const idsUnicos = new Set();

        carrito.forEach(item => {
            idsUnicos.add(item.id);
            total += item.price * item.cantidad;
        });

        // Si el producto ya está en el carrito, lo actualizamos
        const productoExistente = carrito.find(item => item.id === product.id);

        if (productoExistente) {
            const nuevaCantidad = productoExistente.cantidad + cantidad;
            if (nuevaCantidad > product.stock) {
                setMensaje(`El producto tiene ${product.stock} unidades`);
                return;
            }
            productoExistente.cantidad = nuevaCantidad;
        } else {
            // Limite de 5 productos diferentes
            if (idsUnicos.size >= 5) {
                setMensaje("Solo puedes tener 5 productos diferentes en el carrito");
                return;
            }
            carrito.push({
                id: product.id,
                title: product.title,
                price: product.price,
                cantidad: cantidad,
                image: product.images[0]
            });
        }

        // Verificamos el nuevo total
        total += product.price * cantidad;
        if (total > 10000) {
            setMensaje("El total del carrito no puede superar $10,000");
            return;
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        setMensaje("Producto agregado al carrito");
    };

    if (loading) return <p>Cargando producto...</p>;
    if (!product) return <h2>Producto no encontrado</h2>;

    return (
        <div className="product-detail">
            <img src={product.images?.[0]} alt={product.title} />
            <div className="product-detail-content">
                <h2>{product.title}</h2>
                <p><strong>Precio:</strong> ${product.price}</p>
                <p><strong>Stock disponible:</strong> {product.stock}</p>
                <p>{product.description}</p>
                <br/>


                <div style={{ marginTop: "15px" , display:"flex", flexDirection: 'column'}}>
                    <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={cantidad}
                        onChange={(e) => setCantidad(Number(e.target.value))}
                        style={{ padding: "5px", marginRight: "10px", width: "5%" }}
                    />
                    <br/>
                    <br/>

                    <button onClick={agregarAlCarrito} style={{
                        padding: "10px 20px",
                        backgroundColor: "rgb(2, 146, 79)",
                        height:"40px",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                    }}>
                       Agregar al carrito
                    </button>
                </div>
                {mensaje && <p style={{ marginTop: "10px", color: "rgb(2, 146, 79)" }}>{mensaje}</p>}
                <br/>
                <br/>

                <button onClick={() => navigate(-1)}>← Volver</button>
            </div>
        </div>
    );
}
