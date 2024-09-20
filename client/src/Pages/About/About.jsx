import React from "react";
import styles from "./About.module.css";
import { FaLocationDot } from "react-icons/fa6";

const About = () => {
  return (
    <div className={styles.globalContainer}>
      <div className={styles.container}>
        <h1 className={styles.title}>La Merced, nuestra Empresa Familiar</h1>
        <h3
          className={styles.text}
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          Somos una empresa familiar nacida en el 2008, durante el primer día
          supimos cuál era nuestro horizonte, a pesar de los diferentes momentos
          que pasamos y que pasaremos, la idea de una empresa con valores de
          familia y comercial al servicio de todos/as nuestros/as clientes. Es
          el motivo, por el cual estamos en permanente búsqueda de nuevos
          servicios y adaptación a las necesidades para permanecer, sostenernos
          y crecer en el tiempo como lo hicimos hasta ahora.
        </h3>
        <h3
          className={styles.text}
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          La Merced cumple la función de distribuidora en productos destinados a
          mascotas.
        </h3>
        <h3
          className={styles.text}
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          Nuestra pyme familiar es el espacio donde desarrollamos nuestro
          trabajo, nuestro crecimiento profesional, económico y personal,
          generando negocios rentables y puestos de trabajo para la
          sostenibilidad de todos los que conformamos La Merced.
        </h3>

        <h3
          className={styles.text}
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          Juntos, seguimos avanzando con la convicción de que una empresa sólida
          es aquella que se construye sobre la confianza, el compromiso y el
          amor por lo que hacemos. En La Merced, cada día es una nueva
          oportunidad para crecer y servir a quienes confían en nosotros.
        </h3>
        <h2 className={styles.subtitle}>Nuesta ubicacion</h2>
        <div className={styles.containerMap}>
          <h3 className={styles.text}>
            Queremos conocerte y compartir nuestra pasión por el bienestar de
            tus mascotas. Ven a visitarnos en Calle{" "}
            <b>
              <FaLocationDot />
              Blvd. Colón 2601, en la localidad de Casilda, Santa Fe
            </b>
            . Donde podrás explorar nuestra amplia gama de productos diseñados
            especialmente para ellos. Nuestro equipo estará encantado de
            asesorarte y ayudarte a encontrar lo que mejor se adapte a tus
            necesidades.
          </h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13375.94403208508!2d-61.1637438!3d-33.0568352!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7d3f1b754a959%3A0x8e50043216d83a40!2sDistribuidora%20%22La%20Merced%E2%80%9D%20-%20Alimento%20Balanceado!5e0!3m2!1ses!2sar!4v1725640863637!5m2!1ses!2sar"
            allowFullScreen
            referrerPolicy="no-referrer"
            loading="lazy"
            className={styles.map}
          ></iframe>
        </div>
        {/* <img src="../../../public/imagenes/Family.png" alt="family" /> */}
        <h2 className={styles.subtitle}>Organización</h2>
        <h3 className={styles.text}>
          <b>Socio gerente:</b>Joaquín Marini
        </h3>
        <h3 className={styles.text}>
          <b>Socios:</b>Agustín Marini y Pablo Marini
        </h3>
      </div>
    </div>
  );
};

export default About;
