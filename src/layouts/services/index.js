import request from '@utils/request'

export default {
  userInfo: () => {
    return request.post('/api/user/info')
  },
  logOut: () => {
    return request.post('/api/logOut')
  }
}
