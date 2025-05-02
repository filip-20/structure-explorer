import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      name: "structure-explorer",
      fileName: (format) => `structure-explorer.${format}.ts`,
    },
  },
});
