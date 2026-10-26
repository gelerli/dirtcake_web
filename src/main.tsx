/**
 * main.tsx
 * Entry point for Dirtcake Studio.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { inject } from "@vercel/analytics";
import App from "./App.tsx";
import "./index.css";

// Vercel Web Analytics (cookieless page views + performance).
inject();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
