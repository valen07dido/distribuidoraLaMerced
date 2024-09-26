import React, { useState } from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import styles from "./FaQ.module.css";
import "leaflet/dist/leaflet.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [mapVisible, setMapVisible] = useState(false); // Estado para mostrar el mapa

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleMap = () => {
    setMapVisible(!mapVisible); // Alterna la visibilidad del mapa
  };

  const faqList = [
    {
      question: "¿Cómo puedo hacer un pedido?",
      answer:
        "Puedes realizar un pedido directamente desde nuestra página de productos. Solo selecciona el producto que deseas y sigue las instrucciones de pago.",
    },
    {
      question: "¿Cuáles son los métodos de pago aceptados?",
      answer:
        "Aceptamos tarjetas de crédito, débito, y también pagos mediante transferencias bancarias.",
    },
    {
      question: "¿Hacen envíos a todo el país?",
      answer:
        "Sí, realizamos envíos a todas las regiones del país. Los costos y tiempos de envío pueden variar según la ubicación.",
    },
    {
      question: "¿Dónde está la zona de envío gratuito?",
      answer: (
        <div className={styles.containerMap}>
          <div className={styles.textMap}>
            La zona de envío gratuito abarca desde la distribuidora en casilda
            hasta Venado Tuerto, ademas, tambien nos extendemos por la ruta 92
            hasta Cruz Alta:{"  "}
            <button onClick={toggleMap} className={styles.mapButton}>
              {mapVisible ? "Ocultar Mapa" : "Mostrar Mapa"}
            </button>
          </div>
          {mapVisible && (
            <MapContainer
              center={[-33.3819423, -61.5524715]}
              zoom={9}
              style={{ height: "350px", width: "50%", borderRadius: "15px" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {/* Polígono que representa la zona de envío gratuito */}
              <Polygon
                positions={[
                  [-33.0445798, -61.1653698], // Casilda
                  [-33.7467752, -61.9772648], // Venado Tuerto
                  [-33.0073022, -61.8095736], // Cruz Alta
                ]}
                color="green"
                fillColor="green"
                fillOpacity={0.3}
              />
            </MapContainer>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className={styles.faqContainer}>
      <h1 className={styles.faqTitle}>Preguntas Frecuentes</h1>
      <div className={styles.faqList}>
        {faqList.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <div
              className={styles.faqQuestion}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {activeIndex === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {activeIndex === index && (
              <div className={styles.faqAnswer}>{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
