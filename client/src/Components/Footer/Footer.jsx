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
        <img src={"https://res.cloudinary.com/dpa8t14c2/image/upload/v1728922885/LaMerced/images/xd33y4g7t5dvqyltysbh.png"} alt="logo" className={styles.logo} />
        <div className={styles.network}>
          <h2 className={styles.netTitle}>Visitanos en nuestras Redes!</h2>
          <div className={styles.LinkContainer1}>
            <Link to="https://www.instagram.com/distribuidoralamerced/" className={styles.net}>
              <FaInstagram /> Instagram
            </Link>
            <Link to="https://wa.me/+5493464547253" className={styles.net}>
              <FaWhatsapp /> Whatsapp
            </Link>
            <Link to="https://www.facebook.com/LaMercedDistribuidora" className={styles.net}>
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
