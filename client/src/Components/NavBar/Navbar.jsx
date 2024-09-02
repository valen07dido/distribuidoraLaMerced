import React, { useState } from "react";
import logo from "../../../public/logos/Logo.png";
import { FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.container}>
      <Link to="/">
        <img src={logo} alt="logo" className={styles.logo} />
      </Link>
      <div className={`${styles.flex1} ${menuOpen ? styles.menuOpen : ""}`}>
        <Link to="/productos" className={styles.links} onClick={toggleMenu}>
          Productos
        </Link>
        <Link to="/nosotros" className={styles.links} onClick={toggleMenu}>
          Nosotros
        </Link>
        <Link to="/contacto" className={styles.links} onClick={toggleMenu}>
          Contáctanos
        </Link>
        <Link to="/registrarse" className={styles.links} onClick={toggleMenu}>
          Registrarse
        </Link>
      </div>
      <div className={styles.flex2}>
        <button className={styles.menuButton} onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <FaUser className={styles.icon} />
        <FaShoppingCart className={styles.icon} />
      </div>
    </nav>
  );
};

export default Navbar;
