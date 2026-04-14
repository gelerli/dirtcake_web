import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  // Adding base: '/' ensures the site works correctly on your custom domain
  base: "/",

  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      // Maps '@' to the root directory for cleaner imports
      "@": path.resolve(__dirname, "."),
    },
  },

  server: {
    // HMR (Hot Module Replacement) configuration for development efficiency
    hmr: process.env.DISABLE_HMR !== "true",
  },
});
