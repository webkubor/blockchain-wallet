import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import viteCompression from "vite-plugin-compression";
import Components from "unplugin-vue-components/vite";
// import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/blockchain-wallet/",
  publicDir: "/blockchain-wallet/", 
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
    // Components({
    //   resolvers: [NaiveUiResolver()],
    // }),
  ],
});
