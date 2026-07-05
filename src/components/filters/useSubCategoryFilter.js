import { useSearchParams } from "react-router-dom";

export function useSubcategoryFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedSubCategories =
    searchParams.get("subcategory")?.split(",") || [];

  const toggleSubCategory = (id) => {
    const params = new URLSearchParams(searchParams);

    let updated = [...selectedSubCategories];

    if (updated.includes(id)) {
      updated = updated.filter((x) => x !== id);
    } else {
      updated.push(id);
    }

    if (updated.length > 0) {
      params.set("subcategory", updated.join(","));
    } else {
      params.delete("subcategory");
    }

    setSearchParams(params);
  };

  console.log(selectedSubCategories);

  return {
    selectedSubCategories, // ✅ ALWAYS ARRAY
    toggleSubCategory,
  };
}
