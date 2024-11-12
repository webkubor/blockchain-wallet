import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import viteCompression from "vite-plugin-compression";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import { vitePluginForArco } from '@arco-plugins/vite-vue'
// https://vitejs.dev/config/
export default defineConfig({
  // base: "/blockchain-wallet/",
  // publicDir: "/blockchain-wallet/", 
  base: "",
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
  build: {
    reportCompressedSize: false,
    chunkSizeWarningLimit: 2000,
  },
  define: {
    global: {},
  },

  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        math: "always",
        additionalData: `@import './src/styles/index.less';`,
      },
    },
  },
  plugins: [
    vue(),
    viteCompression(),
    AutoImport({
      resolvers: [ArcoResolver()],
    }),
    vitePluginForArco({
      style: 'css'
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true
        })
      ]
    })
  ],
});
