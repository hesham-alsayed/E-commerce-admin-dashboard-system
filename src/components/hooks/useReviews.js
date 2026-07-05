import { useContext } from "react";
import { ReviewContext } from "../context/review/ReviewContext";

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("useReviews must be used within ReviewProvider");
  }
  return context;
};
