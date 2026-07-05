import { useContext } from "react";
import { CollectionContext } from "../context/collection/CollectionsContext";

export const useCollections = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error("useCollections must be used within Collections Provider");
  }
  return context;
};
