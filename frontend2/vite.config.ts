import { defineConfig } from "vite";
import { splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  plugins: [react(), splitVendorChunkPlugin()],

  server: {
    proxy: {
      "/api": {
        target: "https://budgetwise-api.up.railway.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
