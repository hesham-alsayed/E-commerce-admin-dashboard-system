import { useContext } from "react";
import { ShippingContext } from "../context/shipping/ShippingContext";

export const useShipping = () => {
  const context = useContext(ShippingContext);
  if (!context) {
    throw new Error("useShipping must be used within ShippingProvider");
  }
  return context;
};
