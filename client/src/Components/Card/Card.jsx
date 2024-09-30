import React from "react";
import styles from "./Card.module.css";
import { FaCartPlus, FaWhatsapp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import getDecryptedData from "../../../utils/getDecryptedData"; // Para obtener el token
import Swal from "sweetalert2";

const url = import.meta.env.VITE_URL_BACKEND;

const Card = ({ image, name, category, type, productId }) => {
  const navigate = useNavigate(); // Crea una instancia de navigate

  const handleAddToCartClick = async (e) => {
    const token = getDecryptedData("tokenSession");
    const userId = getDecryptedData("userid");
    const userRole = getDecryptedData("role");
    e.stopPropagation();
    e.preventDefault();
  
    if (!token || !userId) {
      return Swal.fire({
        title: "Debe estar logueado para añadir productos al carrito.",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    }
  
    if (userRole === "admin") {
      return Swal.fire({
        title: "Los administradores no pueden usar el carrito.",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    }
  
    try {
      const response = await fetch(`${url}/products/cart/add/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
  
      const responseData = await response.json();
      if (!response.ok) {
        const errorMessage = responseData.message || "Error al añadir al carrito";
        return Swal.fire({
          title: errorMessage,
          icon: "error",
        });
      }
  
      Swal.fire({
        title: "Producto añadido al carrito",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Ir al carrito",
        cancelButtonText: "Quedarse en la página actual",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/carrito/${userId}`);
        }
      });
    } catch (error) {
      console.error("Error en la solicitud:", error);
      Swal.fire({
        title: "Error en la conexión",
        icon: "error",
      });
    }
  };
  

  return (
    <Link to={`/productos/${productId}`} className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={image} className={styles.img} alt={name} />
        {category && <div className={styles.breadcrumb}>{category.name}</div>}
        {type && <div className={styles.breadcrumb2}>{type.name}</div>}
      </div>
      <div className={styles.flex}>
        <h1 className={styles.title}>{name}</h1>
        {/* Botón de Añadir al carrito */}
        <div className={styles.containerButton}>
          <button
            className={styles.addToCart}
            onClick={handleAddToCartClick}
            title="Añadir al carrito"
          >
            <FaCartPlus />
          </button>

        </div>
      </div>
    </Link>
  );
};

export default Card;
