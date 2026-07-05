import { useContext } from "react";
import { PageContext } from "../context/page/PageContext";

export const usePages = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePages must be used within PagesProvider");
  }
  return context;
};
