import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import styles from "./EditProduct.module.css";
import getDecryptedData from "../../../utils/getDecryptedData";

const url = import.meta.env.VITE_URL_BACKEND;

const EditProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // Número de productos por página

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
        throw new Error("Error en la actualización del producto");
      }

      Swal.fire({
        title: "Producto actualizado con éxito",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error al actualizar el producto",
        text: "Ocurrió un problema al intentar actualizar el producto. Por favor, inténtalo de nuevo.",
        icon: "error",
      });
    }
  };

  // Paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.globalContain}>
      <div className={styles.container}>
        <h1 className={styles.title}>Edit Products</h1>
        {loading ? (
          <p className={styles.loading}>Cargando productos...</p>
        ) : (
          <>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableHeader}>
                  <th className={`${styles.tableCell} ${styles.tdID}`}>ID</th>
                  <th className={`${styles.tableCell} ${styles.tdName}`}>
                    Name
                  </th>
                  <th className={`${styles.tableCell} ${styles.tdDescription}`}>
                    Description
                  </th>
                  <th className={styles.tableCell}>Ingredients</th>
                  <th className={styles.tableCell}>Composition</th>
                  <th className={styles.tableCell}>Feeding Guide</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product) => (
                  <tr key={product.id} className={styles.tableRow}>
                    <td className={`${styles.tableCell} ${styles.tdID}`}>
                      {product.id}
                    </td>
                    <td className={`${styles.tableCell} ${styles.tdName}`}>
                      <input
                        type="text"
                        defaultValue={product.name}
                        className={styles.inputField}
                        onBlur={(e) => {
                          const newValue = e.target.value;
                          updateLocalProduct(product.id, "name", newValue);
                          handleEditProduct(product.id, "name", newValue);
                        }}
                      />
                    </td>
                    <td
                      className={`${styles.tableCell} ${styles.tdDescription}`}
                    >
                      <input
                        type="text"
                        defaultValue={product.description}
                        className={styles.inputField}
                        onBlur={(e) => {
                          const newValue = e.target.value;
                          updateLocalProduct(
                            product.id,
                            "description",
                            newValue
                          );
                          handleEditProduct(
                            product.id,
                            "description",
                            newValue
                          );
                        }}
                      />
                    </td>
                    <td className={styles.tableCell}>
                      <textarea
                        defaultValue={product.ingredients}
                        className={styles.textareaField}
                        onBlur={(e) => {
                          const newValue = e.target.value;
                          updateLocalProduct(
                            product.id,
                            "ingredients",
                            newValue
                          );
                          handleEditProduct(
                            product.id,
                            "ingredients",
                            newValue
                          );
                        }}
                      />
                    </td>
                    <td className={styles.tableCell}>
                      <textarea
                        defaultValue={product.composition
                          .map(
                            (comp) =>
                              `${comp.name}: ${
                                comp.value || `${comp.min}-${comp.max}`
                              }`
                          )
                          .join(", ")}
                        className={styles.textareaField}
                        onBlur={(e) => {
                          const newComposition = e.target.value
                            .split(", ")
                            .map((item) => {
                              const [name, values] = item.split(": ");
                              const [min, max] = values.split("-").map(Number);
                              return { name, min, max };
                            });
                          updateLocalProduct(
                            product.id,
                            "composition",
                            newComposition
                          );
                          handleEditProduct(
                            product.id,
                            "composition",
                            JSON.stringify(newComposition)
                          );
                        }}
                      />
                    </td>
                    <td className={styles.tableCell}>
                      <textarea
                        defaultValue={product.feedingGuide
                          .map(
                            (guide) =>
                              `Peso: ${guide.peso_min}-${guide.peso_max} Ración: ${guide.racion_min}-${guide.racion_max}`
                          )
                          .join(", ")}
                        className={styles.textareaField}
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
                          updateLocalProduct(
                            product.id,
                            "feedingGuide",
                            newFeedingGuide
                          );
                          handleEditProduct(
                            product.id,
                            "feedingGuide",
                            newFeedingGuide
                          );
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Paginación */}
            <div className={styles.pagination}>
              {Array.from({
                length: Math.ceil(products.length / productsPerPage),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={styles.pageButton}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditProduct;
