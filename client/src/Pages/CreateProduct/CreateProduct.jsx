import React, { useState, useEffect } from "react";
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
    priceCategory: "", // Nuevo campo para la categoría de precio
  });
  const [categories, setCategories] = useState([]); // Para almacenar categorías
  const [types, setTypes] = useState([]); // Para almacenar tipos
  const [otherCategory, setOtherCategory]=useState(false)
  const [otherType,SetOtherType]=useState(false)
  useEffect(() => {
    const fetchCategoriesAndTypes = async () => {
      try {
        const responseCategories = await fetch(`${url}/products/get/categories`); // Cambia la URL según tu API
        const responseTypes = await fetch(`${url}/products/get/types`); // Cambia la URL según tu API
        const categoriesData = await responseCategories.json();
        const typesData = await responseTypes.json();
        setCategories(categoriesData); // Asigna las categorías a su estado
        setTypes(typesData); // Asigna los tipos a su estado
      } catch (error) {
        console.error("Error fetching categories or types:", error);
      }
    };

    fetchCategoriesAndTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Actualiza el estado del producto
    setProduct((prev) => ({ ...prev, [name]: value }));
  
    // Verifica si el campo categoryName ha cambiado
    if (name === "categoryName") {
      // Comprueba si el valor seleccionado no está en el arreglo de categorías
      const isCustomCategory = !categories.some(category => category.name === value);
      setOtherCategory(isCustomCategory); // Cambia el estado según el resultado
    }
  
    // Verifica si el campo typeName ha cambiado
    if (name === "typeName") {
      // Comprueba si el valor seleccionado no está en el arreglo de tipos
      const isCustomType = !types.some(type => type.name === value);
      SetOtherType(isCustomType); // Cambia el estado según el resultado
    }
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
    swal.showLoading();
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
        formData.append("images", image);
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
      const data = await response.json();
      if (data.error) {
        return swal.fire({
          title: "Error",
          text: data.response,
          icon: "error",
        });
      }

      swal.fire({
        title: "Producto Creado exitosamente",
        text: "Ya está disponible en el apartado Productos",
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

  // Funciones para manejar el arrastre de imágenes
  const handleDragStart = (index) => (e) => {
    e.dataTransfer.setData("dragIndex", index);
  };

  const handleDrop = (index) => (e) => {
    const dragIndex = e.dataTransfer.getData("dragIndex");
    const draggedImage = product.images[dragIndex];
    const updatedImages = [...product.images];
    updatedImages.splice(dragIndex, 1);
    updatedImages.splice(index, 0, draggedImage);
    setProduct((prev) => ({ ...prev, images: updatedImages }));
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Permitir que el área de destino acepte el drop
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

        {/* Selector de categorías */}
        <select
          name="categoryName"
          value={product.categoryName}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">Seleccionar categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
          <option value="otro">Otra categoría...</option>
        </select>
        {otherCategory && (
          <input
            className={styles.input}
            type="text"
            placeholder="Escriba su categoría"
            onChange={(e) => setProduct((prev) => ({ ...prev, categoryName: e.target.value }))}
          />
        )}

        {/* Selector de tipos */}
        <select
          name="typeName"
          value={product.typeName}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">Seleccionar tipo</option>
          {types.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
          <option value="otro">Otro tipo...</option>
        </select>
        {otherType && (
          <input
            className={styles.input}
            type="text"
            placeholder="Escriba su tipo"
            onChange={(e) => setProduct((prev) => ({ ...prev, typeName: e.target.value }))}
          />
        )}

        {/* Selector de categoría de precio */}
        <select
          name="priceCategory"
          value={product.priceCategory}
          onChange={handleChange}
          required
          className={styles.select}

        >
          <option value="">Seleccionar categoría de precio</option>
          <option value="Económico">Económico</option>
          <option value="Premium">Premium</option>
          <option value="Super Premium">Super Premium</option>
          <option value="Otro">Otro</option>
        </select>

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
        
        <h3 className={styles.title}>Imágenes Seleccionadas</h3>
        <div className={styles.imagePreviewContainer}>
          {product.images.length > 0 ? (
            product.images.map((image, index) => (
              <div
                key={index}
                className={styles.imagePreview}
                draggable
                onDragStart={handleDragStart(index)}
                onDrop={handleDrop(index)}
                onDragOver={handleDragOver}
              >
                <img src={URL.createObjectURL(image)} alt={`Imagen ${index + 1}`} />
              </div>
            ))
          ) : (
            <p>No hay imágenes seleccionadas.</p>
          )}
        </div>

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
                  placeholder="Mínimo"
                  value={comp.min}
                  onChange={(e) =>
                    handleCompositionChange(index, "min", e.target.value)
                  }
                />
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Máximo"
                  value={comp.max}
                  onChange={(e) =>
                    handleCompositionChange(index, "max", e.target.value)
                  }
                />
              </>
            )}
          </div>
        ))}
        <button type="button" onClick={addComposition}>
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
        <button type="button" onClick={addFeedingGuide}>
          Agregar Guía de Alimentación
        </button>
        <button type="submit"  className={styles.button}>Crear Producto</button>
      </form>
    </div>
  );
};

export default CreateProduct;
