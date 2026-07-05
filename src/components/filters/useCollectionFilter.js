import { useSearchParams } from "react-router-dom";

export function useCollectionFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCollection = searchParams.get("collection") || "";

  const setCollection = (collectionId) => {
    const params = new URLSearchParams(searchParams);

    if (collectionId) {
      params.set("collection", collectionId);
    } else {
      params.delete("collection");
    }

    // ✅ مهم: reset dependent filters
    params.delete("category");
    params.delete("subcategory");

    setSearchParams(params);
  };

  return { selectedCollection, setCollection };
}
