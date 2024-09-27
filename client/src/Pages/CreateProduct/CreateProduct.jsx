import React, { useState } from "react";
import styles from "./CreateProduct.module.css";
import getDecryptedData from "../../../utils/getDecryptedData";
import swal from "sweetalert2";
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
      composition: [
        ...prev.composition,
        { name: "", isSingleValue: false, value: "", min: "", max: "" },
      ],
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
    swal.fire({
      title: "Creando componente",
      text: "aguarde unos instantes, estamos procesando la informacion",
      icon: "info",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
    });
    swal.showLoading()
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
      formData.append(`composition[${index}][value]`, comp.value);
    });

    // Para cada guía de alimentación
    product.feedingGuide.forEach((guide, index) => {
      formData.append(`feedingGuide[${index}][peso_min]`, guide.peso_min);
      formData.append(`feedingGuide[${index}][peso_max]`, guide.peso_max);
      formData.append(`feedingGuide[${index}][racion_min]`, guide.racion_min);
      formData.append(`feedingGuide[${index}][racion_max]`, guide.racion_max);
    });
    try {
      const response = await fetch(`${url}/products/create`, {
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });
      swal.close();
      const data =await response.json()
      if (data.error) {
        return swal.fire({
          title: "Error",
          text: data.response,
          icon: "error",
        });
      }

      swal.fire({
        title: "Producto Creado exitosamente",
        text: "Ya esta disponible en el apartado Productos",
        icon: "success",
      });
    } catch (error) {
      return swal.fire({
        title: "Error",
        text: error,
        icon: "error",
      });
    }
  };

  return (
    <div className={styles.globalContainer}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h1>Cree su Producto</h1>
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          value={product.name}
          required
        />
        <div className={styles.containTextarea}>
          <textarea
            className={styles.textarea}
            name="description"
            placeholder="Descripción"
            onChange={handleChange}
            value={product.description}
            required
          />
        </div>
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
        <div className={styles.containTextarea}>
          <textarea
            className={styles.textarea}
            name="ingredients"
            placeholder="Ingredientes"
            onChange={handleChange}
            value={product.ingredients}
            required
          />
        </div>
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
            <label>
              <input
                type="checkbox"
                checked={comp.isSingleValue}
                onChange={() =>
                  handleCompositionChange(
                    index,
                    "isSingleValue",
                    !comp.isSingleValue
                  )
                }
              />
              Usar solo un valor
            </label>

            {comp.isSingleValue ? (
              <input
                className={styles.input}
                type="number"
                placeholder="Valor"
                value={comp.value}
                onChange={(e) =>
                  handleCompositionChange(index, "value", e.target.value)
                }
              />
            ) : (
              <>
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
              </>
            )}
          </div>
        ))}
        <button
          type="button"
          className={styles.button}
          onClick={addComposition}
        >
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
        <button
          type="button"
          className={styles.button}
          onClick={addFeedingGuide}
        >
          Agregar Guía de Alimentación
        </button>
        <button type="submit" className={styles.button}>
          Crear Producto
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
