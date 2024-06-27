// ===========================================
// ========= library confirm dialog ==========
// ===========================================
type color = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
type btnType = { text: string, color: color, icon?: string } | false

interface ConfirmOptions {
    iconTitle?: string | false
    btnOk?: btnType
    btnCancel?: btnType
}

const state = reactive({
    isOpen: false,
    message: '',
    title: '',
    resolve: (_val: boolean) => {},
    reject: (_val: boolean) => {},
    options: { } as ConfirmOptions,
})

function reset() {
    state.isOpen = false
    state.title = ''
    state.message = ''
    state.options = {} as ConfirmOptions
}

function init(title: string, message: string, options: ConfirmOptions) {
    state.isOpen = true
    state.title = title
    state.message = message
    state.options = Object.assign(state.options, options)
}

function onOk() {
    state.resolve(true)
    state.isOpen = false
    reset()
}

function onCancel() {
    state.resolve(false)
    state.isOpen = false
    reset()
}

export default {
    state,
    onOk,
    onCancel,
}

// ===========================================
// ========== provie confirm dialog ==========
// ===========================================
export const vConfirm = {
    info: (title: string, message: string, options?: ConfirmOptions) => {
        const op = Object.assign({
            btnOk: {
                text: 'Yes',
                color: 'success',
            },
            btnCancel: {
                text: 'Cancel',
                color: 'secondary',
            },
        } as ConfirmOptions, options)

        init(title, message, op)

        return new Promise<boolean>((resolve, reject) => {
            state.resolve = resolve
            state.reject = reject
        })
    },
    save: (title: string, message: string, options?: ConfirmOptions) => {
        const op = Object.assign({
            iconTitle: 'mdi-content-save',
            btnOk: {
                text: 'Yes',
                color: 'primary',
            },
            btnCancel: {
                text: 'No',
                color: 'secondary',
            },
        } as ConfirmOptions, options)

        init(title, message, op)

        return new Promise<boolean>((resolve, reject) => {
            state.resolve = resolve
            state.reject = reject
        })
    },
    delete: (title: string, message: string, options?: ConfirmOptions) => {
        const op = Object.assign({
            iconTitle: 'mdi-delete',
            btnOk: {
                text: 'Yes',
                color: 'error',
            },
            btnCancel: {
                text: 'No',
                color: 'secondary',
            },
        } as ConfirmOptions, options)

        init(title, message, op)

        return new Promise<boolean>((resolve, reject) => {
            state.resolve = resolve
            state.reject = reject
        })
    },
}
