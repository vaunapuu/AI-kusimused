import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { version } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        quietDeps: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Format the entry file names and chunk file names with the version
        entryFileNames: `[name]-v${version}.js`,
        chunkFileNames: `[name]-v${version}.js`,
        assetFileNames: `[name]-v${version}.[ext]`,
      },
    },
  },
});
