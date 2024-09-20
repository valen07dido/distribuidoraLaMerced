import React from "react";
import logo from "../../../public/logos/Logo.png";
import styles from "./Footer.module.css";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaWhatsapp, FaLocationDot } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerInfo}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.LinkContainer}>
          <Link to="/" className={styles.text}>
            Inicio
          </Link>
          <Link to="/nosotros" className={styles.text}>
            Nosotros
          </Link>
          <Link to="/contacto" className={styles.text}>
            Contacto
          </Link>
        </div>
        <div className={styles.LinkContainer1}>
          <Link to="" className={styles.text}>
            <FaInstagram /> Instagram
          </Link>
          <Link to="" className={styles.text}>
            <FaWhatsapp /> Whatsapp
          </Link>
          <Link to="" className={styles.text}>
            <FaFacebook /> Facebook
          </Link>
        </div>
      </div>
      <div>
        <p className={styles.copyright}>©Todos los derechos reservados 2024</p>
      </div>
    </div>
  );
};

export default Footer;
