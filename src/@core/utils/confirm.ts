// ===========================================
// ========= library confirm dialog ==========
// ===========================================

interface ConfirmOptions {
  iconTitle?: ''
  btnOk?: {
    text: string
    color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
    icon?: string
  }
  btnCancel?: {
    color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
    text: string
    icon?: string
  }
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
    }, options)

    init(title, message, op)

    return new Promise<boolean>((resolve, reject) => {
      state.resolve = resolve
      state.reject = reject
    })
  },
  // success: (title: string, message: string) => {
  //   onOpen(title, message)
  // },
  // warning: (title: string, message: string) => {
  //   onOpen(title, message)
  // },
  // error: (title: string, message: string) => {
  //   onOpen(title, message)
  // },
}
