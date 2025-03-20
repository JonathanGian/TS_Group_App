import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
		  "/verify": {
			target: "https://app.snapvalid.com/api/v1/verify",
			changeOrigin: true,
			rewrite: (path) => path.replace(/^\/verify/, ""),
		  },
		},
	},
});