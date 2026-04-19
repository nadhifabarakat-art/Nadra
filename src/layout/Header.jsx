import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header className="navbar" >
            <nav>
                <ul className="nav-link">
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">About</NavLink>

                    </li>

                    <li>
                        <NavLink to="/beauty">Beauty</NavLink>

                    </li>

                    <li>
                        <NavLink to="/contact">Contact</NavLink>

                    </li>
                </ul>
            </nav>
            <div className="Host">
                <NavLink to="/Admin">Admin</NavLink>
            </div>
        </header>
    );
}

export default Header; 