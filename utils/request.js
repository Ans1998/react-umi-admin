import { extend } from 'umi-request';

const extendRequest = extend({
  prefix: 'http://localhost:7001',
  timeout: 1000,
  headers: {
    'Authorization': localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : '',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

export default extendRequest

// 请求模版
// extendRequest('/api/v1/user', {
//   method: 'post',
//   data: {
//     name: 'Mike'
//   }
// })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
