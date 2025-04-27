import { useEffect, useState } from "react";
import PropiedadCard from "../components/PropiedadCard";
import "../styles/home.css";

export default function Home() {
    const [propiedades, setPropiedades] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/property-listing-data.json")
        .then(res => res.json())
        .then(data => setPropiedades(data))
        .catch(err => console.log("Error al cargar propiedades:", err));
    }, []);

    const propiedadesFiltradas = propiedades.filter((prop) =>
        prop.description.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="home-page">
        <div className="banner">
            
            <div className="text-input">
                    
                <div className="texto">
                    <h3>Book unique places to stay and things to do.</h3>
                    <h3>Unforgettable trips start with Airbnb.</h3>
                </div>


                <div className="busqueda">
                    <input type="text" placeholder="Search" value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>
                </div>

            </div>
        </div>


        <div className="grid-propiedades">
            {propiedadesFiltradas.length > 0 ? (
            propiedadesFiltradas.map((prop) => (
                <PropiedadCard key={prop.id} propiedad={prop} />
            ))
            ) : (
            <p style={{color:"white", fontSize:"3em"}}>No se encontraron propiedades.</p>
            )}
        </div>
        </div>
    );
}
