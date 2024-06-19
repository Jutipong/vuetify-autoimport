// ===========================================
// ========= library confirm dialog ==========
// ===========================================
type color = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

interface ConfirmOptions {
    iconTitle?: string
    btnOk?: {
        text: string
        color: color
        icon?: string
    }
    btnOkDisabled?: boolean
    btnCancel?: {
        color: color
        text: string
        icon?: string
    }
    btnCancelDisabled?: boolean
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
            btnOkDisabled: options?.btnOkDisabled,
            btnCancel: {
                text: 'Cancel',
                color: 'secondary',
            },
            btnCancelDisabled: options?.btnCancelDisabled,
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
            btnOkDisabled: options?.btnOkDisabled,
            btnCancel: {
                text: 'No',
                color: 'secondary',
            },
            btnCancelDisabled: options?.btnCancelDisabled,
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
            btnOkDisabled: options?.btnOkDisabled ?? false,
            btnCancel: {
                text: 'No',
                color: 'secondary',
            },
            btnCancelDisabled: options?.btnCancelDisabled ?? false,
        } as ConfirmOptions, options)

        init(title, message, op)

        return new Promise<boolean>((resolve, reject) => {
            state.resolve = resolve
            state.reject = reject
        })
    },
    // warning: (title: string, message: string, options?: ConfirmOptions) => {
    //   const op = Object.assign({
    //     btnOk: {
    //       text: 'Yes',
    //       color: 'warning',
    //     },
    //     btnCancel: {
    //       text: 'Cancel',
    //       color: 'secondary',
    //     },
    //   } as ConfirmOptions, options)

    //   init(title, message, op)

    //   return new Promise<boolean>((resolve, reject) => {
    //     state.resolve = resolve
    //     state.reject = reject
    //   })
    // },
}
