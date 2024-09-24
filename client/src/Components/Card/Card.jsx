import React from "react";
import styles from "./Card.module.css";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import getDecryptedData from "../../../utils/getDecryptedData"; // Para obtener el token

import Swal from "sweetalert2";
const url = import.meta.env.VITE_URL_BACKEND;

const Card = ({ image, name, category, type, productId, onAddToCart }) => {
  const handleAddToCartClick = async (e) => {
    const token = getDecryptedData("tokenSession"); // Obtén el token del usuario
    const userId = getDecryptedData("userid"); // Obtén el ID del usuario
    const userRole=getDecryptedData("role")
    e.stopPropagation(); // Evitar que el evento de clic se propague al Link
    e.preventDefault();

    // Verifica si el usuario está logueado
    if (!token || !userId) {
      return Swal.fire({
        title: "Debe estar logueado para tener Carrito",
        icon: "error",
      });
    }
    if(userRole==="admin"){
      return Swal.fire({
        title: "El admin no tiene carrito",
        icon: "error",
      });
    }

    try {
      const response = await fetch(`${url}/products/cart/add/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`, // Asegúrate de usar el prefijo adecuado
        },
        body: JSON.stringify({ productId, quantity: 1 }), // Usa la cantidad seleccionada
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
        <div className={styles.addToCart} onClick={handleAddToCartClick}>
          <h3>
            <FaCartPlus /> Añadir al Carrito
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
