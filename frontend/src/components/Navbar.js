import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token on logout
    history.push("/login"); // Redirect to login page
  };

  const handleNavigation = (route) => {
    setMenuOpen(false); // Close menu on navigation
    history.push(route);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/home">FurEver Bond🐾</Link>
      </div>

      <ul className="nav-links">
      <li><Link to="/home">Home</Link></li>
        <li><Link to="/">Blogs</Link></li>
        <li><Link to="/pets">Pets for You</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      <div className="right-section">
        {/* Logout Button */}
        <button className="logout-btn" onClick={handleLogout}>Logout</button>

        {/* Hamburger Menu */}
        <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="dropdown-menu">
            <button className="hamItem" onClick={() => handleNavigation("/add-blog")}>➕ Add Blog</button>
            <button className="hamItem" onClick={() => handleNavigation("/sell-pets")}>🐶 Sell Pets</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
