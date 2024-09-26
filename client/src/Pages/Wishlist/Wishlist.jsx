import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getDecryptedData from "../../../utils/getDecryptedData";
import styles from "./Wishlist.module.css";
import Loading from "../../Components/Loading/Loading";
const url = import.meta.env.VITE_URL_BACKEND;

const Wishlist = () => {
  const { id } = useParams();
  const [wishlistItems, setWishlistItems] = useState({ products: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = getDecryptedData("tokenSession");
  const username = getDecryptedData("username");

  const fetchWishlistItems = async () => {
    try {
      const response = await fetch(`${url}/products/wishlist/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      const data = await response.json();
      setWishlistItems(data);
      setLoading(false);
    } catch (error) {
      setError("Hubo un problema al cargar la lista de deseos.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlistItems();
  }, [id]);

  const handleRemoveItem = async (productId) => {
    try {
      const response = await fetch(`${url}/products/wishlist/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el producto de la wishlist");
      }

      // Volver a cargar la wishlist
      fetchWishlistItems();
    } catch (error) {
      setError("Hubo un problema al eliminar el producto de la wishlist.");
    }
  };

  const handleWhatsAppShare = () => {
    const message = wishlistItems.products.map(item => 
      `${item.name}`
    ).join('\n');

    const phoneNumber = '3464581375'; // Reemplaza con el número deseado
    const urlWhatsApp = `https://wa.me/${phoneNumber}?text=Hola,%20me%20gustaría%20consultar%20los%20siguientes%20productos%20en%20mi%20wishlist:%0A${encodeURIComponent(message)}`;

    window.open(urlWhatsApp, '_blank');
  };

  if (loading)
    return <Loading/>;

  return (
    <div className={styles.wishlistContainer}>
      <h1 className={styles.wishlistTitle}>Lista de Deseos de: {username}</h1>
      {error && <p className={styles.TextError}>{error}</p>}
      {wishlistItems.products && wishlistItems.products.length > 0 ? (
        <ul className={styles.wishlistList}>
          {wishlistItems.products.map((item) => (
            <li key={item.id} className={styles.wishlistListItem}>
              <div className={styles.wishlistItemDetails}>
              <img
                    src={item.ProductImages[0].address}
                    alt="img"
                    className={styles.image}
                  />
                <h3>{item.name}</h3>
              </div>
              <div className={styles.wishlistItemActions}>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className={styles.wishlistButton}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.emptyWishlistMessage}>Tu lista de deseos está vacía</p>
      )}
      {wishlistItems.products && wishlistItems.products.length > 0 && (
        <button onClick={handleWhatsAppShare} className={styles.whatsappButton}>
          Consultar en WhatsApp
        </button>
      )}
    </div>
  );
};

export default Wishlist;
