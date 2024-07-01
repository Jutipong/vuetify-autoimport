import { URL, fileURLToPath } from 'node:url'
import process from 'node:process'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import UnoCSS from 'unocss/vite'

import { defineConfig, loadEnv } from 'vite'

// Auto imports
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Layouts from 'vite-plugin-vue-layouts'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
        plugins: [
            AutoImport({
                imports: [
                    VueRouterAutoImports,
                    {
                        typescript: ['readonly', 'Record', 'Partial', 'Pick', 'Omit', 'Exclude', 'Extract', 'NonNullable', 'ReturnType', 'InstanceType', 'Required', 'ThisType'],
                        vue: ['ref', 'reactive', 'watchEffect', 'computed', 'watch', 'defineProps', 'defineEmits', 'defineExpose', 'withDefaults', 'toRefs', 'toRef', 'onMounted', 'onUnmounted'],
                        pinia: ['defineStore', 'acceptHMRUpdate'],
                        lodash: [['default', '_']],
                        vuetify: ['useTheme', 'useDisplay'],
                    },
                ],
                dirs: ['./src/**'],
                dts: './src/auto-imports.d.ts',
            }),
            Components({
                dirs: ['src/components', 'src/@core/layouts/components'],
                dts: 'src/components.d.ts',
                deep: true,
                directoryAsNamespace: true,
            }),
            Layouts({
                layoutsDirs: 'src/@core/layouts',
                defaultLayout: 'default',
            }),
            VueRouter({
                routesFolder: 'src/pages',
                dts: 'src/typed-router.d.ts',
            }),
            UnoCSS(),
            vue({
                template: {
                    transformAssetUrls,
                },
                script: {
                    defineModel: true,
                },
            }),
            vuetify({
                autoImport: true,
                styles: {
                    configFile: 'src/assets/sass/style.scss',
                },
            }),
        ],
        build: {
            chunkSizeWarningLimit: 5000,
        },
        optimizeDeps: {
            include: ['vue', 'vue-router', 'pinia', 'axios', 'lodash', 'axios-cache-interceptor'],
            entries: ['./src/**/*.vue'],
            exclude: ['vuetify'],
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
            },
            extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
        },
        server: {
            port: Number.parseInt(env.VITE_PORT) || 3000,
        },
    }
})
