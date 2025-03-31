import ProductListItem from "../components/ProductListItem";
import ValidateToken from "../utils/ValidateToken";
import { useEffect, useState } from "react";

export default function Products() {
    const [products, setProducts] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            setProducts(data.products);
        }

        fetchProducts();
    }, []);

    const handleSearch = async () => {
        if (searchTerm.trim() === "") {
            const data = await getProducts();
            setProducts(data.products);
        } else {
            const data = await getProductsByWord(searchTerm);
            setProducts(data.products);
        }
    }

    ValidateToken();

    return (
        <div>
            <div 
                className="search-bar"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    margin: "20px 0",
                }}
            >
                <input 
                    type="text" 
                    placeholder="Buscar productos..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    style={{
                        padding: "10px",
                        fontSize: "16px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        width: "300px",
                        outline: "none",
                        backgroundColor: "#181820",
                        color: "white"
                    }}
                />
                <button 
                    onClick={handleSearch}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#1a73ff",
                        color: "white",
                        cursor: "pointer",
                    }}
                >
                    Buscar
                </button>
            </div>


            <div className="product-list-container">
                {products && products.length > 0 ? (
                    products.map((item) => (
                        <ProductListItem 
                            key={item.id}
                            title={item.title}
                            id={item.id}
                            description={item.description}
                            images={item.images}
                        />
                    ))
                ) : (
                    <p>No se encontraron productos.</p>
                )}
            </div>
        </div>
    );
}

async function getProducts() {
    const response = await fetch("https://dummyjson.com/products");
    return response.json();
}

async function getProductsByWord(word) {
    const response = await fetch(`https://dummyjson.com/products/search?q=${word}`);
    const data = await response.json();
    return data;
}
