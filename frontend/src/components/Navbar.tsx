import {NavLink} from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-brand">
                <span className="brand-icon">🚗</span>
                <span className="brand-name">CAR<span>SHOWROOM</span></span>
            </div>
            <nav className="navbar-nav">
                <NavLink to="/cars"
                         className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Автомобили</NavLink>
                <NavLink to="/buyers"
                         className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Покупатели</NavLink>
                <NavLink to="/orders"
                         className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Заказы</NavLink>
            </nav>
        </header>
    );
}