import { NavLink } from "react-router-dom";
import "../style/Header.css";
const Header = () => {
  return (
    <header className="navbar">
      <img src="/nadra1.png" className="nav-logo" />
      <nav>
        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/Beauty">Beauty</NavLink>
          </li>
          <li>
            <NavLink to="/offers">Offers</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
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
};

export default Header;
