import React, { useState, useEffect } from "react";
import styles from "./Product.module.css";
import Card from "../../Components/Card/Card";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
const url = import.meta.env.VITE_URL_BACKEND;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]); // Tipos únicos
  const [priceCategories, setPriceCategories] = useState([]); // Categorías de precio
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [filters, setFilters] = useState({
    category: "",
    type: "", // Filtro para tipos
    priceCategory: "", // Filtro para categorías de precio
  });
  const [loading, setLoading] = useState(false);
  const [noProducts, setNoProducts] = useState(false); // Nuevo estado

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/products`);
      const data = await response.json();

      // Asegúrate de que data es un array
      if (!Array.isArray(data) || data.length === 0) {
        setNoProducts(true); // No hay productos
        setProducts([]); // Limpia el estado de products
        setFilteredProducts([]); // Limpia el estado de filteredProducts
      } else {
        // Ordenar las imágenes de cada producto por su posición
        data.forEach((product) => {
          product.ProductImages.sort((a, b) => a.position - b.position);
        });

        setProducts(data);
        setFilteredProducts(data); // Actualiza ambos estados
        extractUniqueCategoriesAndTypes(data); // Extrae categorías, tipos y categorías de precio
        setNoProducts(false); // Resetear estado si hay productos
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setNoProducts(true); // Si hay un error, asume que no hay productos
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const extractUniqueCategoriesAndTypes = (products) => {
    const allCategories = products.flatMap((product) =>
      product.ProductCategories.map((category) => category.name)
    );
    const uniqueCategories = [...new Set(allCategories)];

    const allTypes = products.flatMap((product) =>
      product.ProductTypes.map((type) => type.name)
    );
    const uniqueTypes = [...new Set(allTypes)];

    const allPriceCategories = products.map((product) => product.priceCategory);
    const uniquePriceCategories = [...new Set(allPriceCategories)];

    setCategories(uniqueCategories);
    setTypes(uniqueTypes);
    setPriceCategories(uniquePriceCategories);
  };

  const applyFilters = () => {
    let filtered = products;

    if (filters.category) {
      filtered = filtered.filter((product) =>
        product.ProductCategories.some(
          (category) => category.name === filters.category
        )
      );
    }

    if (filters.type) {
      filtered = filtered.filter((product) =>
        product.ProductTypes.some((type) => type.name === filters.type)
      );
    }

    if (filters.priceCategory) {
      filtered = filtered.filter(
        (product) => product.priceCategory === filters.priceCategory
      );
    }

    setFilteredProducts(filtered);

    // Si no hay productos después de filtrar, establecer noProducts en true
    setNoProducts(filtered.length === 0);
    setPage(1);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleCategoryChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: e.target.value,
    }));
  };

  const handlePriceCategoryChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceCategory: e.target.value,
    }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className={styles.container}>
      <h1>Productos</h1>

      <div className={styles.filter}>
        <label>Categoría:</label>
        <select
          value={filters.category}
          onChange={handleCategoryChange}
          className={styles.category}
        >
          <option value="">Todas</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label>Tipo:</label>
        <select
          value={filters.type}
          onChange={(e) =>
            setFilters((prevFilters) => ({
              ...prevFilters,
              type: e.target.value,
            }))
          }
          className={styles.category}
        >
          <option value="">Todos</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <label>Categoría de Precio:</label>
        <select
          value={filters.priceCategory}
          onChange={handlePriceCategoryChange}
          className={styles.category}
        >
          <option value="">Todas</option>
          {priceCategories.map((priceCategory) => (
            <option key={priceCategory} value={priceCategory}>
              {priceCategory}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loading />
      ) : noProducts ? (
        <div className={styles.noProductsMessage}>
          <h2>No hay productos disponibles.</h2>
          <p className={styles.p}>
            Por favor, vuelve más tarde o verifique los filtros.
          </p>
        </div>
      ) : (
        <div>
          <div className={styles.grid}>
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <div key={product.id}>
                  <Card
                    image={product.ProductImages[0]?.address || ""}
                    name={product.name}
                    productId={product.id}
                    category={product.ProductCategories[0]}
                    type={product.ProductTypes[0]}
                  />
                </div>
              ))
            ) : (
              <p className={styles.p}>
                No se encontraron productos para los filtros seleccionados.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Paginación */}
      {!noProducts && (
        <div>
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            className={page === 1 ? styles.notAllowed : styles.pagination}
          >
            Anterior
          </button>
          <span className={styles.page}>Página {page}</span>
          <button
            disabled={page * pageSize >= filteredProducts.length}
            onClick={() => handlePageChange(page + 1)}
            className={
              page * pageSize >= filteredProducts.length
                ? styles.notAllowed
                : styles.pagination
            }
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
