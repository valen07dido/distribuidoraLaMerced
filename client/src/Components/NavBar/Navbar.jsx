import React from "react";
import logo from "../../../public/logos/Logo.png";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import styles from "./Navbar.module.css"
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className={styles.container}>
      <Link to="/">
        <img src={logo} alt="logo" className={styles.logo} />
      </Link>
      <div className={styles.flex1}>
        <Link to="/productos">Productos</Link>
        <Link to="/nosotros">Nosotros</Link>
        <Link to="/contacto">Contactanos</Link>
        <Link to="/registrarse">Registrarse</Link>
      </div>
      <div className={styles.flex2}>
        <FaUser />
        <FaShoppingCart />
      </div>
    </nav>
  );
};

export default Navbar;
