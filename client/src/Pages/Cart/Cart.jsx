import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getDecryptedData from "../../../utils/getDecryptedData";
import styles from "./Cart.module.css"; // Importar el archivo CSS
const url = import.meta.env.VITE_URL_BACKEND;

const Cart = () => {
  const { id } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = getDecryptedData("tokenSession");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`${url}/products/cart/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`, // Aquí pasamos el token
          },
        });
        const data = await response.json();
        setCartItems(data);
        setLoading(false);
      } catch (error) {
        setError("Hubo un problema al cargar el carrito.");
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [id]);

  const handleQuantityChange = async (productId, newQuantity) => {
    // Lógica para cambiar la cantidad del producto
  };

  const handleRemoveItem = async (productId) => {
    // Lógica para eliminar un producto del carrito
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartTitle}>Carrito de {id}</h1>
      {cartItems.Products.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <ul className={styles.cartList}>
          {cartItems.Products.map((item) => (
            <li key={item.id} className={styles.cartListItem}>
              {item.name} - {item.ProductCart.quantity} unidades
              <br />
              <label>
                Cambiar cantidad:
                <input
                  type="number"
                  value={item.quantity}
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
