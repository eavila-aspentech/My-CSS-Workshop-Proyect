import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Aspentech design system styles (CSS variables, base styles)
import "@aspentech/pf-ui-core/main.css";

// Shoelace light theme + autoloader (registers <sl-*> elements on demand).
// The Aspentech eds-* components are built on top of Shoelace.
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";
import "@shoelace-style/shoelace/dist/shoelace-autoloader.js";

// Material icons used by some eds-* components
import "@material-design-icons/font";

// Register the Aspentech / EDS custom elements
import { defineCustomElements } from "@aspentech/pf-ui-core/loader";

import "./demo.css";
import App from "./App.tsx";

// Point Shoelace at its bundled assets (icons, translations, etc.).
// The package's `exports` map doesn't expose `./dist/` as a directory, so we
// can't derive the base path with `new URL('@shoelace-style/shoelace/dist/', ...)`.
// Use the matching CDN build of the installed version instead.
setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/",
);

defineCustomElements();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
