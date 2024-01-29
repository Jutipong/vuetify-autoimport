export const useConstant = {
  app: {
    name: import.meta.env.VITE_APP_NAME,
    titleName: import.meta.env.VITE_APP_TITLE_NAME,
    tokenKey: 'efa32@fskf%4dsf',
    userInfKey: 'userInfo',
  },
  baseUrl: {
    api: import.meta.env.VITE_API_UR,
  },
  action: {
    add: 'add',
    edit: 'edit',
    delete: 'delete',
    editing: 'editing',
    submit: 'submit',
    save: 'save',
    view: 'view',
  },
  dataTable: {
    pageSize: 25,
  },
}
