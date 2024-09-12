import React, { useState } from "react";
import styles from "./FaQ.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
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
