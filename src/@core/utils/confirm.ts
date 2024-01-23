import useConfirm from '@/components/@v/confirm'

function onOpen(title: string, content: string) {
  useConfirm.state.isOpen = true
  useConfirm.state.title = title
  useConfirm.state.content = content
}

export const vConfirm = {
  info: (title: string, content: string) => {
    onOpen(title, content)
  },
  success: (title: string, content: string) => {
    onOpen(title, content)
  },
  warning: (title: string, content: string) => {
    onOpen(title, content)
  },
  error: (title: string, content: string) => {
    onOpen(title, content)
  },
}
