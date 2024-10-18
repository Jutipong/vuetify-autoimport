// vite.config.mts
import process from "node:process";
import { fileURLToPath, URL } from "node:url";
import vue from "file:///C:/DriveD/js.dev/code/vuetify-autoimport/node_modules/.pnpm/@vitejs+plugin-vue@5.1.4_vite@5.4.9_@types+node@22.7.4_sass@1.80.2__vue@3.5.12_typescript@5.5.4_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import UnoCSS from "file:///C:/DriveD/js.dev/code/vuetify-autoimport/node_modules/.pnpm/unocss@0.62.4_postcss@8.4.47_rollup@4.24.0_vite@5.4.9_@types+node@22.7.4_sass@1.80.2_/node_modules/unocss/dist/vite.mjs";
import AutoImport from "file:///C:/DriveD/js.dev/code/vuetify-autoimport/node_modules/.pnpm/unplugin-auto-import@0.18.3_@vueuse+core@11.1.0_vue@3.5.12_typescript@5.5.4___rollup@4.24.0_webpack-sources@3.2.3/node_modules/unplugin-auto-import/dist/vite.js";
import ViteFonts from "file:///C:/DriveD/js.dev/code/vuetify-autoimport/node_modules/.pnpm/unplugin-fonts@1.1.1_vite@5.4.9_@types+node@22.7.4_sass@1.80.2_/node_modules/unplugin-fonts/dist/vite.mjs";
import Components from "file:///C:/DriveD/js.dev/code/vuetify-autoimport/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.25.8_rollup@4.24.0_vue@3.5.12_typescript@5.5.4_/node_modules/unplugin-vue-components/dist/vite.js";
import VueRouter from "file:///C:/DriveD/js.dev/code/vuetify-autoimport/node_modules/.pnpm/unplugin-vue-router@0.10.8_rollup@4.24.0_vue-router@4.4.5_vue@3.5.12_typescript@5.5.4___vue@3_zkg4juth3rmbnne3g66n5w6mci/node_modules/unplugin-vue-router/dist/vite.js";
import { defineConfig, loadEnv } from "file:///C:/DriveD/js.dev/code/vuetify-autoimport/node_modules/.pnpm/vite@5.4.9_@types+node@22.7.4_sass@1.80.2/node_modules/vite/dist/node/index.js";
import Layouts from "file:///C:/DriveD/js.dev/code/vuetify-autoimport/node_modules/.pnpm/vite-plugin-vue-layouts@0.11.0_vite@5.4.9_@types+node@22.7.4_sass@1.80.2__vue-router@4.4.5_vu_isefg5nzam56c255eqjorgqxji/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import vuetify from "file:///C:/DriveD/js.dev/code/vuetify-autoimport/node_modules/.pnpm/vite-plugin-vuetify@2.0.4_vite@5.4.9_@types+node@22.7.4_sass@1.80.2__vue@3.5.12_typescript@5.5.4__vuetify@3.7.3/node_modules/vite-plugin-vuetify/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/DriveD/js.dev/code/vuetify-autoimport/vite.config.mts";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      AutoImport({
        imports: [
          {
            "vue": [
              "useId",
              "ref",
              "reactive",
              "watchEffect",
              "computed",
              "watch",
              "defineProps",
              "defineEmits",
              "defineExpose",
              "withDefaults",
              "toRefs",
              "toRef",
              "onMounted",
              "onUnmounted",
              "shallowRef",
              "onBeforeMount",
              "useTemplateRef"
            ],
            "vue-router": ["useRouter", "useRoute"],
            "pinia": ["defineStore", "acceptHMRUpdate", "storeToRefs"],
            "vuetify": ["useTheme", "useDisplay"],
            "zod": ["z"],
            "@vueuse/core": ["watchDebounced"]
          }
        ],
        dirs: ["./src/**", "!./src/utils/config/**"],
        dts: "./src/auto-imports.d.ts"
      }),
      Components({
        dirs: ["src/components", "src/@core/layouts/components"],
        dts: "src/components.d.ts",
        deep: true,
        directoryAsNamespace: true
      }),
      Layouts({
        layoutsDirs: "src/layouts",
        defaultLayout: "default"
      }),
      VueRouter({
        routesFolder: "src/pages",
        dts: "src/typed-router.d.ts"
      }),
      UnoCSS(),
      vue(),
      vuetify({ autoImport: true }),
      ViteFonts({
        google: {
          families: [
            {
              name: "Inter",
              styles: "wght@100;300;400;500;700;900"
            }
          ]
        }
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler"
          // or "modern", "legacy"
        }
      }
    },
    // build: {
    //     chunkSizeWarningLimit: 5000,
    //     cssCodeSplit: true,
    // },
    optimizeDeps: {
      include: ["vue", "vue-router", "pinia", "axios", "axios-cache-interceptor", "dayjs"],
      entries: ["./src/**/*.vue"],
      exclude: ["vuetify"]
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
        "@core": fileURLToPath(new URL("./src/@core", __vite_injected_original_import_meta_url)),
        "@assets": fileURLToPath(new URL("./assets", __vite_injected_original_import_meta_url)),
        "@components": fileURLToPath(new URL("./src/components", __vite_injected_original_import_meta_url)),
        "@images": fileURLToPath(new URL("./src/assets/images", __vite_injected_original_import_meta_url)),
        "@utils": fileURLToPath(new URL("./src/utils", __vite_injected_original_import_meta_url)),
        "@types": fileURLToPath(new URL("./src/types", __vite_injected_original_import_meta_url))
      },
      extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"]
    },
    server: {
      port: Number.parseInt(env.VITE_PORT) || 3e3
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcRHJpdmVEXFxcXGpzLmRldlxcXFxjb2RlXFxcXHZ1ZXRpZnktYXV0b2ltcG9ydFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcRHJpdmVEXFxcXGpzLmRldlxcXFxjb2RlXFxcXHZ1ZXRpZnktYXV0b2ltcG9ydFxcXFx2aXRlLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L0RyaXZlRC9qcy5kZXYvY29kZS92dWV0aWZ5LWF1dG9pbXBvcnQvdml0ZS5jb25maWcubXRzXCI7aW1wb3J0IHByb2Nlc3MgZnJvbSAnbm9kZTpwcm9jZXNzJ1xyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBWaXRlRm9udHMgZnJvbSAndW5wbHVnaW4tZm9udHMvdml0ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IFZ1ZVJvdXRlciBmcm9tICd1bnBsdWdpbi12dWUtcm91dGVyL3ZpdGUnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCBMYXlvdXRzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1sYXlvdXRzJ1xyXG5pbXBvcnQgdnVldGlmeSBmcm9tICd2aXRlLXBsdWdpbi12dWV0aWZ5J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xyXG4gICAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICAgICAgICAgICAgaW1wb3J0czogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3Z1ZSc6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1c2VJZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncmVmJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyZWFjdGl2ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnd2F0Y2hFZmZlY3QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbXB1dGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd3YXRjaCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGVmaW5lUHJvcHMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RlZmluZUVtaXRzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkZWZpbmVFeHBvc2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3dpdGhEZWZhdWx0cycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndG9SZWZzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0b1JlZicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnb25Nb3VudGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvblVubW91bnRlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc2hhbGxvd1JlZicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnb25CZWZvcmVNb3VudCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndXNlVGVtcGxhdGVSZWYnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndnVlLXJvdXRlcic6IFsndXNlUm91dGVyJywgJ3VzZVJvdXRlJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdwaW5pYSc6IFsnZGVmaW5lU3RvcmUnLCAnYWNjZXB0SE1SVXBkYXRlJywgJ3N0b3JlVG9SZWZzJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd2dWV0aWZ5JzogWyd1c2VUaGVtZScsICd1c2VEaXNwbGF5J10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd6b2QnOiBbJ3onXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0B2dWV1c2UvY29yZSc6IFsnd2F0Y2hEZWJvdW5jZWQnXSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGRpcnM6IFsnLi9zcmMvKionLCAnIS4vc3JjL3V0aWxzL2NvbmZpZy8qKiddLFxyXG4gICAgICAgICAgICAgICAgZHRzOiAnLi9zcmMvYXV0by1pbXBvcnRzLmQudHMnLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgQ29tcG9uZW50cyh7XHJcbiAgICAgICAgICAgICAgICBkaXJzOiBbJ3NyYy9jb21wb25lbnRzJywgJ3NyYy9AY29yZS9sYXlvdXRzL2NvbXBvbmVudHMnXSxcclxuICAgICAgICAgICAgICAgIGR0czogJ3NyYy9jb21wb25lbnRzLmQudHMnLFxyXG4gICAgICAgICAgICAgICAgZGVlcDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRpcmVjdG9yeUFzTmFtZXNwYWNlOiB0cnVlLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgTGF5b3V0cyh7XHJcbiAgICAgICAgICAgICAgICBsYXlvdXRzRGlyczogJ3NyYy9sYXlvdXRzJyxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRMYXlvdXQ6ICdkZWZhdWx0JyxcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIFZ1ZVJvdXRlcih7XHJcbiAgICAgICAgICAgICAgICByb3V0ZXNGb2xkZXI6ICdzcmMvcGFnZXMnLFxyXG4gICAgICAgICAgICAgICAgZHRzOiAnc3JjL3R5cGVkLXJvdXRlci5kLnRzJyxcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIFVub0NTUygpLFxyXG4gICAgICAgICAgICB2dWUoKSxcclxuICAgICAgICAgICAgdnVldGlmeSh7IGF1dG9JbXBvcnQ6IHRydWUgfSksXHJcbiAgICAgICAgICAgIFZpdGVGb250cyh7XHJcbiAgICAgICAgICAgICAgICBnb29nbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBmYW1pbGllczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnSW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVzOiAnd2dodEAxMDA7MzAwOzQwMDs1MDA7NzAwOzkwMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgY3NzOiB7XHJcbiAgICAgICAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIHNjc3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBhcGk6ICdtb2Rlcm4tY29tcGlsZXInLCAvLyBvciBcIm1vZGVyblwiLCBcImxlZ2FjeVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gYnVpbGQ6IHtcclxuICAgICAgICAvLyAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA1MDAwLFxyXG4gICAgICAgIC8vICAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICBvcHRpbWl6ZURlcHM6IHtcclxuICAgICAgICAgICAgaW5jbHVkZTogWyd2dWUnLCAndnVlLXJvdXRlcicsICdwaW5pYScsICdheGlvcycsICdheGlvcy1jYWNoZS1pbnRlcmNlcHRvcicsICdkYXlqcyddLFxyXG4gICAgICAgICAgICBlbnRyaWVzOiBbJy4vc3JjLyoqLyoudnVlJ10sXHJcbiAgICAgICAgICAgIGV4Y2x1ZGU6IFsndnVldGlmeSddLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICBhbGlhczoge1xyXG4gICAgICAgICAgICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICAgICAgICAgICAgICAnQGNvcmUnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL0Bjb3JlJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICAgICAgICAgICAgICAnQGFzc2V0cyc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9hc3NldHMnLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgICAgICAgICAgICdAY29tcG9uZW50cyc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvY29tcG9uZW50cycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICAgICAgICAgICAgJ0BpbWFnZXMnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL2Fzc2V0cy9pbWFnZXMnLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgICAgICAgICAgICdAdXRpbHMnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL3V0aWxzJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICAgICAgICAgICAgICAnQHR5cGVzJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy90eXBlcycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBleHRlbnNpb25zOiBbJy5qcycsICcuanNvbicsICcuanN4JywgJy5tanMnLCAnLnRzJywgJy50c3gnLCAnLnZ1ZSddLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VydmVyOiB7XHJcbiAgICAgICAgICAgIHBvcnQ6IE51bWJlci5wYXJzZUludChlbnYuVklURV9QT1JUKSB8fCAzMDAwLFxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1QsT0FBTyxhQUFhO0FBQzFVLFNBQVMsZUFBZSxXQUFXO0FBQ25DLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxlQUFlO0FBQ3RCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZUFBZTtBQUN0QixTQUFTLGNBQWMsZUFBZTtBQUN0QyxPQUFPLGFBQWE7QUFDcEIsT0FBTyxhQUFhO0FBVjhLLElBQU0sMkNBQTJDO0FBWW5QLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3RDLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFDdkMsU0FBTztBQUFBLElBQ0gsU0FBUztBQUFBLE1BQ0wsV0FBVztBQUFBLFFBQ1AsU0FBUztBQUFBLFVBQ0w7QUFBQSxZQUNJLE9BQU87QUFBQSxjQUNIO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtB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
