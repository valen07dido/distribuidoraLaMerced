import React from "react";
import styles from "./Home.module.css";
import Card from "../../Components/Card/Card";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa los estilos del carrusel
import prueba from "../../../public/productos/Criadores/Criadores_Frente_18x18_RGB_300dpi_Gris.jpg";
import banner1 from "../../../public/imagenes/banner1.jpg";
import banner2 from "../../../public/imagenes/banner2.jpg";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

const Home = () => {
  return (
    <div className={styles.container}>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        showIndicators={false}
        swipeScrollTolerance={5}
        interval={3000} // Tiempo de cambio de cada imagen (3 segundos)
        className={styles.carousel}
      >
        <div>
          <img src={banner1} alt="Banner 1" />
        </div>
        <div>
          <img src={banner2} alt="Banner 2" />
        </div>
      </Carousel>
      <div className={styles.products}>
        <h1>Nuestros productos</h1>
        <div className={styles.grid}>
          <Card image={prueba} title="Criadores" />
          <Card image={prueba} title="Criadores" />
          <Card image={prueba} title="Criadores" />
        </div>
        <div className={styles.more}>
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
