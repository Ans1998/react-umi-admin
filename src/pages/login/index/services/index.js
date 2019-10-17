import request from '../../../../../utils/request'
import qs from 'qs'

export default {
  login: (data) => {
    return request.post('/api/login',{ data: qs.stringify(data) })
  }
}
