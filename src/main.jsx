import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppProviders from "./components/context/AppProviders";
import { InputSelectionFix } from "./components/InputSelectionFix";
import { ThemeProvider } from "./components/ThemeProvider";
import "./lib/chart"

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <InputSelectionFix />
    <AppProviders>
      <BrowserRouter>
        <Toaster
          richColors
          position="bottom-right"
          toastOptions={{
            style: {
              zIndex: 99999,
            },
          }}
        />
        <ScrollToTop />
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </AppProviders>
  </StrictMode>,
);
