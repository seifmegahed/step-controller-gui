import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { compression } from "vite-plugin-compression2";
import { viteSingleFile } from "vite-plugin-singlefile"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), compression(), viteSingleFile()],
  build: {
    minify: "terser",
    rollupOptions: {
      output: {
      },
    },
  },
});
