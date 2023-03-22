import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  resolve: {
    alias: {
      'bootstrap-css': path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.min.css')
    },
  },

  plugins: [react(), tsconfigPaths()],
  
  css: {
    preprocessorOptions: {
      // Agrega un prefijo personalizado para las clases de Bootstrap
      module: {
        localsConvention: 'camelCaseOnly',
        generateScopedName: 'bts-[local]'
      },
      sass: {
        additionalData: `@import "bootstrap-css";`
      },
      less: {
        additionalData: `@import "bootstrap-css";`
      },
      stylus: {
        additionalData: `@import "bootstrap-css";`
      }
    }
  }
});