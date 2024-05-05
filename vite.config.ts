import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { compression } from "vite-plugin-compression2";
import { viteSingleFile } from "vite-plugin-singlefile"
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), compression(), viteSingleFile(), visualizer({gzipSize: true})],
  build: {
    minify: "terser",
    rollupOptions: {
      output: {
      },
    },
  },
});
