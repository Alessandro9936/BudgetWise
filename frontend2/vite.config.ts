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

  build: {
    // sets the warning threshold for chunk sizes
    chunkSizeWarningLimit: 500,

    //The manualChunks function in rollupOptions allows to specify how chunks should be split, so that the code from external libraries can be separated from the application code, resulting in smaller and more optimized chunks.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // ex. C:/project/node_modules/react-dom/index.js
            return (
              id
                .toString()
                // ex. "C:/project/node_modules/react-dom/index.js"
                .split("node_modules/")[1]
                // ex. ["C:/project/","react-dom/index.js"] => "react-dom/index.js"
                .split("/")[0]
                // ex. ["C:/project/","react-dom/index.js"] => "react-dom/"
                .toString()
            );
          }
        },
      },
    },
  },
  plugins: [react(), splitVendorChunkPlugin()],
});
