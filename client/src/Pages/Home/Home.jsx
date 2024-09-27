import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import Card from "../../Components/Card/Card";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa los estilos del carrusel
import carrousel1 from "../../../public/imagenes/banner1.jpg";
import carrousel2 from "../../../public/imagenes/banner2.jpg";
import bannerNosotros from "../../../public/imagenes/banner-deleita.jpg";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import FAQ from "../../Components/FaQ/FaQ";
import Loading from "../../Components/Loading/Loading";
const url = import.meta.env.VITE_URL_BACKEND;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noProducts, setNoProducts] = useState(false); // Nuevo estado

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/products`);
      const data = await response.json();
  
      // Verifica si el resultado es un array vacío o indefinido
      if (!Array.isArray(data) || data.length === 0) {
        setNoProducts(true); // Indicar que no hay productos
        setProducts([]); // Asegúrate de que `products` esté vacío
      } else {
        // Ordenar productos por fecha de creación
        const sortedProducts = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
  
        // Seleccionar los últimos 3 productos
        setProducts(sortedProducts.slice(0, 3));
        setNoProducts(false); // Resetear el estado en caso de encontrar productos
      }
    } catch (error) {
      console.error("Error al obtener los productos", error);
      setNoProducts(true); // Manejo de error: asume que no hay productos si hay un fallo
    } finally {
      setLoading(false);
    }
  };
  
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
          <img
            src={carrousel1}
            alt="Primer banner promocional"
            className={styles.carouselImg}
          />
        </div>
        <div>
          <img
            src={carrousel2}
            alt="Segundo banner promocional"
            className={styles.carouselImg}
          />
        </div>
      </Carousel>
      
      {/* Sección de productos */}
      {loading ? (
        <Loading />
      ) : noProducts ? (
        <div className={styles.noProductsMessage}>
          <h1>No hay productos disponibles en este momento.</h1>
          <p>Por favor, vuelve más tarde o crea un nuevo producto.</p>
        </div>
      ) : (
        <div className={styles.products}>
          <h1>Nuestros productos</h1>
          <div
            data-aos="fade-in"
            data-aos-duration="1000"
            className={styles.grid}
          >
            {products.map((product, index) => (
              <Card
                key={index}
                image={product.ProductImages[1].address}
                name={product.name}
                productId={product.id}
                category={product.ProductCategories[0]}
                type={product.ProductTypes[0]}
              />
            ))}
          </div>

          {/* Botón para más productos */}
          <div className={styles.more}>
            <Link to="/productos" className={styles.links}>
              <IoIosArrowDown />
              Conoce todos nuestros productos
            </Link>
          </div>
        </div>
      )}

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
      <div
        className={styles.contact}
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <h1>¿Quieres ser distribuidor o comprar nuestros productos?</h1>
        <h2>
          Haz clic{" "}
          <Link to="/contacto" className={styles.contactLink}>
            aquí
          </Link>{" "}
          y entérate de cómo unirte a nosotros.
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
