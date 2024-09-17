import React from "react";
import icon1 from "../../../public/icons/icon1.svg";
import icon2 from "../../../public/icons/icon2.svg";
import icon3 from "../../../public/icons/icon3.svg";
import icon4 from "../../../public/icons/icon4.svg";
import icon5 from "../../../public/icons/icon5.svg";
import icon6 from "../../../public/icons/icon6.svg";
import icon7 from "../../../public/icons/icon7.svg";
import icon8 from "../../../public/icons/icon8.svg";
import styles from "./Benefits.module.css";
const Benefits = () => {
  return (
    <div className={styles.container}>
      <div
        className={styles.flex1}
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <div className={styles.containInfo}>
          <img src={icon1} alt="icon" className={styles.icon} />
          <div>
            <h2 className={styles.title}>Pulpa de Remolacha:</h2>
            <p className={styles.text}>Heces firmes.</p>
          </div>
        </div>
        <div className={styles.containInfo}>
          <img src={icon2} alt="icon" className={styles.icon} />
          <div>
            <h2 className={styles.title}>Extracto de Yuca:</h2>
            <p className={styles.text}>
              Reduce los olores de las deposiciones.
            </p>
          </div>
        </div>
        <div className={styles.containInfo}>
          <img src={icon3} alt="icon" className={styles.icon} />
          <div>
            <h2 className={styles.title}>Ácidos Grasos Omega 3 y 6:</h2>
            <p className={styles.text}>Pelo y piel saludables.</p>
          </div>
        </div>
        <div className={styles.containInfo}>
          <img src={icon4} alt="icon" className={styles.icon} />
          <div>
            <h2 className={styles.title}>Huevo deshidratado:</h2>
            <p className={styles.text}>Proteína de alta calidad.</p>
          </div>
        </div>
      </div>
      <div
        className={styles.flex1}
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <div className={styles.containInfo}>
          <img src={icon5} alt="icon" className={styles.icon} />
          <div>
            <h2 className={styles.title}>Levaduras:</h2>
            <p className={styles.text}>Favorece la salud intestinal.</p>
          </div>
        </div>
        <div className={styles.containInfo}>
          <img src={icon6} alt="icon" className={styles.icon} />
          <div>
            <h2 className={styles.title}>Fibras:</h2>
            <p className={styles.text}>Optimizan de la función digestiva.</p>
          </div>
        </div>
        <div className={styles.containInfo}>
          <img src={icon7} alt="icon" className={styles.icon} />
          <div>
            <h2 className={styles.title}>Vitaminas y Minerales:</h2>
            <p className={styles.text}>Refuerzan el sistema inmunológico.</p>
          </div>
        </div>
        <div className={styles.containInfo}>
          <img src={icon8} alt="icon" className={styles.icon} />
          <div>
            <h2 className={styles.title}>Antioxidantes:</h2>
            <p className={styles.text}>Previenen enfermedades.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
