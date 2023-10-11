import axios from 'axios';
const { getToken } = useLocalStorages;

// create axios
const api = axios.create({
  baseURL: appConfig.url.api,
  timeout: 5000,
  headers: { 'Access-Control-Allow-Origin': '*' },
});

const err = (error: any) => {
  const { logOut } = useAuthStore();
  debugger;
  const { status, data } = error.response;

  // const { errors } = data;
  // let message = [];
  // for (let field in errors) {
  //   message.push(errors[field]);
  // }

  console.log(data);

  switch (status) {
    case 401:
      //   defaultNotify.message = '';
      //   Notify.create(defaultNotify);
      logOut();
      break;
    case 403:
      //   defaultNotify.message = 'การเข้าถึงถูกปฏิเสธ (403)';
      //   Notify.create(defaultNotify);
      break;
    case 404:
      //   defaultNotify.message = 'ไม่พบบริการ (404)';
      //   Notify.create(defaultNotify);
      break;
    case 408:
      //   defaultNotify.message = 'คำขอหมดเวลา (408)';
      //   Notify.create(defaultNotify);
      break;
    case 500:
      //   defaultNotify.message = 'ข้อผิดพลาดของเซิร์ฟเวอร์ (500)';
      //   Notify.create(defaultNotify);
      break;
    case 501:
      //   defaultNotify.message = 'ไม่ได้ใช้บริการ (501)';
      //   Notify.create(defaultNotify);
      break;
    case 502:
      //   defaultNotify.message = 'ข้อผิดพลาดของเครือข่าย (502)';
      //   Notify.create(defaultNotify);
      break;
    case 503:
      //   defaultNotify.message = 'ไม่สามารถให้บริการได้ (503)';
      //   Notify.create(defaultNotify);
      break;
    case 504:
      //   defaultNotify.message = 'เครือข่ายหมดเวลา (504)';
      //   Notify.create(defaultNotify);
      break;
    case 505:
      //   defaultNotify.message = 'ไม่รองรับเวอร์ชัน HTTP (505)';
      //   Notify.create(defaultNotify);
      break;
    default:
      //   Notify.create(defaultNotify);
      break;
  }
  return Promise.reject(error);
};

// request interceptor
api.interceptors.request.use((config: any) => {
  config.headers['Access-Control-Allow-Origin'] = '*';
  config.headers['Content-Type'] = 'application/json';
  config.headers['Authorization'] = 'Bearer ' + getToken();

  return config;
}, err);

// response interceptor

api.interceptors.response.use(({ data, config }: any) => {
  // if (['put', 'post', 'delete', 'patch'].includes(config.method) && data.meta) {
  //   store.commit('SHOW_SNACKBAR', { text: data.meta.message, color: 'success' });
  // }

  return data;
}, err);

export default api;
