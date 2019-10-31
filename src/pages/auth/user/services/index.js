import request from '@utils/request'

export default {
  queryUserInfo: () => {
    return request.post('/api/user/info')
  },
  queryUser: () => {
    return request.post('/api/user/query')
  },
  addUser: (data) => {
    return request.post('/api/user/add', data)
  },
  deleteUser: (data) => {
    return request.post('/api/user/delete', data)
  },
  editorUser: (data) => {
    return request.post('/api/user/editor', data)
  },
  addSetAuthUser: (data) => {
    return request.post('/api/user/set/auth/add', data)
  },
  editorSetAuthUser: (data) => {
    return request.post('/api/user/set/auth/editor', data)
  },
}
