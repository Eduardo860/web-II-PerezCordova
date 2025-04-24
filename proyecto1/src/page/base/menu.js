import { Link } from 'react-router-dom';
import MyRouters from '../../router/Ruter';


export default function Menu(){
    return(
        <div className='App'>
            <header className='App-header'>
                <nav className='navbar'>
                    <ul className='nav-list'>
                        <li className='nav-item'><Link to= "/">Inicio</Link></li>
                        <li className='nav-item'><Link to= "/personaje">Busqueda de Personajes</Link></li>
                        <li className='nav-item'><Link to= "/extra">Estatica</Link></li>


                    </ul>
                </nav>
            </header>
            <MyRouters/>
        </div>
    )
}