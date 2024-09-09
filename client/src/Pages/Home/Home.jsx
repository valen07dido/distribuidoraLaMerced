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
          <img src={carrousel1} alt="Banner 1" className={styles.carouselImg} />
        </div>
        <div>
          <img src={carrousel2} alt="Banner 2" className={styles.carouselImg} />
        </div>
      </Carousel>
      <div className={styles.products}>
        <h1>Nuestros productos</h1>
        <div
          data-aos="fade-in"
          data-aos-duration="1000"
          className={styles.grid}
        >
          <Card image={prueba} title="Criadores" />
          <Card image={prueba} title="Criadores" />
          <Card image={prueba} title="Criadores" />
        </div>
        <div className={styles.more}>
          <Link to="/productos" className={styles.links}>
            <IoIosArrowDown />
            Conoce todos nuestros productos
          </Link>
        </div>
      </div>
      <div className={styles.about}>
        <div className={styles.flexAbout}>
          <div
            data-aos="fade-right" // AOS animation
            data-aos-duration="1000" // Animation duration
            className={styles.textCont}
          >
            <h1 className={styles.titleAbout}>Un poco de nuestra historia</h1>
            <p className={styles.text}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat
              atque nihil tenetur praesentium magnam ipsum consequatur tempore,
              fugit quasi adipisci ducimus. Doloremque nulla at, veritatis iste
              voluptate nam molestias sunt!
            </p>
            <p className={styles.text}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi,
              repellendus libero sint dolorem sit nostrum officiis alias quas.
              Accusantium pariatur quidem numquam quasi asperiores, excepturi
              voluptates accusamus eos aut quo?
            </p>
            <p className={styles.text}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi,
              repellendus libero sint dolorem sit nostrum officiis alias quas.
              Accusantium pariatur quidem numquam quasi asperiores, excepturi
              voluptates accusamus eos aut quo?
            </p>
            <p className={styles.text}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi,
              repellendus libero sint dolorem sit nostrum officiis alias quas.
              Accusantium pariatur quidem numquam quasi asperiores, excepturi
              voluptates accusamus eos aut quo?
            </p>
            <p className={styles.text}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi,
              repellendus libero sint dolorem sit nostrum officiis alias quas.
              Accusantium pariatur quidem numquam quasi asperiores, excepturi
              voluptates accusamus eos aut quo?
            </p>
          </div>
          <img
            data-aos="fade-right"
            data-aos-duration="1000"
            src={bannerNosotros}
            alt="banner"
            className={styles.imageAbout}
          />
        </div>
      </div>
      data-aos-duration="1000"
      <div className={styles.contact} data-aos="zoom-in">
        <h1>Queres ser distribuidor o comprar nuestros productos?</h1>
        <h2 className={styles.contactLink}>
          haz click <Link to="/contacto">aqui</Link> y enterate como unirte a
          nosotros.
        </h2>
      </div>
      <div className={styles.faqContainer}>
        <FAQ />
      </div>
    </div>
  );
};

export default Home;
