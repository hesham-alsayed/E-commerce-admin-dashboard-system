import { useSearchParams } from "react-router-dom";

export function usePriceFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawMin = searchParams.get("minPrice");
  const rawMax = searchParams.get("maxPrice");

  // ✅ مهم: null = مفيش فلتر
  const minPrice = rawMin !== null ? Number(rawMin) : null;
  const maxPrice = rawMax !== null ? Number(rawMax) : null;

  const handlePrice = (newMin, newMax) => {
    const params = new URLSearchParams(searchParams);

    if (newMin !== undefined && newMin !== null && newMin !== "") {
      params.set("minPrice", newMin);
    } else {
      params.delete("minPrice");
    }

    if (newMax !== undefined && newMax !== null && newMax !== "") {
      params.set("maxPrice", newMax);
    } else {
      params.delete("maxPrice");
    }

    setSearchParams(params);
  };

  return { minPrice, maxPrice, handlePrice };
}
