// ===========================================
// ========= library alert ==========
// ===========================================
type color = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

interface stateType { isOpen: boolean, icon: string, title: string, subTitle: string, color: color }

const state = reactive<stateType>({
    isOpen: false,
    icon: '',
    title: '',
    subTitle: '',
    color: 'secondary',
})

function reset() {
    state.isOpen = false
    state.icon = ''
    state.title = ''
    state.subTitle = ''
    state.color = 'secondary'
}

function openAlert(title: string, subTitle: string, icon: string, color: color) {
    state.isOpen = true
    state.icon = icon
    state.title = title
    state.subTitle = subTitle
    state.color = color
}

function onClose() {
    state.isOpen = false
    reset()
}

export default {
    state,
    onClose,
}

// ===========================================
// ========== provie alert ==========
// ===========================================
export const vAlert = {
    info: (title: string, subTitle: string) => {
        openAlert(title, subTitle, 'mdi mdi-alert-circle-outline', 'info')
    },
    success: (title: string, subTitle: string) => {
        openAlert(title, subTitle, 'mdi mdi-check-circle-outline', 'success')
    },
    warning: (title: string, subTitle: string) => {
        openAlert(title, subTitle, 'mdi mdi-alert-circle-outline', 'warning')
    },
    error: (title: string, subTitle: string) => {
        openAlert(title, subTitle, 'mdi mdi-close-circle-outline', 'error')
    },
}
