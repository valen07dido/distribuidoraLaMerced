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

  const updateLocalProduct = (productId, field, value) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, [field]: value } : product
      )
    );
  };

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
        // En lugar de usar el mensaje del servidor, usa uno genérico
        throw new Error("Error en la actualización del producto");
      }
  
      Swal.fire({
        title: "Producto actualizado con éxito",
        icon: "success",
      });
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
  
      // Muestra un mensaje genérico al cliente sin exponer el error original
      Swal.fire({
        title: "Error al actualizar el producto",
        text: "Ocurrió un problema al intentar actualizar el producto. Por favor, inténtalo de nuevo.",
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
                      defaultValue={product.name}
                      onBlur={(e) => {
                        const newValue = e.target.value;
                        updateLocalProduct(product.id, "name", newValue);
                        handleEditProduct(product.id, "name", newValue);
                      }}
                      onChange={(e) => updateLocalProduct(product.id, "name", e.target.value)}
                    />
                  </td>
                  <td className={styles.tableCell}>
                    <input
                      className={styles.input}
                      type="text"
                      defaultValue={product.description}
                      onBlur={(e) => {
                        const newValue = e.target.value;
                        updateLocalProduct(product.id, "description", newValue);
                        handleEditProduct(product.id, "description", newValue);
                      }}
                      onChange={(e) => updateLocalProduct(product.id, "description", e.target.value)}
                    />
                  </td>
                  <td className={styles.tableCell}>
                    <textarea
                      className={styles.textarea}
                      defaultValue={product.ingredients}
                      onBlur={(e) => {
                        const newValue = e.target.value;
                        updateLocalProduct(product.id, "ingredients", newValue);
                        handleEditProduct(product.id, "ingredients", newValue);
                      }}
                      onChange={(e) => updateLocalProduct(product.id, "ingredients", e.target.value)}
                    />
                  </td>
                  <td className={styles.tableCell}>
                    <textarea
                      className={styles.textarea}
                      defaultValue={product.composition
                        .map((comp) => `${comp.name}: ${comp.min}-${comp.max}`)
                        .join(", ")}
                      onBlur={(e) => {
                        const newComposition = e.target.value
                          .split(", ")
                          .map((item) => {
                            const [name, range] = item.split(": ");
                            const [min, max] = range.split("-").map(Number);
                            return { name, min, max };
                          });
                        updateLocalProduct(product.id, "composition", newComposition);
                        handleEditProduct(product.id, "composition", newComposition);
                      }}
                      onChange={(e) => updateLocalProduct(product.id, "composition", e.target.value)}
                    />
                  </td>
                  <td className={styles.tableCell}>
                    <textarea
                      className={styles.textarea}
                      defaultValue={product.feedingGuide
                        .map(
                          (guide) =>
                            `Peso: ${guide.peso_min}-${guide.peso_max} Ración: ${guide.racion_min}-${guide.racion_max}`
                        )
                        .join(", ")}
                      onBlur={(e) => {
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
                        updateLocalProduct(product.id, "feedingGuide", newFeedingGuide);
                        handleEditProduct(product.id, "feedingGuide", newFeedingGuide);
                      }}
                      onChange={(e) => updateLocalProduct(product.id, "feedingGuide", e.target.value)}
                    />
                  </td>
                  <td className={styles.tableCell}>
                    <input
                      className={styles.input}
                      type="number"
                      defaultValue={product.ProductStock.amount}
                      onBlur={(e) => {
                        const newValue = e.target.value;
                        updateLocalProduct(product.id, "stock", newValue);
                        handleEditProduct(product.id, "stock", newValue);
                      }}
                      onChange={(e) => updateLocalProduct(product.id, "stock", e.target.value)}
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
