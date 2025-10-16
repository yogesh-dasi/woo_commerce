import { useState, useEffect } from "react";
import { evaluateSegment, fetchProducts } from "../services/apis";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError(err.message);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async (filterRules) => {
    setLoading(true);
    setError("");
    try {
      const filtered = await evaluateSegment(filterRules);
      setFilteredProducts(filtered);
    } catch (err) {
      setError(err.message);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setFilteredProducts(products);
  };

  return {
    products,
    filteredProducts,
    loading,
    error,
    loadProducts,
    applyFilters,
    resetFilters,
  };
};
