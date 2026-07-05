import { useSearchParams } from "react-router-dom";

export function useStockFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  // current value from URL
  const stock = searchParams.get("stock");

  const setStock = (value) => {
    const params = new URLSearchParams(searchParams);

    if (!value || value === "all") {
      params.delete("stock");
    } else {
      params.set("stock", value);
    }

    setSearchParams(params);
  };

  return {
    stock, 
    setStock, // change value
  };
}
