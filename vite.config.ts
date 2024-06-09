import vue from "@vitejs/plugin-vue";
import { URL, fileURLToPath } from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ConfigEnv, defineConfig, loadEnv } from "vite";


// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) =>
  defineConfig({
    base: loadEnv(mode, process.cwd()).VITE_BASE_PATH,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
      extensions: [".js", ".json", ".ts"],
    },
    css: {
      preprocessorOptions: {
        scss: { additionalData: "" },
      },
      postcss: {
        plugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
    plugins: [
      vue({ template: {}, script: { defineModel: true } }),

      AutoImport({
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue", "vue-router", "pinia"],

        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          // Auto import icon components
          // 自动导入图标组件
          // IconsResolver({ prefix: "Icon" }),
        ],

        dts: "src/auto-imports.d.ts",
        eslintrc: { enabled: true },
      }),

      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ["vue", "md"],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [],
        dts: "src/components.d.ts",
      }),

      // Icons({ autoInstall: true }),

      //Inspect(),
    ],
    server: {},
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              const a = id.toString().split("node_modules/");
              return a.at(-1)?.split("/")[0];
            } else if (id.includes("/")) {
              return "index";
            }
          },
        },
      },
    },
  });
