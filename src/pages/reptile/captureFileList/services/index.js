import request from '@utils/request'

export default {
  queryCsvFile: () => {
    return request.post('/api/weibo/csv/list')
  },
  queryLookCsvFile: (data) => {
    return request.post('/api/weibo/csv/look', data)
  },
  deleteCsvFile: (data) => {
    return request.post('/api/weibo/csv/delete', data)
  },
  pushStorageCsvFile: (data) => {
    return request.post('/api/weibo/csv/pushStorage', data)
  },
}
