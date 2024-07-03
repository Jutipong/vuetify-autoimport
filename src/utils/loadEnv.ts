async function EnvInit() {
    debugger
    await fetch('config.json')
        .then(response => response.json())
        .then((config) => {
            (window as any).appsetting = config as ImportMetaEnv
        })
}

function useEnv() {
    if (dev == true) {
        return import.meta.env as ImportMetaEnv
    }
    else {
        return (window as any).appsetting as ImportMetaEnv
    }
}

export {
    EnvInit,
    useEnv,
}
