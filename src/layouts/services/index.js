import request from '@utils/request'

export default {
  getUserMenu: () => {
    return request.post('/api/user/menu/info')
  },
  logOut: () => {
    return request.post('/api/logOut')
  }
}
