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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [filters, setFilters] = useState({
    category: "",
    type: "", // Filtro para tipos
  });
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/products`);
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      extractUniqueCategoriesAndTypes(data);
    } catch (error) {
      console.error("Error fetching products:", error);
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

    setCategories(uniqueCategories);
    setTypes(uniqueTypes);
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

    setFilteredProducts(filtered);
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
      </div>

      {loading ? (
        <Loading/>
      ) : (
        <div>
          <div className={styles.grid}>
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                  <div key={product.id} >
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
