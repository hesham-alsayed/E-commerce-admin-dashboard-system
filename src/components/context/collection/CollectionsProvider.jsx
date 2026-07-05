import { useCallback, useState } from "react";
import { getAllCollections } from "../../ِApi/collectionApi";
import { CollectionContext } from "./CollectionsContext";

export default function CollectionsProvider({ children }) {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  // 1 ) fetch all collections
  const fetchCollections = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllCollections();
      setCollections(data.collections);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    collections,
    loading,
    fetchCollections,
  };
  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  );
}
