import { useCallback, useState } from "react";
import { SubCategoryContext } from "./SubCategoryContext";
import { getAllSubCategories } from "../../ِApi/subcategoryApi";

export default function SubCategoryProvider({ children }) {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  // 1 ) fetch all subcategories
  const fetchSubcategories = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      const data = await getAllSubCategories(params);
      setSubcategories(data.subcategories);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    subcategories,
    loading,
    fetchSubcategories,
  };
  return (
    <SubCategoryContext.Provider value={value}>
      {children}
    </SubCategoryContext.Provider>
  );
}
