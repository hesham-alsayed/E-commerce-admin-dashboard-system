import { useContext } from "react";
import { CategoryContext } from "../context/category/CategroyContext";

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategories must be used within categories Provider");
  }
  return context;
};
