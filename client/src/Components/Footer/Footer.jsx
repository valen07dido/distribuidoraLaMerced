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
        <div className={styles.containerMap}>
          <p className={styles.location}>
            <FaLocationDot />
            Blvd. Colón 2601, S2170 Casilda, Santa Fe
          </p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13375.94403208508!2d-61.1637438!3d-33.0568352!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7d3f1b754a959%3A0x8e50043216d83a40!2sDistribuidora%20%22La%20Merced%E2%80%9D%20-%20Alimento%20Balanceado!5e0!3m2!1ses!2sar!4v1725640863637!5m2!1ses!2sar"
            allowFullScreen
            referrerPolicy="no-referrer"
            loading="lazy"
            className={styles.map}
          ></iframe>
        </div>
      </div>
      <div>
        <p className={styles.copyright}>©Todos los derechos reservados 2024</p>
      </div>
    </div>
  );
};

export default Footer;
