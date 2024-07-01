/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PORT: number
    readonly VITE_APP_TITLE: string
    readonly VITE_APP_NAME: string
    readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
