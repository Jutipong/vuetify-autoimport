import { useToast } from 'vue-toastification'

const { success, error, info, warning } = useToast()

export const vNotify = {
  info: (msg: string) => {
    info(msg)
  },
  success: (msg: string) => {
    success(msg)
  },
  warning: (msg: string) => {
    warning(msg)
  },
  error: (msg: string) => {
    error(msg)
  },
}
