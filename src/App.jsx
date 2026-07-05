import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import React from "react";
import RouteTracker from "./routes/RouteTracker";

export default function App() { 
  return (
    <>
      <RouteTracker />
      <AppRoutes />
    </>
  );
}
