// Standalone static-SPA build for GitHub Pages, kept fully separate from
// vite.config.ts (the TanStack Start / Lovable-hosted build). The installed
// beta Nitro's static-prerender path is broken for this TanStack Start setup
// (fails with "rolldownOptions.input should not be an html file when
// building for SSR" even on nitro's own plain "static" preset), so this
// bypasses TanStack Start/Nitro entirely: plain Vite + React, client-only
// rendering via src/entry-client-static.tsx, reusing the same route tree.
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  root: "gh-pages",
  base: "/arzoo-s-bouquet/",
  publicDir: "../public",
  plugins: [tsConfigPaths({ root: ".." }), tailwindcss(), viteReact()],
  build: {
    outDir: "../dist-gh-pages",
    emptyOutDir: true,
  },
});
