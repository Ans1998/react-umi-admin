import { extend } from 'umi-request';
import { message } from 'antd';
import qs from 'qs';
import {Base64} from 'js-base64'
import router from 'umi/router';
/**
 * 异常处理程序
 */
// const codeMessage = {
//   200: '服务器返回成功请求的数据。',
//   403: '服务器返回失败请求的数据。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '没有登录。',
//   503: '登录状态过期。'
// };
// const errorHandler = error => {
//   const { response } = error;
//   console.log('errorHandler---', response);
//   if (response && response.status) {
//     const errorText = codeMessage[response.status] || response.statusText;
//     const { status, url } = response;
//     notification.error({
//       message: `请求错误 ${status}: ${url}`,
//       description: errorText,
//     });
//   }
//   return response;
// };

const extendRequest = extend({
  // errorHandler,
  prefix: 'http://localhost:7001',
  // prefix: 'http://192.168.2.111:7001',
  timeout: 1000
});
// request 拦截器, 改变url 或 options.
extendRequest.interceptors.request.use((url, options) => {
  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  let token = localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : null;

  // console.log('request---url', url);
  // console.log('request---options', options);

  if (token) {
    headers.Authorization = token
  }
  return (
    {
      url: url,
      options: { ...options, headers },
    }
  )
});
// response 拦截器, 处理response
extendRequest.interceptors.response.use((response, options) => {

  // console.log('response---', response);
  // console.log('response---options', options);

  let token = response.headers.get("Authorization");
  if (token) {
    localStorage.setItem("token", token);
  }
  return response;
});
// 返回数据处理
const responseFilter = (response) => {
  switch (response.code) {
    case 502:
    case 503:
      if (window.location.href.indexOf('login') === -1) {
        localStorage.removeItem('token');
        let url = Base64.encode(window.location.hash.substring(1));
        router.replace('/login?ref=' + url);
      }
      break;
    case 500:
      message.error(response.msg);
      return response;
    default:
      return response;
      // return new Promise((resolve, reject) => {
      //   resolve(response)
      // })
  }
};
// 请求方法
const http = {
  post: (url, data = {}) => {
    return extendRequest.post(url,{ data: qs.stringify(data) }).then(function (response) {
      // console.log(response);
      return responseFilter(response);
    }).catch(function (error) {
      console.log(error);
      // return errorHandler(error);
      return error;
    })
  },
  get: (url, data = {}) => {
    return extendRequest.get(url,{ data: qs.stringify(data) }).then(function (response) {
      // console.log(response);
      return responseFilter(response);
    }).catch(function (error) {
      console.log(error);
      // return errorHandler(error);
    })
  }
};
export default http
