import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "",
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js",
  },

  server: {
    proxy: {
      "/staging": {
        target: "https://staging.registry.ondc.org/lookup",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/staging/, ""),
      },
      "/preprod": {
        target: "https://preprod.registry.ondc.org/lookup",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/preprod/, ""),
      },
      "/prod": {
        target: "https://prod.registry.ondc.org/lookup",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/prod/, ""),
      },
    },
  },
});
