import React from "react";
import styles from "./Card.module.css";
import { PiWhatsappLogo } from "react-icons/pi";

const Card = ({ image, name, category, type }) => {
  const handleWhatsAppClick = (e) => {
    e.stopPropagation(); // Evitar que el evento de clic se propague al Link
    const phoneNumber = "3415693753"; // Reemplaza con el número de teléfono
    const message = `Hola, estoy interesado en el producto: ${name}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={image} className={styles.img} alt={name} />
        {category ? (
          <div className={styles.breadcrumb}>{category.name}</div>
        ) : null}
        {type ? <div className={styles.breadcrumb2}>{type.name}</div> : null}
      </div>
      <div className={styles.flex}>
        <h1 className={styles.title}>{name}</h1>
        <div className={styles.comunication} onClick={handleWhatsAppClick}>
          <PiWhatsappLogo /> <h3>Consultar</h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
