// Plugins
import { URL, fileURLToPath } from 'node:url'
import process from 'node:process'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'
import UnoCSS from 'unocss/vite'
import VueDevTools from 'vite-plugin-vue-devtools'

// Utilities
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
                include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
                imports: [
                    VueRouterAutoImports,
                    {
                        lodash: [['default', '_']],
                        pinia: ['defineStore'],
                        vue: ['ref', 'reactive', 'computed', 'watch', 'watchEffect', 'onMounted', 'toRefs'],
                    },
                ],
                dirs: ['src/@core/utils', 'src/stores', 'src/@core/constants'],
                dts: './src/auto-imports.d.ts',
            }),
            Components({
                dirs: ['src/components'],
                dts: 'src/components.d.ts',
                deep: true,
                directoryAsNamespace: true,
                globalNamespaces: ['global'],
            }),
            Layouts({
                layoutsDirs: 'src/@core/layouts',
                defaultLayout: 'default',
            }),
            VueRouter({
                routesFolder: 'src/pages',
                dts: 'src/typed-router.d.ts',
            }),
            VueDevTools(),
            UnoCSS(),
            vue({
                template: { transformAssetUrls },
                script: {
                    defineModel: true,
                },
            }),
            ViteFonts({
                google: {
                    families: [
                        {
                            name: 'Poppins',
                            styles: 'wght@100;300;400;500;700;900',
                        },
                    ],
                },
            }),
            vuetify({
                autoImport: true,
                styles: {
                    configFile: 'src/assets/sass/style.scss',
                },
            }),
        ],
        define: { 'process.env': {} },
        build: {
            chunkSizeWarningLimit: 5000,
        },
        optimizeDeps: {
            exclude: ['vuetify'],
            entries: ['./src/**/*.vue'],
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                '~': fileURLToPath(new URL('./src', import.meta.url)),
            },
            extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
        },
        server: {
            port: Number.parseInt(env.VITE_PORT) || 3000,
        },
    }
})
