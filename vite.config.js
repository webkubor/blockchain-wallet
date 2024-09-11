import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import viteCompression from "vite-plugin-compression";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "development" ? "/" : "./",
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
  build: {
    brotliSize: false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 2000,
  },
  define: {
    global: {},
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: `@import './src/styles/index.scss';`,
      },
    },
  },
  plugins: [
    vue(),
    viteCompression(),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
});
