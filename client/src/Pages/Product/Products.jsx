import React, { useState, useEffect } from "react";
import productos from "../../../utils/products"; // Asegúrate de la ruta correcta
import styles from "./Product.module.css";
import Card from "../../Components/Card/Card";

const Products = () => {
  const [products, setProducts] = useState([]); // Todos los productos
  const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados
  const [page, setPage] = useState(1); // Página actual
  const [pageSize, setPageSize] = useState(6); // Cantidad por página
  const [filters, setFilters] = useState({
    category: "",
    priceRange: { min: 0, max: 50000 },
  }); // Filtros
  const [loading, setLoading] = useState(false); // Loading state

  // Simular la llamada al backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      if (productos.length > 0) {
        setProducts(productos); // Guardar los productos
        setFilteredProducts(productos); // Inicialmente, mostrar todos los productos
      } else {
        console.error("No products found");
      }
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

  // Filtrar productos por categoría y rango de precios
  const applyFilters = () => {
    let filtered = products;

    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max
    );

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
          <option value="category1">Categoría 1</option>
          <option value="category2">Categoría 2</option>
          <option value="cachorro">cachorro</option>
          <option value="cachorrito">cachorrito</option>
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
                <div key={product.id}>
                  <Card image={product.image} title={product.title} />
                </div>
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
          className={
            page ===1
              ? styles.notAllowed
              : styles.pagination
          }
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
