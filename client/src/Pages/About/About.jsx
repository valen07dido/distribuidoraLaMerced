import React from "react";
import styles from "./About.module.css";
const About = () => {
  return (
    <div className={styles.globalContainer}>
      <div className={styles.container}>
        <h1>La Merced, nuestra Empresa Familiar</h1>
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
          data-aos="fade-left"
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
          data-aos="fade-left"
          data-aos-duration="1000"
        >
          Juntos, seguimos avanzando con la convicción de que una empresa sólida
          es aquella que se construye sobre la confianza, el compromiso y el
          amor por lo que hacemos. En La Merced, cada día es una nueva
          oportunidad para crecer y servir a quienes confían en nosotros.
        </h3>
        {/* <img src="../../../public/imagenes/Family.png" alt="family" /> */}
        <h2>Organización</h2>
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
