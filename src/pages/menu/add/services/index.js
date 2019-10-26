import request from '@utils/request'

export default {
  addMenu: (data) => {
    return request.post('/api/menu/add', data)
  },
  addChildMenu: (data) => {
    return request.post('/api/menu/child/add', data)
  },
  queryMenu: () => {
    return request.post('/api/menu/query')
  },
}
