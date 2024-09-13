import React, { useState, useEffect } from 'react';
import loading from "../../../public/icons/loading.gif";
import styles from "./Loading.module.css"
const Loading = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => (prevDots.length < 3 ? prevDots + '.' : ''));
    }, 500); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <img src={loading} alt="loading" className={styles.image}/>
      <p className={styles.text}>Cargando{dots}</p>
    </div>
  );
}

export default Loading;
