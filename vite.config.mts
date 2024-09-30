import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import ViteFonts from 'unplugin-fonts/vite'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig, loadEnv } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'
import vuetify from 'vite-plugin-vuetify'
import { vueConfig } from './src/utils/config/vite'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    return {
        plugins: [
            AutoImport({
                imports: [
                    {
                        'vue': vueConfig,
                        'vue-router': ['useRouter'],
                        'pinia': ['defineStore', 'acceptHMRUpdate'],
                        'vuetify': ['useTheme', 'useDisplay'],
                        'zod': ['z'],
                        '@vueuse/core': ['watchDebounced'],
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
                layoutsDirs: 'src/layouts',
                defaultLayout: 'default',
            }),
            VueRouter({
                routesFolder: 'src/pages',
                dts: 'src/typed-router.d.ts',
            }),
            UnoCSS(),
            vue(),
            vuetify({
                autoImport: true,
                // styles: {
                //     configFile: 'src/assets/sass/style.scss',
                // },
            }),
            ViteFonts({
                google: {
                    families: [
                        {
                            name: 'Inter',
                            styles: 'wght@100;300;400;500;700;900',
                        },
                    ],
                },
            }),
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler', // or "modern", "legacy"
                    implements: [
                        'src/assets/sass/style.scss',
                    ],
                },
            },
        },
        // build: {
        //     chunkSizeWarningLimit: 5000,
        //     cssCodeSplit: true,
        // },
        optimizeDeps: {
            include: ['vue', 'vue-router', 'pinia', 'axios', 'axios-cache-interceptor', 'dayjs'],
            entries: ['./src/**/*.vue'],
            exclude: ['vuetify'],
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                '@core': fileURLToPath(new URL('./src/@core', import.meta.url)),
                '@assets': fileURLToPath(new URL('./assets', import.meta.url)),
                '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
                '@images': fileURLToPath(new URL('./src/assets/images', import.meta.url)),
                '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
                '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
            },
            extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
        },
        server: {
            port: Number.parseInt(env.VITE_PORT) || 3000,
        },
    }
})
