import { useContext } from "react";
import { CategoryContext } from "../context/category/CategroyContext";
import { SubCategoryContext } from "../context/subcategory/SubCategoryContext";

export const useSubCategories = () => {
  const context = useContext(SubCategoryContext);
  if (!context) {
    throw new Error(
      "useSubCategories must be used within Subcategories Provider",
    );
  }
  return context;
};
