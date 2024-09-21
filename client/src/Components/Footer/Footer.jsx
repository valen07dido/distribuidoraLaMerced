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
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.network}>
          <h2 className={styles.netTitle}>Visitanos en nuestras Redes!</h2>
          <div className={styles.LinkContainer1}>
            <Link to="" className={styles.net}>
              <FaInstagram /> Instagram
            </Link>
            <Link to="" className={styles.net}>
              <FaWhatsapp /> Whatsapp
            </Link>
            <Link to="" className={styles.net}>
              <FaFacebook /> Facebook
            </Link>
          </div>
        </div>
      </div>
      <div>
        <p className={styles.copyright}>©Todos los derechos reservados 2024</p>
      </div>
    </div>
  );
};

export default Footer;
