import { Routes, Route } from "react-router-dom";
import Home from "../page/Home";
import DetalleEpisodio from "../page/DetalleEpisodio";
import DetallePersonaje from "../page/DetallePersonaje";
import BusquedaPersonaje from "../page/BusquedaPersonaje";

export default function MyRouters(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/episodio/:id" element={<DetalleEpisodio/>}/>
            <Route path="/personaje" element={<BusquedaPersonaje/>}/>
            <Route path="/personaje/:id" element={<DetallePersonaje/>}/>


        </Routes>
    )
}