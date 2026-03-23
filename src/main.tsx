/**
 * main.tsx
 * Standard entry point for the React application.
 * No modifications were required here to fix the mobile gallery bug,
 * as the logic is contained within the Home component.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
