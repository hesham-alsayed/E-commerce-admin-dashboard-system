import { useContext } from "react";
import { ShippingZoneContext } from "../context/shippingzone/ShippingZoneContext";

export const useCollections = () => {
  const context = useContext(ShippingZoneContext);
  if (!context) {
    throw new Error("useShippingZone must be used within ShippingZone Provider");
  }
  return context;
};
