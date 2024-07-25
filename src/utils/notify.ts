import { useToast } from 'vue-toastification'

const { success, error, info, warning } = useToast()

export const _notify = {
    Info: (msg: string) => {
        info(msg)
    },
    Success: (msg: string) => {
        success(msg)
    },
    Warning: (msg: string) => {
        warning(msg)
    },
    Err: (msg: string) => {
        error(msg)
    },
}
