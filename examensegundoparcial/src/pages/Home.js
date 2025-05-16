    import { useState, useEffect } from "react";
    import "./../styles/home.css";
    import pina from "../assets/pina.png"
    import lupa from "../assets/lupa.png"
    import chef from "../assets/chef-hat.svg"
    import PlatilloCard from "../components/platilloCard";

    export default function Home() {
    const [categorias, setCategorias] = useState([]);
    const [platillos, setPlatillos] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Dessert");
    const [busqueda, setBusqueda] = useState("");


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
                    <img src={chef} alt="Chef Logo" className="chef-img" />
                    <span className="logo-text">HomeChef</span>
                </div>
            </div>

            {/* Big text */}
            <h1 className="banner-title">
            Chefs<br />
            <span>   Academy</span><br />
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
            <div className="busqueda-barra">
                <img src={lupa} alt="lupa" className="busqueda-lupa"/>
                <input
                    type="text"
                    placeholder="Search recipes and more..."
                    className="busqueda-input"
                    value={busqueda}
                    onChange={(e)=> setBusqueda(e.target.value)}
                />

            </div>

            <div className="grid-platillos">
                {platillos
                .filter((meal) =>
                    meal.strMeal.toLowerCase().includes(busqueda.toLowerCase())
                )
                .map((meal) => (
                    <PlatilloCard key={meal.idMeal} platillo={meal} />
                ))}
            </div>
            </div>
        </section>
        </div>
    );
    }
