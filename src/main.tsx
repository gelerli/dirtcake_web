/**
 * main.tsx
 * Entry point for Dirtcake Studio.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { inject } from "@vercel/analytics"; // Standard React/Vite import

// @ts-ignore - Failsafe to bypass TS error 2882 if vite-env.d.ts is not yet indexed
import "./index.css";

/**
 * VERCEL ANALYTICS INITIALIZATION
 * Tracks page views and performance across the studio website.
 */
inject();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
