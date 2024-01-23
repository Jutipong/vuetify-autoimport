import useConfirm from '@/components/@v/confirm'

function onOpen(title: string, message: string) {
  useConfirm.state.isOpen = true
  useConfirm.state.title = title
  useConfirm.state.message = message
}

export const vConfirm = {
  info: (title: string, message: string) => {
    onOpen(title, message)
  },
  success: (title: string, message: string) => {
    onOpen(title, message)
  },
  warning: (title: string, message: string) => {
    onOpen(title, message)
  },
  error: (title: string, message: string) => {
    onOpen(title, message)
  },
}
