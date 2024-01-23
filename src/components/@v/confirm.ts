const state = reactive({
  isOpen: false,
  message: '',
  title: '',
  // resolve: (_val: boolean) => {},
  // reject: (_val: boolean) => {},
  // options: {
  //   width: 300,
  //   showCancel: true,
  //   persistent: false,
  // } as CreateConfirmDialogOptions,
})

export default {
  state,
}

// import { type InjectionKey, inject, provide } from 'vue'

//  interface CreateConfirmDialogOptions {
//   width?: string | number
//   showCancel?: boolean
//   persistent?: boolean
// }

//  type CreateConfirmDialog = (
//   title: string,
//   content: string,
//   options: CreateConfirmDialogOptions
// ) => Promise<boolean>

// export const CreateConfirmDialogKey: InjectionKey<CreateConfirmDialog> = Symbol('CreateConfirmDialogKey')

// // export function useDialog() {
// //   const dialog = inject(CreateConfirmDialogKey)
// //   provide('useDialog', 'useDialog')
// //   debugger

// //   if (!dialog)
// //     throw new Error('Could not resolve provider')

// //   return dialog
// // }

// export function provideDialog() {
//   const state = reactive({
//       isOpen: false,
//       resolve: (_val: boolean) => {},
//       reject: (_val: boolean) => {},
//       content: '',
//       title: '',
//       options: {
//         width: 300,
//         showCancel: true,
//         persistent: false,
//       } as CreateConfirmDialogOptions,
//     });

//     const createConfirmDialog = (
//       title: string,
//       content: string,
//       options: CreateConfirmDialogOptions = {}
//     ) => {
//       state.isOpen = true;
//       state.title = title;
//       state.content = content;
//       state.options = Object.assign(state.options, options);
//       return new Promise<boolean>((resolve, reject) => {
//         state.resolve = resolve;
//         state.reject = reject;
//       });
//     };

//     // provide(CreateConfirmDialogKey, createConfirmDialog);
//     const agree = () => {
//       state.resolve(true);
//       state.isOpen = false;
//     };
//     const cancel = () => {
//       state.resolve(false);
//       state.isOpen = false;
//     };
//     return {
//       createConfirmDialog,
//       ...toRefs(state),
//       agree,
//       cancel,
//     };
// }

// // export function createConfirmDialog(): CreateConfirmDialog {
// //   return async (title, content, options) => {
// //     return new Promise((resolve, reject) => {
// //       const dialog = useDialog()
// //       dialog(title, content, options)
// //         .then((res) => {
// //           resolve(res)
// //         })
// //         .catch((err) => {
// //           reject(err)
// //         })
// //     })
// //   }
// // }

// // const state = reactive({
// //   isOpen: false,
// //   resolve: (_val: boolean) => {},
// //   reject: (_val: boolean) => {},
// //   content: '',
// //   title: '',
// //   options: {
// //     width: 300,
// //     showCancel: true,
// //     persistent: false,
// //   } as CreateConfirmDialogOptions,
// // })
// // function createConfirmDialog(title: string, content: string, options: CreateConfirmDialogOptions = {}) {
// //   state.isOpen = false
// //   state.title = title
// //   state.content = content
// //   state.options = Object.assign(state.options, options)
// //   return new Promise<boolean>((resolve, reject) => {
// //     state.resolve = resolve
// //     state.reject = reject
// //   })
// // }
