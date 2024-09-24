import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import styles from "./EditProduct.module.css";
import getDecryptedData from "../../../utils/getDecryptedData";

const url = import.meta.env.VITE_URL_BACKEND;

const EditProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/products`);
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
      } else {
        Swal.fire({
          title: "Error al cargar los productos",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditProduct = async (productId, field, value) => {
    const token = getDecryptedData("tokenSession");
    try {
      const response = await fetch(`${url}/products/update/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ field, value }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el producto");
      }

      Swal.fire({
        title: "Producto actualizado con éxito",
        icon: "success",
      });
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      Swal.fire({
        title: "Error al actualizar el producto",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className={styles.globalContain}>
      <div className={styles.container}>
        <h1 className={styles.title}>Edit Products</h1>
        {loading ? (
          <p className={styles.loading}>Cargando productos...</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th className={styles.tableCell}>ID</th>
                <th className={styles.tableCell}>Name</th>
                <th className={styles.tableCell}>Description</th>
                <th className={styles.tableCell}>Ingredients</th>
                <th className={styles.tableCell}>Composition</th>
                <th className={styles.tableCell}>Feeding Guide</th>
                <th className={styles.tableCell}>Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>{product.id}</td>
                  <td className={styles.tableCell}>
                    <input
                      className={styles.input}
                      type="text"
                      value={product.name}
                      onChange={(e) =>
                        handleEditProduct(product.id, "name", e.target.value)
                      }
                    />
                  </td>
                  <td className={styles.tableCell}>
                    <input
                      className={styles.input}
                      type="text"
                      value={product.description}
                      onChange={(e) =>
                        handleEditProduct(
                          product.id,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className={styles.tableCell}>
                    <textarea
                      className={styles.textarea}
                      value={product.ingredients}
                      onChange={(e) =>
                        handleEditProduct(
                          product.id,
                          "ingredients",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className={styles.tableCell}>
                    <textarea
                      className={styles.textarea}
                      value={product.composition
                        .map((comp) => `${comp.name}: ${comp.min}-${comp.max}`)
                        .join(", ")}
                      onChange={(e) => {
                        const newComposition = e.target.value
                          .split(", ")
                          .map((item) => {
                            const [name, range] = item.split(": ");
                            const [min, max] = range.split("-").map(Number);
                            return { name, min, max };
                          });
                        handleEditProduct(
                          product.id,
                          "composition",
                          newComposition
                        );
                      }}
                    />
                  </td>
                  <td className={styles.tableCell}>
                    <textarea
                      className={styles.textarea}
                      value={product.feedingGuide
                        .map(
                          (guide) =>
                            `Peso: ${guide.peso_min}-${guide.peso_max} Ración: ${guide.racion_min}-${guide.racion_max}`
                        )
                        .join(", ")}
                      onChange={(e) => {
                        const newFeedingGuide = e.target.value
                          .split(", ")
                          .map((item) => {
                            const [weight, ration] = item.split(" Ración: ");
                            const [pesoMin, pesoMax] = weight
                              .replace("Peso: ", "")
                              .split("-")
                              .map(Number);
                            const [racionMin, racionMax] = ration
                              .split("-")
                              .map(Number);
                            return {
                              peso_min: pesoMin,
                              peso_max: pesoMax,
                              racion_min: racionMin,
                              racion_max: racionMax,
                            };
                          });
                        handleEditProduct(
                          product.id,
                          "feedingGuide",
                          newFeedingGuide
                        );
                      }}
                    />
                  </td>
                  <td className={styles.tableCell}>
                    <input
                      className={styles.input}
                      type="number"
                      value={product.ProductStock.amount}
                      onChange={(e) =>
                        handleEditProduct(product.id, "stock", e.target.value)
                      }
                    />
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

export default EditProduct;
