// async function EnvInit() {
//     await fetch('config.json')
//         .then(response => response.json())
//         .then((config) => {
//             (window as any).appsetting = config as ImportMetaEnv
//         })
// }

function useEnv() {
    if (import.meta.env.DEV) {
        return import.meta.env as ImportMetaEnv
    }
    else {
        return {
            VITE_PORT: (window as any).aa,
            VITE_APP_TITLE: (window as any).bb,
        } as unknown as ImportMetaEnv
    }
}

export {
    // EnvInit,
    useEnv,
}
