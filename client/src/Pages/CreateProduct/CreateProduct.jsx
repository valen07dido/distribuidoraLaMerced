import React, { useState } from "react";
import styles from "./CreateProduct.module.css";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    ingredients: "",
    composition: [
      { name: "Proteína Bruta", min: "", max: "" },
      { name: "Extracto Etéreo", min: "", max: "" },
      { name: "Fibra Cruda", min: "", max: "" },
      { name: "Minerales Totales", value: "" },
      { name: "Humedad", value: "" },
      { name: "Calcio", min: "", max: "" },
      { name: "Fósforo", min: "", max: "" },
      { name: "Valor Energético", value: "" },
    ],
    feedingGuide: [
      { peso_min: "", peso_max: "", racion_min: "", racion_max: "" },
    ],
    images: [],
    stock: { amount: "" },
    categories: [],
    types: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCompositionChange = (index, e) => {
    const { name, value } = e.target;
    const newComposition = [...product.composition];
    newComposition[index][name] = value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      composition: newComposition,
    }));
  };

  const handleFeedingGuideChange = (index, e) => {
    const { name, value } = e.target;
    const newFeedingGuide = [...product.feedingGuide];
    newFeedingGuide[index][name] = value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      feedingGuide: newFeedingGuide,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: files,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      categories: value.split(",").map((cat) => cat.trim()),
    }));
  };

  const handleTypeChange = (e) => {
    const { value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      types: value.split(",").map((type) => type.trim()),
    }));
  };

  const addFeedingGuide = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      feedingGuide: [
        ...prevProduct.feedingGuide,
        { peso_min: "", peso_max: "", racion_min: "", racion_max: "" },
      ],
    }));
  };

  const removeFeedingGuide = (index) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      feedingGuide: prevProduct.feedingGuide.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // todo: Aquí agregar la lógica para enviar los datos a la API
    console.log("Product created:", product);
  };

  return (
    <div className={styles.globalContainer}>
      <div className={styles.container}>
        <h1 className={styles.title}>Crea un nuevo producto</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.containTextarea}>
            <label htmlFor="description">Descripcion:</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              className={styles.textarea}
              required
            />
          </div>
          <div className={styles.containTextarea}>
            <label htmlFor="ingredients">Ingredientes:</label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={product.ingredients}
              onChange={handleChange}
              className={styles.textarea}

            />
          </div>
          {product.composition.map((item, index) => (
            <div key={index}>
              <h4>Composición - {item.name}</h4>
              {item.value !== undefined && item.value !== null ? (
                <div>
                  <label>valor:</label>
                  <input
                    type="number"
                    name="value"
                    value={item.value}
                    onChange={(e) => handleCompositionChange(index, e)}
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label>Min:</label>
                    <input
                      type="number"
                      name="min"
                      value={item.min}
                      onChange={(e) => handleCompositionChange(index, e)}
                    />
                  </div>
                  <div>
                    <label>Max:</label>
                    <input
                      type="number"
                      name="max"
                      value={item.max}
                      onChange={(e) => handleCompositionChange(index, e)}
                    />
                  </div>
                </>
              )}
            </div>
          ))}

          <h3>Guia alimentaria:</h3>
          {product.feedingGuide.map((guide, index) => (
            <div key={index}>
              <div>
                <label>Peso Min:</label>
                <input
                  type="number"
                  name="peso_min"
                  value={guide.peso_min}
                  onChange={(e) => handleFeedingGuideChange(index, e)}
                />
              </div>
              <div>
                <label>Peso Max:</label>
                <input
                  type="number"
                  name="peso_max"
                  value={guide.peso_max}
                  onChange={(e) => handleFeedingGuideChange(index, e)}
                />
              </div>
              <div>
                <label>Racion Min:</label>
                <input
                  type="number"
                  name="racion_min"
                  value={guide.racion_min}
                  onChange={(e) => handleFeedingGuideChange(index, e)}
                />
              </div>
              <div>
                <label>Racion Max:</label>
                <input
                  type="number"
                  name="racion_max"
                  value={guide.racion_max}
                  onChange={(e) => handleFeedingGuideChange(index, e)}
                />
              </div>
              <button type="button" onClick={() => removeFeedingGuide(index)}>
                Eliminar
              </button>
            </div>
          ))}
          <button type="button" onClick={addFeedingGuide}>
            Añadir Ración
          </button>

          <div>
            <label htmlFor="images">Imagenes:</label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={handleImageChange}
            />
          </div>
          <div>
            <label htmlFor="stock">Stock:</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={product.stock.amount}
              onChange={(e) =>
                setProduct((prevProduct) => ({
                  ...prevProduct,
                  stock: { amount: e.target.value },
                }))
              }
            />
          </div>
          <div>
            <label htmlFor="categories">Categoria (separado por comas):</label>
            <input
              type="text"
              id="categories"
              name="categories"
              onChange={handleCategoryChange}
              placeholder="Medianos,Grandes"
            />
          </div>
          <div>
            <label htmlFor="types">Tipo o raza (separado por comas):</label>
            <input
              type="text"
              id="types"
              name="types"
              onChange={handleTypeChange}
              placeholder="Gatos,Perros"
            />
          </div>
          <button type="submit" className={styles.button}>
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
