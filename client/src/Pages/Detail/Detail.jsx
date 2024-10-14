import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import getDecryptedData from "../../../utils/getDecryptedData"; // Para obtener el token
import { PiWhatsappLogo } from "react-icons/pi";
import { IoStar } from "react-icons/io5";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_URL_BACKEND;

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [selectedImage, setSelectedImage] = useState(""); // Imagen seleccionada
  const [quantity, setQuantity] = useState(1); // Cantidad del producto
  const [loading, setLoading] = useState(false);
  const token = getDecryptedData("tokenSession"); // Obtén el token del usuario
  const userId = getDecryptedData("userid"); // Obtén el ID del usuario
  const userRole = getDecryptedData("role"); // Obtén el ID del usuario
  const [isFavorite, setIsFavorite] = useState(false); // Estado para gestionar favoritos
  const navigate = useNavigate();
  const handleWhatsAppConsultation = () => {
    const phoneNumber = "3464581375"; // Cambia esto por el número de teléfono deseado
    const message = `Hola, estoy interesado en el producto ${data.name}.`; // Mensaje predefinido
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank"); // Abre WhatsApp en una nueva pestaña
  };
  const handleToggleFavorite = async () => {
    const token = getDecryptedData("tokenSession"); // Obtén el token del usuario
    const userId = getDecryptedData("userid"); // Obtén el ID del usuario
    const userRole = getDecryptedData("role");
    if (!token) {
      return Swal.fire({
        title: "Debe loguarse para tener Lista de Deseos",
        icon: "info",
        confirmButtonText: "Entendido",
      });
    }
    if (userRole === "admin") {
      return Swal.fire({
        title: "El admin no tiene lista de deseos",
        icon: "info",
        confirmButtonText: "Entendido",
      });
    }
    try {
      Swal.fire({
        title: "Espere, estamos procesando la informacion...",
        icon: "info",
        showCancelButton: false,
        showConfirmButton: false,
      });

      const response = await fetch(`${url}/products/wishlist/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ productId: id, quantity }),
      });
      Swal.close();
      if (!response.ok) {
        return Swal.fire({
          title: "Error",
          icon: "error",
          text: data.response,
          confirmButtonText: "Entendido",
        });
      }

      const responseData = await response.json();
      setIsFavorite(!isFavorite);

      return Swal.fire({
        title: "Se modificó su lista de deseos!",
        icon: "success",
        confirmButtonText: "Entendido",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "fallo interno del servidor",
        confirmButtonText: "Entendido",
      });
    }
  };

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/products/${id}`);
      const data = await response.json();
      if (!response.ok) {
        // Si la respuesta no es ok (por ejemplo, 404)
        throw new Error("Producto no encontrado");
      }
      setLoading(false);
      setData(data);
      if (data.ProductImages && data.ProductImages.length > 0) {
        setSelectedImage(data.ProductImages[0].address); // Establecer la primera imagen como predeterminada
      }
    } catch (error) {
      Swal.fire({
        title: "Producto no encontrado",
        text: "El producto que estás buscando no existe.",
        icon: "error",
        confirmButtonText: "Volver al inicio",
        allowOutsideClick: false, // Desactiva clics fuera del modal
        allowEscapeKey: false, // Desactiva la tecla Escape
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirigir al home si el usuario hace clic en "Volver al inicio"
          window.location.href = "/"; // Cambia esto a la ruta correcta de tu home
        }
      });
    }
  };

  const checkIfFavorite = async () => {
    try {
      const response = await fetch(`${url}/products/wishlist/${userId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      const wishlistData = await response.json();
      if (wishlistData.error) {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: wishlistData.response,
          confirmButtonText: "Entendido",
        });
      }

      const isProductFavorite = wishlistData.products.some((product) => {
        return product.id === id; // Compara directamente el UUID sin parsearlo
      });

      setIsFavorite(isProductFavorite); // Establece el estado si es favorito o no
    } catch (error) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "fallo interno del servidor",
        confirmButtonText: "Entendido",
      });
    }
  };

  useEffect(() => {
    getData();
    if (token) {
      checkIfFavorite(); // Verifica si el producto es favorito si el usuario está logueado
    }
  }, [id]); // Elimina isFavorite de las dependencias

  // Función para manejar la acción de añadir al carrito
  const handleAddToCart = async () => {
    const token = getDecryptedData("tokenSession"); // Obtén el token del usuario
    const userId = getDecryptedData("userid"); // Obtén el ID del usuario
    const userRole = getDecryptedData("role");
    if (!token) {
      return Swal.fire({
        title: "Debe loguarse para tener carrito.",
        icon: "info",
        confirmButtonText: "Entendido",
      });
    }
    if (userRole === "admin") {
      return Swal.fire({
        title: "El admin no tiene carrito.",
        icon: "info",
        confirmButtonText: "Entendido",
      });
    }
    try {
      const response = await fetch(`${url}/products/cart/add/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`, // Asegúrate de usar el prefijo adecuado
        },
        body: JSON.stringify({ productId: id, quantity }), // Usa la cantidad seleccionada
      });

      const responseData = await response.json(); // Suponiendo que la respuesta es JSON
      if (!response.ok || responseData.error) {
        return Swal.fire({
          title: "Error al añadir al carrito",
          icon: "error",
        });
      }

      // Aquí puedes actualizar el estado del carrito o mostrar un mensaje de éxito
      Swal.fire({
        title: "Producto añadido al carrito",
        icon: "success",
        showCancelButton: true, // Muestra el botón de cancelar
        confirmButtonText: "Ir al carrito",
        cancelButtonText: "Quedarse en la pagina actual",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirigir al carrito
          navigate(`/carrito/${userId}`); // Cambia la ruta según sea necesario
        }
        // Si el usuario elige "Quedarse en el home", no hacemos nada
      });
      // Aquí puedes actualizar el estado del carrito o mostrar un mensaje
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
  if (loading) {
    return (
      <div className={styles.container}>
        <Loading />
      </div>
    );
  }
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
              <button
                onClick={handleToggleFavorite}
                className={`${styles.favoriteButton} ${
                  isFavorite ? styles.activeFavorite : ""
                }`}
              >
                <IoStar />
              </button>
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
            {/* <button
              onClick={handleWhatsAppConsultation}
              className={styles.comunication}
            >
              Consultar <PiWhatsappLogo />
            </button> */}
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
                      <td>{item.name || "-"}</td>
                      <td>{item.min ? `${item.min}%` : "-"}</td>
                      <td>{item.max ? `${item.max}%` : "-"}</td>
                      <td>
                        {item.name === "Valor Energético"
                          ? item.value
                            ? `${item.value} kcal`
                            : "-"
                          : item.value
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
