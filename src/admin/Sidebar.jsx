import { NavLink } from "react-router-dom";
import "./style/sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2>Admin</h2>
      <nav>
        <NavLink to="/admin">Dashboard</NavLink>
        <NavLink to="/admin/laser">Laser Posts</NavLink>
        <NavLink to="/admin/skincare">Skincare Posts</NavLink>
        <NavLink to="/admin/offer">Offer Posts</NavLink>
        <NavLink to="/admin/booking">Booking</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
