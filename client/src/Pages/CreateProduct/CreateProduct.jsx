import React, { useState } from "react";
import styles from "./CreateProduct.module.css";
import getDecryptedData from "../../../utils/getDecryptedData";

const url = import.meta.env.VITE_URL_BACKEND;

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    categoryName: "",
    typeName: "",
    images: [],
    stock: "",
    ingredients: "",
    composition: [],
    feedingGuide: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProduct((prev) => ({ ...prev, images: Array.from(e.target.files) }));
  };

  const handleCompositionChange = (index, field, value) => {
    const updatedComposition = [...product.composition];
    updatedComposition[index] = {
      ...updatedComposition[index],
      [field]: value,
    };
    setProduct((prev) => ({ ...prev, composition: updatedComposition }));
  };

  const handleFeedingGuideChange = (index, field, value) => {
    const updatedGuide = [...product.feedingGuide];
    updatedGuide[index] = { ...updatedGuide[index], [field]: value };
    setProduct((prev) => ({ ...prev, feedingGuide: updatedGuide }));
  };

  const addComposition = () => {
    setProduct((prev) => ({
      ...prev,
      composition: [...prev.composition, { name: "", min: "", max: "" }],
    }));
  };

  const addFeedingGuide = () => {
    setProduct((prev) => ({
      ...prev,
      feedingGuide: [
        ...prev.feedingGuide,
        { peso_min: "", peso_max: "", racion_min: "", racion_max: "" },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getDecryptedData("tokenSession");
    
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("categoryName", product.categoryName);
    formData.append("typeName", product.typeName);
    formData.append("stock", product.stock);
    formData.append("ingredients", product.ingredients);
    
    // Agregar imágenes a FormData
    if (product.images.length > 0) {
      product.images.forEach((image) => {
        formData.append("images", image); // Ahora se agrega como un archivo
      });
    } else {
      console.error("No se han seleccionado imágenes.");
      return;
    }
  
    // Agregar composición y guía de alimentación si es necesario
    product.composition.forEach((comp, index) => {
      formData.append(`composition[${index}][name]`, comp.name);
      formData.append(`composition[${index}][min]`, comp.min);
      formData.append(`composition[${index}][max]`, comp.max);
    });
    
    // Para cada guía de alimentación
    product.feedingGuide.forEach((guide, index) => {
      formData.append(`feedingGuide[${index}][peso_min]`, guide.peso_min);
      formData.append(`feedingGuide[${index}][peso_max]`, guide.peso_max);
      formData.append(`feedingGuide[${index}][racion_min]`, guide.racion_min);
      formData.append(`feedingGuide[${index}][racion_max]`, guide.racion_max);
    });
    try {
      const response = await fetch("http://localhost:3001/products/create", {
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        const errorResponse = await response.json(); // Obtiene el error del backend
        throw new Error(errorResponse.message || "Error al crear el producto");
      }
      
      alert("Producto creado exitosamente");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al crear el producto: " + error.message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        name="name"
        placeholder="Nombre"
        onChange={handleChange}
        value={product.name}
        required
      />
      <textarea
        className={styles.input}
        name="description"
        placeholder="Descripción"
        onChange={handleChange}
        value={product.description}
        required
      />
      <input
        className={styles.input}
        type="text"
        name="categoryName"
        placeholder="Categoría"
        onChange={handleChange}
        value={product.categoryName}
        required
      />
      <input
        className={styles.input}
        type="text"
        name="typeName"
        placeholder="Tipo"
        onChange={handleChange}
        value={product.typeName}
        required
      />
      <input
        className={styles.input}
        type="number"
        name="stock"
        placeholder="Stock"
        onChange={handleChange}
        value={product.stock}
        required
      />
      <textarea
        className={styles.input}
        name="ingredients"
        placeholder="Ingredientes"
        onChange={handleChange}
        value={product.ingredients}
        required
      />
      <input
        className={styles.input}
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        required
      />
      <h3 className={styles.title}>Composición</h3>
      {product.composition.map((comp, index) => (
        <div key={index} className={styles.compositionSection}>
          <input
            className={styles.input}
            type="text"
            placeholder="Nombre"
            value={comp.name}
            onChange={(e) =>
              handleCompositionChange(index, "name", e.target.value)
            }
          />
          <input
            className={styles.input}
            type="number"
            placeholder="Min"
            value={comp.min}
            onChange={(e) =>
              handleCompositionChange(index, "min", e.target.value)
            }
          />
          <input
            className={styles.input}
            type="number"
            placeholder="Max"
            value={comp.max}
            onChange={(e) =>
              handleCompositionChange(index, "max", e.target.value)
            }
          />
        </div>
      ))}
      <button type="button" className={styles.button} onClick={addComposition}>
        Agregar Composición
      </button>
      <h3 className={styles.title}>Guía de Alimentación</h3>
      {product.feedingGuide.map((guide, index) => (
        <div key={index} className={styles.feedingGuideSection}>
          <input
            className={styles.input}
            type="number"
            placeholder="Peso Min"
            value={guide.peso_min}
            onChange={(e) =>
              handleFeedingGuideChange(index, "peso_min", e.target.value)
            }
          />
          <input
            className={styles.input}
            type="number"
            placeholder="Peso Max"
            value={guide.peso_max}
            onChange={(e) =>
              handleFeedingGuideChange(index, "peso_max", e.target.value)
            }
          />
          <input
            className={styles.input}
            type="number"
            placeholder="Ración Min"
            value={guide.racion_min}
            onChange={(e) =>
              handleFeedingGuideChange(index, "racion_min", e.target.value)
            }
          />
          <input
            className={styles.input}
            type="number"
            placeholder="Ración Max"
            value={guide.racion_max}
            onChange={(e) =>
              handleFeedingGuideChange(index, "racion_max", e.target.value)
            }
          />
        </div>
      ))}
      <button type="button" className={styles.button} onClick={addFeedingGuide}>
        Agregar Guía de Alimentación
      </button>
      <button type="submit" className={styles.button}>
        Crear Producto
      </button>
    </form>
  );
};

export default CreateProduct;
