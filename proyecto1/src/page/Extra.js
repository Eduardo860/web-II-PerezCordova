import { useNavigate } from "react-router-dom";
import "../styles/extra.css"
import Flecha from "../img/FlechaIzquierda.png"
import Banner from "../img/RickYMortyBanner.jpg"
import Telefono from "../img/Telefono.png"
import Logo from "../img/LogoAPI.png"
import AdultSwim from "../img/AdultSwim.jpg"
import Trajes from "../img/Trajes.jpg"
import Aliens from "../img/Alien.webp"
export default function Extra(){
    const navigate = useNavigate();

    const Volver = () => {
        navigate(`/`);
    } 

    return(
        <div>
            <div className="header">
                <button className="hamburguesa">☰</button>

                <img src={Logo}/>

                <div className="botones-header">

                    <div className="dropdown">
                        <span className="flecha">▼</span>
                        <span>Nuestros Resorts</span>
                    </div>

                    <div className="dropdown">
                        <span className="flecha">▼</span>
                        <span>Contactos</span>
                    </div>

                    <div className="telefono">
                        <img src={Telefono}/>
                        <span>800-681-5338</span>
                    </div>
                </div>
            </div>

            <div className="body">
                <div className="banner">
                    <img src={Banner}/>
                    
                    <div className="banner-text">

                        <div className="boton" onClick={Volver}>
                            <img src={Flecha}/>
                            <button><strong>VOLVER</strong></button>
                        </div>

                        <h3>La API de Rick y Morty!</h3>
                    </div>
                </div>

                <div className="contenido">
                    <p>Rick y Morty (en inglés: Rick and Morty) es una serie de televisión estadounidense de animación para adultos creada por Justin Roiland y Dan Harmon en 2013 para Adult Swim, también se emitió en Cartoon Network. La serie sigue las desventuras de un científico, Rick Sánchez, y su fácilmente influenciable nieto, Morty, quienes pasan el tiempo entre la vida doméstica y los Viajes espaciales e intergalácticos. Dan Harmon, el cocreador de la serie y Justin Roiland son los encargados de las voces principales de Morty y Rick, la serie también incluye las voces de Chris Parnell, Spencer Grammer y Sarah Chalke.</p>
                    <img src={Aliens}/>
                    <p>La mejor serie de ciencia ficcion que podras encontrar!</p>
                    <img src={Trajes}/>
                    <p>Disponible en Adult Swim los martes a las 11pm</p>
                    <img src={AdultSwim}/>
                </div>
            </div>

            <div className="footer">
                <img src={Logo} className="footer-img"/>
                
                <div className="footer-info">
                    <div className="info">
                        <div className="info-column">
                            <h4><strong>Info</strong></h4>
                            <p>Dato</p>
                            <p>Dato</p>
                            <p>Dato</p>
                            <p>Dato</p>
                            <p>Dato</p>
                            <p>Dato</p>
                            <p>Dato</p>
                            <p>Dato</p>
                        </div>

                        <div className="info-column">
                            <h4><strong>Info</strong></h4>
                            <p>Dato</p>
                            <p>Dato</p>
                            <p>Dato</p>
                            <p>Dato</p>
                            <p>Dato</p>
                            <p>Dato</p>
                            <p>Dato</p>
                            <p>Dato</p>
                        </div>

                        <div className="info-column">
                            <h4><strong>Info</strong></h4>
                            <p>Dato</p>
                            <p>Dato</p>
                            <p>Dato</p>
                            <p>Dato</p>
                            <p>Dato</p>
                            <p>Dato</p>
                            <p>Dato</p>
                            <p>Dato</p>
                        </div>

                    </div>
                    <div className="form">
                        <h4><strong>Suscribete a nuestras ofertas</strong></h4>

                        <div className="form-inputs">
                            <input placeholder="Nombre *"/>
                            <input placeholder="Apellido *"/>
                        </div>

                        <div className="form-inputs">
                            <input placeholder="Correo *"/>
                            <select placeholder="Pais">
                                <option>Mexico</option>
                                <option>USA</option>
                                <option>Canada</option>
                            </select>
                        </div>

                        <div className="form-checkbox">
                            <input type="checkbox" id="terminos" />
                            <label htmlFor="terminos">
                                He leído y estoy de acuerdo con los <a href="#">Términos de Uso</a> y el <a href="#">Aviso de Privacidad Integral</a> puesto a mi disposición.*
                            </label>
                        </div>

                        <div className="form-boton">
                            <button className="form-submit">Enviar</button>
                        </div>


                    </div>

                </div>
            </div>       
        </div>
    )

}