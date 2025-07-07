import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { version } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/AI-kusimused/',
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        quietDeps: true,
      },
    },
  },
  build: {
    outDir: "dist", // Output directory for Hugo or S3
    assetsDir: "", // Place assets in the root of `dist` instead of an `assets` directory
    rollupOptions: {
      output: {
        // Inline all dynamic imports to ensure a single file output
        inlineDynamicImports: true,
        manualChunks: undefined, // Disables code splitting by chunks
        entryFileNames: `AI-Act-Questionnaire-v${version}.js`, // Output file name for JS with version
        assetFileNames: `AI-Act-Questionnaire-v${version}.[ext]`, // Output file name for CSS with version
      },
    },
    assetsInlineLimit: 0, // Prevent asset inlining to avoid extra files
  },
});
