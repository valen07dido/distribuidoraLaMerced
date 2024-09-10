import React, { useState, useEffect } from "react";
import styles from "./Product.module.css";
import Card from "../../Components/Card/Card";
import { Link } from "react-router-dom";
const url = import.meta.env.VITE_URL_BACKEND;

const Products = () => {
  const [products, setProducts] = useState([]); // Todos los productos
  const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados
  const [categories, setCategories] = useState([]); // Categorías únicas
  const [page, setPage] = useState(1); // Página actual
  const [pageSize, setPageSize] = useState(6); // Cantidad por página
  const [filters, setFilters] = useState({
    category: "",
    priceRange: { min: 0, max: 50000 },
  }); // Filtros
  const [loading, setLoading] = useState(false); // Loading state

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/product`);
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data); // Inicialmente todos los productos están filtrados
      extractUniqueCategories(data); // Extraer categorías únicas
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Llamada a la API cuando se carga el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Función para extraer categorías únicas de los productos
  const extractUniqueCategories = (products) => {
    const allCategories = products.flatMap((product) =>
      product.ProductCategories.map((category) => category.name)
    );
    const uniqueCategories = [...new Set(allCategories)]; // Filtrar únicas
    setCategories(uniqueCategories); // Guardar las categorías únicas
  };

  // Filtrar productos por categoría y rango de precios
  const applyFilters = () => {
    let filtered = products;

    // Filtro de categoría
    if (filters.category) {
      filtered = filtered.filter((product) =>
        product.ProductCategories.some(
          (category) => category.name === filters.category
        )
      );
    }

    // Puedes implementar un filtro por precio aquí si tus productos incluyen un campo de precio

    setFilteredProducts(filtered);
    setPage(1); // Reiniciar a la página 1 después de aplicar los filtros
  };

  // Actualizar productos filtrados cuando cambien los filtros
  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  // Paginación
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Funciones para manejar los filtros
  const handleCategoryChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: e.target.value,
    }));
  };

  const handlePriceRangeChange = (min, max) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: { min, max },
    }));
  };

  // Cambiar página
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className={styles.container}>
      <h1>Productos</h1>

      {/* Filtros */}
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

        <label>Rango de precios:</label>
        <input
          type="number"
          placeholder="Min"
          value={filters.priceRange.min}
          onChange={(e) =>
            handlePriceRangeChange(e.target.value, filters.priceRange.max)
          }
          className={styles.inputs}
        />
        <input
          type="number"
          placeholder="Max"
          value={filters.priceRange.max}
          onChange={(e) =>
            handlePriceRangeChange(filters.priceRange.min, e.target.value)
          }
          className={styles.inputs}
        />
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <div className={styles.grid}>
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <Link to={`/productos/${product.id}`} className={styles.card}>
                  <div key={product.id}>
                    <Card
                      image={product.ProductImages[0]?.address || ""}
                      name={product.name}
                      category={product.ProductCategories[0]}
                    />
                  </div>
                </Link>
              ))
            ) : (
              <p>No se encontraron productos.</p>
            )}
          </div>
        </div>
      )}

      {/* Paginación */}
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
    </div>
  );
};

export default Products;
