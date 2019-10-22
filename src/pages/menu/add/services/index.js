import request from '@utils/request'
import qs from 'qs'

export default {
  addMenu: (data) => {
    return request.post('/api/menu/add',{ data: qs.stringify(data) })
  }
}
