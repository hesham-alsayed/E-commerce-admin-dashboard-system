import React, { useCallback, useState } from "react";
import {
  deleteProductById,
  getAllProducts,
  getOneProduct,
} from "../../ِApi/productsApi";
import { ProductsContext } from "./ProductsContext";

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    numberOfPages: 1,
  });
  const [loading, setLoading] = useState(false);

  //   1 fetch all products
  const fetchProducts = useCallback(async (params = {}) => {
    try {
      console.log(params);
      setLoading(true);
      const data = await getAllProducts(params);
      console.log(data);
      setProducts(data.products);
      setPagination({
        currentPage: data.pagination.currentPage,
        numberOfPages: data.pagination.numberOfPages,
      });
      return data.products;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductById = useCallback(async (id) => {
    try {
      setLoading(true);
      const data = await getOneProduct(id);
      console.log(data);
      setProduct(data.product);
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);
  const fetchDeleteProduct = useCallback(async (id) => {
    try {
      const data = await deleteProductById(id);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(true);
    }
  }, []);


  const value = {
    products,
    fetchProducts,
    product,
    fetchProductById,
    fetchDeleteProduct,
    loading,
    pagination,
  };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}
