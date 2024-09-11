import React from "react";
import styles from "./Home.module.css";
import Card from "../../Components/Card/Card";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa los estilos del carrusel
import prueba from "../../../public/productos/Criadores/Criadores_Frente_18x18_RGB_300dpi_Gris.jpg";
import carrousel1 from "../../../public/imagenes/banner1.jpg";
import carrousel2 from "../../../public/imagenes/banner2.jpg";
import bannerNosotros from "../../../public/imagenes/banner-deleita.jpg";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import FAQ from "../../Components/FaQ/FaQ";

const Home = () => {
  return (
    <div className={styles.container}>
      {/* Carrusel de imágenes */}
      <Carousel
        autoPlay
        infiniteLoop={true}
        showThumbs={false}
        swipeable={true}
        showStatus={false}
        showArrows={false}
        showIndicators={false}
        swipeScrollTolerance={5}
        transitionTime={1000}
        interval={3000}
        className={styles.carousel}
      >
        <div>
          <img src={carrousel1} alt="Primer banner promocional" className={styles.carouselImg} />
        </div>
        <div>
          <img src={carrousel2} alt="Segundo banner promocional" className={styles.carouselImg} />
        </div>
      </Carousel>

      {/* Sección de productos */}
      <div className={styles.products}>
        <h1>Nuestros productos</h1>
        <div data-aos="fade-in" data-aos-duration="1000" className={styles.grid}>
          <Card image={prueba} name="Criadores" />
          <Card image={prueba} name="Criadores" />
          <Card image={prueba} name="Criadores" />
        </div>

        {/* Botón para más productos */}
        <div className={styles.more}>
          <Link to="/productos" className={styles.links}>
            <IoIosArrowDown />
            Conoce todos nuestros productos
          </Link>
        </div>
      </div>

      {/* Sección "Sobre nosotros" */}
      <div className={styles.about}>
        <div className={styles.flexAbout}>
          <img
            data-aos="fade-right"
            data-aos-duration="1000"
            src={bannerNosotros}
            alt="Sobre nosotros, banner informativo"
            className={styles.imageAbout}
          />
        </div>
      </div>

      {/* Sección de contacto */}
      <div className={styles.contact} data-aos="zoom-in">
        <h1>¿Quieres ser distribuidor o comprar nuestros productos?</h1>
        <h2>
          Haz clic <Link to="/contacto" className={styles.contactLink}>aquí</Link> y entérate de cómo unirte a nosotros.
        </h2>
      </div>

      {/* Sección de preguntas frecuentes */}
      <div className={styles.faqContainer}>
        <FAQ />
      </div>
    </div>
  );
};

export default Home;
