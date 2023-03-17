import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      layout: path.resolve(__dirname, "./src/layout"),
      store: path.resolve(__dirname, "./src/store"),
      views: path.resolve(__dirname, "./src/views"),
      types: path.resolve(__dirname, "./src/types"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      utils: path.resolve(__dirname, "./src/utils"),
      config: path.resolve(__dirname, "./src/config"),
      services: path.resolve(__dirname, "./src/services"),
      routes: path.resolve(__dirname, "./src/routes"),
    },
  },
  plugins: [react()],
  server: {
    port: 3987,
  },
})
