import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import getDecryptedData from "../../../utils/getDecryptedData"; // Para obtener el token

const url = import.meta.env.VITE_URL_BACKEND;

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [selectedImage, setSelectedImage] = useState(""); // Imagen seleccionada
  const [quantity, setQuantity] = useState(1); // Cantidad del producto
  const token = getDecryptedData("tokenSession"); // Obtén el token del usuario
  const userId = getDecryptedData("userid"); // Obtén el ID del usuario

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

  // Función para manejar la acción de añadir al carrito
  const handleAddToCart = async () => {
    try {
      const response = await fetch(`${url}/products/cart/add/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`, // Asegúrate de usar el prefijo adecuado
        },
        body: JSON.stringify({ productId: id, quantity }), // Usa la cantidad seleccionada
      });

      if (!response.ok) {
        const errorText = await response.text(); // Obtener la respuesta como texto
        console.error("Error en la solicitud:", errorText);
        throw new Error("Error al añadir al carrito");
      }

      const responseData = await response.json(); // Suponiendo que la respuesta es JSON
      // Aquí puedes actualizar el estado del carrito o mostrar un mensaje
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.global}>
        <h1 className={styles.title}>{data.name}</h1>
        <div className={styles.containContent}>
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
                      selectedImage === image.address
                        ? styles.activeThumbnail
                        : ""
                    }`}
                    onClick={() => setSelectedImage(image.address)}
                  />
                ))}
            </div>
          </div>

          <div className={styles.flex2}>
            {/* Mostrar categorías y tipos si están disponibles */}
            {data.ProductCategories && data.ProductCategories.length > 0 && (
              <h2 className={styles.caracters}>
                Edad: {data.ProductCategories[0].name}
              </h2>
            )}
            {data.ProductTypes && data.ProductTypes.length > 0 && (
              <h2 className={styles.caracters}>
                Raza: {data.ProductTypes[0].name}
              </h2>
            )}
            {/* Añadir sección de cantidad y botón de agregar al carrito al lado de la imagen */}
            <div className={styles.addToCartContainer}>
              <label className={styles.quantityLabel}>
                Cantidad:{" "}
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className={styles.quantityInput}
                  min="1"
                />
              </label>
              <button
                onClick={handleAddToCart}
                className={styles.addToCartButton}
              >
                Añadir al Carrito
              </button>
            </div>
            <p className={styles.description}>{data.description}</p>

            <h3 className={styles.subtitle}>Ingredientes:</h3>
            <p className={styles.ingredients}>{data.ingredients}</p>
          </div>
        </div>

        <div className={styles.tableContainer}>
          {/* Tabla de Composición Nutricional */}
          {data.composition && data.composition.length > 0 && (
            <div>
              <h3 className={styles.subtitle}>Composición Nutricional</h3>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Componente</th>
                    <th>Mínimo (%)</th>
                    <th>Máximo (%)</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {data.composition.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.min !== undefined ? `${item.min}%` : "-"}</td>
                      <td>{item.max !== undefined ? `${item.max}%` : "-"}</td>
                      <td>
                        {item.name === "Valor Energético"
                          ? `${item.value} kcal`
                          : item.value !== undefined
                          ? `${item.value}%`
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tabla de Guía de Alimentación */}
          {data.feedingGuide && data.feedingGuide.length > 0 && (
            <div>
              <h3 className={styles.subtitle}>Guía de Alimentación</h3>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Peso Mínimo (kg)</th>
                    <th>Peso Máximo (kg)</th>
                    <th>Ración Mínima (g)</th>
                    <th>Ración Máxima (g)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.feedingGuide.map((item, index) => (
                    <tr key={index}>
                      <td>{item.peso_min}</td>
                      <td>
                        {item.peso_max > 0 ? item.peso_max : "Sin límite"}
                      </td>
                      <td>{item.racion_min}</td>
                      <td>{item.racion_max}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
