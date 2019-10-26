import request from '@utils/request'

export default {
  editorMenu: (data) => {
    return request.post('/api/menu/editor', data)
  },
  editorChildMenu: (data) => {
    return request.post('/api/menu/child/add', data)
  },
  deleteMenu: (data) => {
    return request.post('/api/menu/delete', data)
  },
}
