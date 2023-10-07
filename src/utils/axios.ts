// import { boot } from 'quasar/wrappers';
// import { Notify } from 'quasar';
// import axios, { AxiosInstance } from 'axios';
// import { access_token } from '../constant';

// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $axios: AxiosInstance;
//   }
// }

// // Be careful when using SSR for cross-request state pollution
// // due to creating a Singleton instance here;
// // If any client changes this (global) instance, it might be a
// // good idea to move this instance creation inside of the
// // "export default () => {}" function below (which runs individually
// // for each client)
// const api = axios.create({ baseURL: process.env.BASE_URL });

// export default boot(({ app, router }) => {
//   // for use inside Vue files (Options API) through this.$axios and this.$api

//   //interceptor request
//   api.interceptors.request.use(
//     function (config) {
//       const token = localStorage.getItem(access_token);
//       if (token) {
//         try {
//           config.headers.Authorization = `Bearer ${token}`;
//         } catch (error) {
//           return Promise.reject(error);
//         }
//       }
//       return config;
//     },
//     function (error) {
//       return Promise.reject(error);
//     }
//   );

//   //interceptor response
//   api.interceptors.response.use(
//     function (response) {
//       return response;
//     },
//     async function (error) {
//       // const originalRequest = error.config;

//       const defaultNotify = {
//         message: 'ความผิดพลาดที่ไม่ทราบสาเหตุ',
//         icon: 'warning',
//         color: 'warning',
//       };

//       if (
//         error.code === 'ECONNABORTED' ||
//         error.message.indexOf('timeout') !== -1 ||
//         error.message === 'Network Error'
//       ) {
//         defaultNotify.message = 'ความผิดปกติของเครือข่าย';
//         Notify.create(defaultNotify);
//         return Promise.reject(error);
//       }

//       switch (error.response.status) {
//         case 401:
//           defaultNotify.message = '';
//           Notify.create(defaultNotify);
//           localStorage.removeItem(access_token);
//           router.push('/login');
//           break;
//         case 403:
//           defaultNotify.message = 'การเข้าถึงถูกปฏิเสธ (403)';
//           Notify.create(defaultNotify);
//           break;
//         case 404:
//           defaultNotify.message = 'ไม่พบบริการ (404)';
//           Notify.create(defaultNotify);
//           break;
//         case 408:
//           defaultNotify.message = 'คำขอหมดเวลา (408)';
//           Notify.create(defaultNotify);
//           break;
//         case 500:
//           defaultNotify.message = 'ข้อผิดพลาดของเซิร์ฟเวอร์ (500)';
//           Notify.create(defaultNotify);
//           break;
//         case 501:
//           defaultNotify.message = 'ไม่ได้ใช้บริการ (501)';
//           Notify.create(defaultNotify);
//           break;
//         case 502:
//           defaultNotify.message = 'ข้อผิดพลาดของเครือข่าย (502)';
//           Notify.create(defaultNotify);
//           break;
//         case 503:
//           defaultNotify.message = 'ไม่สามารถให้บริการได้ (503)';
//           Notify.create(defaultNotify);
//           break;
//         case 504:
//           defaultNotify.message = 'เครือข่ายหมดเวลา (504)';
//           Notify.create(defaultNotify);
//           break;
//         case 505:
//           defaultNotify.message = 'ไม่รองรับเวอร์ชัน HTTP (505)';
//           Notify.create(defaultNotify);
//           break;
//         default:
//           Notify.create(defaultNotify);
//           break;
//       }
//       return Promise.reject(error);
//     }
//   );

//   app.config.globalProperties.$axios = axios;
//   // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
//   //       so you won't necessarily have to import axios in each vue file

//   app.config.globalProperties.$api = api;
//   // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
//   //       so you can easily perform requests against your app's API
// });

// export { api };
