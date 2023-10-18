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
  const globalStore = useGlobalStore();
  const { status, data } = error.response;

  notify.error(`status:${status} | message:${data?.message ?? 'เกิดข้อผิดพลาดบางอย่าง'}`);

  globalStore.state.loading = false;

  if (status === 401) {
    logOut();
  }

  // const { errors } = data;
  // let message = [];
  // for (let field in errors) {
  //   message.push(errors[field]);
  // }

  // console.log(data);

  // switch (status) {
  //   case 401:
  //     notify.error('Unauthorized');
  //     logOut();
  //     break;
  //   case 403:
  //     notify.error('การเข้าถึงถูกปฏิเสธ (403)');
  //     break;
  //   case 404:
  //     notify.error('ไม่พบบริการ (404)');
  //     break;
  //   case 408:
  //     notify.error('คำขอหมดเวลา (408)');
  //     break;
  //   case 500:
  //     notify.error('ข้อผิดพลาดของเซิร์ฟเวอร์ (500)');
  //     break;
  //   case 501:
  //     notify.error('ไม่ได้ใช้บริการ (501)');
  //     break;
  //   case 502:
  //     notify.error('ข้อผิดพลาดของเครือข่าย (502)');
  //     break;
  //   case 503:
  //     notify.error('ไม่สามารถให้บริการได้ (503)');
  //     break;
  //   case 504:
  //     notify.error('เครือข่ายหมดเวลา (504)');
  //     break;
  //   case 505:
  //     notify.error('ไม่รองรับเวอร์ชัน HTTP (505)');
  //     break;
  //   default:
  //     notify.error(data?.message ?? 'เกิดข้อผิดพลาดบางอย่าง');
  //     break;
  // }
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
