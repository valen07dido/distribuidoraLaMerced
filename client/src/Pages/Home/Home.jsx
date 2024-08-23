import React from "react";
import styles from "./Home.module.css";
import Card from "../../Components/Card/Card";
import prueba from "../../../public/productos/Criadores/Criadores_Frente_18x18_RGB_300dpi_Gris.jpg";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.banner} />
      <div className={styles.products}>
        <h1>Nuestros productos</h1>
        <div className={styles.grid}>
          <Card image={prueba} title="Criadores" />
          <Card image={prueba} title="Criadores" />
          <Card image={prueba} title="Criadores" />
        </div>
        <div  className={styles.more}>
          <IoIosArrowDown />
          <Link to="/productos" className={styles.links}>
            Conoce todos nuestros productos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
