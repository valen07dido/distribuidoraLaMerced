import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getDecryptedData from "../../../utils/getDecryptedData";
import styles from "./Cart.module.css";
import Swal from "sweetalert2";
const url = import.meta.env.VITE_URL_BACKEND;

const Cart = () => {
  const { id } = useParams();
  const [cartItems, setCartItems] = useState({ Products: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = getDecryptedData("tokenSession");
  const username = getDecryptedData("username");

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`${url}/products/cart/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      const data = await response.json();
      setCartItems(data);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        title: "Hubo un Error",
        text: "Error interno del servidor, recargue la pagina por favor!",
        confirmButtonText: "Entendido",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [id]);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return; // Evitar cantidades negativas o cero
    try {
      const response = await fetch(`${url}/products/cart/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });
      const data = await response.json();
      if (data.error) {
        Swal.fire({
          title: "Hubo un Error",
          text: data.response,
          confirmButtonText: "Entendido",
        });
      }

      // Volver a cargar el carrito
      fetchCartItems();
    } catch (error) {
      Swal.fire({
        title: "Hubo un Error",
        text: "Error interno del servidor, recargue la pagina por favor!",
        confirmButtonText: "Entendido",
      });
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await fetch(`${url}/products/cart/remove/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();
      if (data.error) {
        Swal.fire({
          title: "Hubo un Error",
          text: data.response,
          confirmButtonText: "Entendido",
        });
      }

      // Volver a cargar el carrito
      fetchCartItems();
    } catch (error) {
      Swal.fire({
        title: "Hubo un Error",
        text: "Error interno del servidor, recargue la pagina por favor!",
        confirmButtonText: "Entendido",
      });
    }
  };

  const handleWhatsAppShare = () => {
    const message = cartItems.Products.map(
      (item) => `${item.name}: ${item.ProductCart.quantity} unidades`
    ).join("\n");

    const phoneNumber = "3464581375"; // Reemplaza con el número deseado
    const urlWhatsApp = `https://wa.me/${phoneNumber}?text=Hola,%20me%20gustaría%20consultar%20los%20siguientes%20productos%20en%20mi%20carrito:%0A${encodeURIComponent(
      message
    )}`;

    window.open(urlWhatsApp, "_blank");
  };

  if (loading)
    return <p className={styles.loadingMessage}>Cargando tu carrito...</p>;
  if (error) return <p className={styles.errorMessage}>{error}</p>;
  return (
    <div className={styles.containerGlobal}>
      <div className={styles.cartContainer}>
        <h1 className={styles.cartTitle}>Carrito de: {username}</h1>
        {cartItems.Products?.length > 0 ? (
          <ul className={styles.cartList}>
            {cartItems.Products.map((item) => (
              <li key={item.id} className={styles.cartListItem}>
                <div className={styles.cartItemDetails}>
                  <img
                    src={item.ProductImages[0].address}
                    alt="img"
                    className={styles.image}
                  />
                  <h3>{item.name}</h3>
                  <p>{item.ProductCart.quantity} unidades</p>
                </div>
                <div className={styles.cartItemActions}>
                  <label>
                    Cambiar cantidad:{" "}
                    <input
                      type="number"
                      value={item.ProductCart.quantity}
                      min="1"
                      onChange={(e) =>
                        handleQuantityChange(item.id, e.target.value)
                      }
                      className={styles.cartInput}
                    />
                  </label>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className={styles.cartButton}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyCartMessage}>Tu carrito está vacío</p>
        )}
        {cartItems.Products.length > 0 && (
          <button
            onClick={handleWhatsAppShare}
            className={styles.whatsappButton}
          >
            Consultar en WhatsApp
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
