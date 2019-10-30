import request from '@utils/request'

export default {
  queryRole: () => {
    return request.post('/api/role/query')
  },
  queryAuthRole: (data) => {
    return request.post('/api/role/config/auth/query', data)
  },
  addRole: (data) => {
    return request.post('/api/role/add', data)
  },
  deleteRole: (data) => {
    return request.post('/api/role/delete', data)
  },
  editorRole: (data) => {
    return request.post('/api/role/editor', data)
  },
  configAuthRole: (data) => {
    return request.post('/api/role/config/auth', data)
  }
}
