import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import ViteFonts from 'unplugin-fonts/vite'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig, loadEnv } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineConfig(({ mode, command }) => {
    const env = loadEnv(mode, process.cwd())
    if (command === 'serve') {
        const componentsDtsPath = path.resolve(__dirname, 'src/components.d.ts')
        if (fs.existsSync(componentsDtsPath)) {
            fs.unlinkSync(componentsDtsPath)
            console.log('Deleted components.d.ts')
        }
    }
    return {
        plugins: [
            AutoImport({
                imports: [
                    {
                        'vue': [
                            'useId',
                            'ref',
                            'reactive',
                            'watchEffect',
                            'computed',
                            'watch',
                            'defineProps',
                            'defineEmits',
                            'defineExpose',
                            'toRefs',
                            'toRef',
                            'onBeforeMount',
                            'onMounted',
                            'useTemplateRef',
                        ],
                        'vue-router': ['useRouter', 'useRoute'],
                        'pinia': ['defineStore', 'acceptHMRUpdate', 'storeToRefs'],
                        'vuetify': ['useTheme', 'useDisplay'],
                        'zod': ['z'],
                        '@vueuse/core': ['watchDebounced'],
                    },
                ],
                dirs: ['./src/**', '!./src/utils/config/**'],
                dts: './src/auto-imports.d.ts',
            }),
            Components({
                dirs: ['src/components', '!./src/components/@layouts/**'],
                dts: 'src/components.d.ts',
                deep: true,
                directoryAsNamespace: true,
            }),
            Layouts({
                layoutsDirs: 'src/components/@layouts',
                defaultLayout: 'default',
            }),
            VueRouter({
                routesFolder: 'src/pages',
                dts: 'src/typed-router.d.ts',
            }),
            UnoCSS({
                content: {
                    pipeline: {
                        include: ['**/*.vue', '**/*.ts'],
                    },
                },
            }),
            Vue({
                template: {
                    transformAssetUrls,
                },
            }),
            Vuetify({
                autoImport: true,
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
                    api: 'modern',
                },
            },
        },
        build: {
            chunkSizeWarningLimit: 1024 * 1024, // Set the limit to 1 MB
            cssCodeSplit: true,
        },
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
