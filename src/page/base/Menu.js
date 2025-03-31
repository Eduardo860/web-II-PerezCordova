import { Link, useLocation } from 'react-router-dom';
import MyRouters from '../../router/Router';

export default function Menu() {
    const location = useLocation();
    const restringuidos = ["/login"];
    const allowed = restringuidos.indexOf(location.pathname) === -1;

    return (
        <div className="App">
            {allowed &&
                <header className="App-header">
                    <nav>
                    <ul>
                        <li className='nav-item'><Link to="/">Inicio</Link></li>
                        <li className='nav-item'><Link to="/about">Acerca de</Link></li>
                        <li className='nav-item'><Link to="/contact">Contacto</Link></li>
                        <li className='nav-item'><Link to="/login">Login</Link></li>
                        <li className='nav-item'><Link to="/products">Productos</Link></li>
                        <li className='nav-item'><Link to="/cart">Carrito</Link></li>
                    </ul>
                    </nav>
                </header>
            }
            <MyRouters />
        </div>
    );
}