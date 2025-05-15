    import { useState, useEffect } from "react";
    import "./../styles/home.css";
    import pina from "../assets/pina.png"
    import PlatilloCard from "../components/platilloCard";

    export default function Home() {
    const [categorias, setCategorias] = useState([]);
    const [platillos, setPlatillos] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Dessert");

    useEffect(() => {
        fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then((res) => res.json())
        .then((data) => setCategorias(data.categories));

        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoriaSeleccionada}`)
        .then((res) => res.json())
        .then((data) => setPlatillos(data.meals));
    }, [categoriaSeleccionada]);

    return (
        <div className="home-container">
        {/* Banner */}
        <section className="banner">
        <img src={pina} alt="Banner" className="banner-img" />
        
        <div className="banner-content">
            {/* Top bar: logo + badge */}
            <div className="banner-header">
            <div className="logo">
                <span className="chef-icon">👨‍🍳</span>
                <span className="logo-text">HomeChef</span>
            </div>
            <div className="badge">
                <span role="img" aria-label="emoji">🍳</span> New recipe for you to try out, let's cook!
            </div>
            </div>

            {/* Big text */}
            <h1 className="banner-title">
            Chefs<br />
            <span>Academy</span><br />
            Secrets
            </h1>
        </div>
        </section>



        {/* Contenido principal */}
        <section className="main-content">
            {/* Categorías */}
            <div className="categorias">
            <br/>
            <h3>Categories</h3>
            <br/>
            <br/>

            {categorias.map((cat) => (
                <button
                key={cat.idCategory}
                className={`categoria-btn ${categoriaSeleccionada === cat.strCategory ? "activa" : ""}`}
                onClick={() => setCategoriaSeleccionada(cat.strCategory)}
                >
                <img src={cat.strCategoryThumb} alt={cat.strCategory} />
                {cat.strCategory}
                </button>
            ))}
            </div>

            {/* Búsqueda y platillos */}
            <div className="busqueda-platillos">
            <br/>
            <input
                type="text"
                placeholder="Search recipes and more..."
                className="busqueda-input"
                // Puedes conectar esto a un filtro luego
            />

            <div className="grid-platillos">
                {platillos.map((meal) => (
                <PlatilloCard key={meal.idMeal} platillo={meal} />
                ))}
            </div>
            </div>
        </section>
        </div>
    );
    }
