import io from 'socket.io-client'
// 创建socket连接，http使用ws协议，https使用wss协议
export const socket = io('ws://127.0.0.1:7001/', {
  // 实际使用中可以在这里传递参数
  query: {
    Authorization: localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : null
  },
  transports: ['websocket']
});
