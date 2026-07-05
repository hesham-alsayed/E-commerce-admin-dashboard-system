import { useCallback, useState } from "react";
import { getAllCategories } from "../../ِApi/categoryApi";
import { CategoryContext } from "./CategroyContext";

export default function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  // 1 ) fetch all categories
  const fetchCategories = useCallback(async (params) => {
    try {
      setLoading(true);
      const data = await getAllCategories(params);
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    categories,
    loading,
    fetchCategories,
  };
  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}
