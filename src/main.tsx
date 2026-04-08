/**
 * main.tsx
 * Entry point for Dirtcake Studio.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// @ts-ignore - Failsafe to bypass TS error 2882 if vite-env.d.ts is not yet indexed
import "./index.css";

/**
 * GITHUB PAGES 404 REDIRECT HANDLER
 * Converts query-string redirects (from 404.html) back into clean URLs.
 * This ensures Googlebot sees the correct content when it follows a sitemap link.
 */
(function () {
  const redirect = window.location.search;
  if (redirect.startsWith("?/")) {
    const cleanPath = redirect.slice(2).replace(/~and~/g, "&");
    window.history.replaceState(
      null,
      "",
      window.location.pathname.slice(0, -1) + cleanPath,
    );
  }
})();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
