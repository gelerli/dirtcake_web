import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import Sitemap from "vite-plugin-sitemap";

export default defineConfig({
  // Adding base: '/' ensures the site works correctly on your custom domain
  base: "/",

  plugins: [
    react(),
    tailwindcss(),
    // Generates a sitemap.xml file on build
    //Sitemap({
    //  hostname: "https://dirtcakestudio.com", // Replace with your actual domain
    //}),
  ],

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
