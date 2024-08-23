import React from "react";
import styles from "./Card.module.css";
import { PiWhatsappLogo } from "react-icons/pi";
const Card = ({ image, title }) => {
  return (
    <div className={styles.container}>
      <img src={image} className={styles.img} />
      <div>
        <h1 className={styles.description}>{title}</h1>
        <div className={styles.comunication}>
          <PiWhatsappLogo /> <h3>Consultar</h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
