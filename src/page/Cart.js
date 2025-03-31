import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("carrito")) || [];
        setCarrito(data);

        const sumaTotal = data.reduce((acc, item) => acc + item.price * item.cantidad, 0);
        setTotal(sumaTotal);
    }, []);

    const vaciarCarrito = () => {
        localStorage.removeItem("carrito");
        setCarrito([]);
        setTotal(0);
    };

    return (
        <div style={{ padding: "30px" }}>
            <h2>Carrito de Compra</h2>

            {carrito.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <div>
                    {carrito.map((item) => (
                        <div
                            key={item.id}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "20px",
                                marginBottom: "20px",
                                borderBottom: "1px solid #ccc",
                                paddingBottom: "10px",
                                border:'white',
                                backgroundColor:"#0e0e12"
                            }}
                        >
                            <img src={item.image} alt={item.title} width={200} height={200} />
                            <div>
                                <h4>{item.title}</h4>
                                <p>Cantidad: {item.cantidad}</p>
                                <p>Precio unitario: ${item.price}</p>
                                <p>Total: ${item.price * item.cantidad}</p>
                            </div>
                        </div>
                    ))}

                    <h3>Total: ${total}</h3>

                    <div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
                        <button
                            onClick={vaciarCarrito}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "crimson",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer"
                            }}
                        >
                            Vaciar carrito
                        </button>
                        <button
                            onClick={() => navigate("/products")}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer"
                            }}
                        >
                            Seguir comprando
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
