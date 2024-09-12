import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

const url = import.meta.env.VITE_URL_BACKEND;

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [selectedImage, setSelectedImage] = useState(""); // Imagen seleccionada
  console.log(data);

  const getData = async () => {
    try {
      const response = await fetch(`${url}/products/${id}`);
      const data = await response.json();
      setData(data);
      if (data.ProductImages && data.ProductImages.length > 0) {
        setSelectedImage(data.ProductImages[0].address); // Establecer la primera imagen como predeterminada
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <div className={styles.mainImageContainer}>
          <img
            src={selectedImage}
            alt={data.name}
            className={styles.mainImage}
          />
        </div>

        {/* Miniaturas de las imágenes */}
        <div className={styles.thumbnails}>
          {data.ProductImages &&
            data.ProductImages.length > 0 &&
            data.ProductImages.map((image, index) => (
              <img
                key={index}
                src={image.address}
                alt={`Thumbnail ${index + 1}`}
                className={`${styles.thumbnail} ${
                  selectedImage === image.address ? styles.activeThumbnail : ""
                }`}
                onClick={() => setSelectedImage(image.address)}
              />
            ))}
        </div>
      </div>
      <div className={styles.flex2}>
        <h1>{data.name}</h1>
        <p className={styles.description}>{data.description}</p>

        {/* Mostrar imagen principal */}

        {/* Mostrar categorías y tipos si están disponibles */}
        {data.ProductCategories && data.ProductCategories.length > 0 && (
          <h2>Edad: {data.ProductCategories[0].name}</h2>
        )}
        {data.ProductTypes && data.ProductTypes.length > 0 && (
          <h2>Raza: {data.ProductTypes[0].name}</h2>
        )}
      </div>
    </div>
  );
};

export default Detail;
