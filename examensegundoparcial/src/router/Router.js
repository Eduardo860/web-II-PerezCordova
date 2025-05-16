import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PlatilloDetail from "../pages/PlatilloDetail";

export default function MyRouters(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Platillo/:id" element={<PlatilloDetail/>}/>

        </Routes>
    )
}