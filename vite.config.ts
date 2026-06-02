import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Site is served from the domain root (https://eavila-aspentech.github.io/).
  // If you switch to a project page (e.g. /My-CSS-Workshop-Proyect/), change
  // this to "/My-CSS-Workshop-Proyect/".
  base: "/",
});
