import { useSearchParams } from "react-router-dom";

export function useCategoryFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";

  const setCategory = (categoryId) => {
    const params = new URLSearchParams(searchParams);

    if (categoryId) {
      params.set("category", categoryId);
    } else {
      params.delete("category");
    }

    // ✅ reset subcategory
    params.delete("subcategory");

    setSearchParams(params);
  };

  return { selectedCategory, setCategory };
}
