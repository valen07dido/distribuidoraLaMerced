import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import styles from "./EditProduct.module.css";
import getDecryptedData from "../../../utils/getDecryptedData";

const url = import.meta.env.VITE_URL_BACKEND;

const EditProduct = () => {
  const [products, setProducts] = useState([]);

  // Función para obtener productos
  const fetchProducts = async () => {
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
    }
  };

  // Efecto para obtener productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Función para manejar la edición de un producto
  const handleEditProduct = async (productId, field, value) => {
    const token = getDecryptedData("tokenSession");
    console.log(field,value)
    try {
      const response = await fetch(`${url}/products/update/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ field, value }), // Enviar el formato { field, value }
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
    <div className={styles.container}>
      <h1>Edit Products</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Ingredients</th>
            <th>Composition</th>
            <th>Feeding Guide</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <input
                  type="text"
                  defaultValue={product.name}
                  onBlur={(e) =>
                    handleEditProduct(product.id, "name", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={product.description}
                  onBlur={(e) =>
                    handleEditProduct(product.id, "description", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={product.ingredients}
                  onBlur={(e) =>
                    handleEditProduct(product.id, "ingredients", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
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
                    handleEditProduct(product.id, "composition", newComposition);
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
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
                    handleEditProduct(product.id, "feedingGuide", newFeedingGuide);
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  defaultValue={product.ProductStock.amount}
                  onBlur={(e) =>
                    handleEditProduct(product.id, "stock", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditProduct;
