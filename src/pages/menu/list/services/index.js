import request from '@utils/request'

export default {
  addMenu: (data) => {
    return request.post('/api/menu/add', data)
  },
  editorMenu: (data) => {
    return request.post('/api/menu/editor', data)
  },
  deleteMenu: (data) => {
    return request.post('/api/menu/delete', data)
  },
}
