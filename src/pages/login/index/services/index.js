import request from '@utils/request'

export default {
  login: (data) => {
    return request.post('/api/login', data)
  }
}
