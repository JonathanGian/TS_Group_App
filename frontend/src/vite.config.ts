import { defineConfig } from "vite";
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://app.snapvalid.com",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ""),
      }
    }
  }
});