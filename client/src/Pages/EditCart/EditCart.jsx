import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import styles from "./EditCart.module.css";
import getDecryptedData from "../../../utils/getDecryptedData";

const url = import.meta.env.VITE_URL_BACKEND;

const EditCart = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCarts = async () => {
    setLoading(true);
    const token = getDecryptedData("tokenSession");
    try {
      const response = await fetch(`${url}/products/cart/allcarts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        setCarts(data);
      } else {
        Swal.fire({
          title: "Error al cargar los carritos",
          icon: "error",
          text:data
        });
      }
    } catch (error) {
      console.error("Error fetching carts:", error);
      Swal.fire({
        title: "Error de conexión",
        text: "Ocurrió un problema al intentar cargar los carritos.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const finalizeCart = async (cartId) => {
    const token = getDecryptedData("tokenSession");
    try {
      const response = await fetch(`${url}/products/cart/update/state/${cartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      console.log(response.json)
      if (!response.ok) {
        throw new Error("Error al finalizar el carrito");
      }

      Swal.fire({
        title: "Carrito finalizado con éxito",
        icon: "success",
      });

      // Filtra el carrito que se ha finalizado
      setCarts(carts.filter((cart) => cart.id !== cartId));
    } catch (error) {
      console.error("Error al finalizar carrito:", error);
      Swal.fire({
        title: "Error al finalizar el carrito",
        text: "Ocurrió un problema al intentar finalizar el carrito. Por favor, inténtalo de nuevo.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  return (
    <div className={styles.globalContain}>
      <div className={styles.container}>
        <h1 className={styles.title}>Carritos de Compras</h1>
        {loading ? (
          <p className={styles.loading}>Cargando carritos...</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th className={styles.tableCell}>ID</th>
                <th className={styles.tableCell}>Cliente</th>
                <th className={styles.tableCell}>Productos</th>
                <th className={styles.tableCell}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((cart) => (
                <tr key={cart.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>{cart.id}</td>
                  <td className={styles.tableCell}>
                    {cart.user
                      ? `${cart.user.name} (${cart.user.email})`
                      : "Cliente desconocido"}
                  </td>
                  <td className={styles.tableCell}>
                    {cart.products && cart.products.length > 0 ? (
                      <div>
                        {cart.products.map((product) => (
                          <div key={product.id}>
                            <div>{product.name}</div>
                            <div className={styles.productImages}>
                              {product.images.map((image, index) => (
                                <img
                                  key={index}
                                  src={image}
                                  alt={product.name}
                                  className={styles.productImage}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>No hay productos en el carrito</div>
                    )}
                  </td>
                  <td className={styles.tableCell}>
                    <button
                      className={styles.finalizeButton}
                      onClick={() => finalizeCart(cart.id)}
                    >
                      Finalizar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EditCart;
