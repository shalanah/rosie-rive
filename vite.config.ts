import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import arraybuffer from "vite-plugin-arraybuffer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    arraybuffer(),
    svgr({
      include: "**/*.svg?react",
      svgrOptions: {
        plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
        icon: true,
      },
    }),
    react(),
  ],
});
