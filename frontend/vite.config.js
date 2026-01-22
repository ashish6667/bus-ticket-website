import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Load environment variables from .env
const API_BASE_URL = process.env.VITE_API_BASE_URL || "http://localhost:5000";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Only used in development
      "/api": {
        target: API_BASE_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
