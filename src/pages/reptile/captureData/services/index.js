import request from '@utils/request'

export default {
  weiBoCapture: (data) => {
    return request.post('/api/weibo/capture', data)
  },
  weiBoQueryRecord: (data) => {
    return request.post('/api/weibo/query/record', data)
  },
  weiBoDeleteRecord: (data) => {
    return request.post('/api/weibo/delete/record', data)
  },
}
