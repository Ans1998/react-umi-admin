import captureFileListServices from '../services/index'
export default {
  namespace: 'captureFileListModel',
  state: {
    // 初始数据
    data: {
      csvFileList: {
        data: []
      }
    }
  },
  // 用于订阅数据
  subscriptions: {
    setup({ dispatch, history, query }) {
    },
  },
  // 用于获取数据
  effects: {
    // select 此方法用于获取当前或其他 model 的 state
    // call 此方法用于执行一个异步函数，可以理解为等待这个函数执行结束。项目中常用于发送 http 请求，等待服务端响应数据
    // put 此方法用于触发一个 action，这个 action 既可以是一个 reducer 也可以是一个 effect 。
    *queryCsvFileAction({payload, callback}, { call, put }) {
      const response = yield call(captureFileListServices.queryCsvFile);
      console.log(response);
      yield put({ type: 'queryCsvFileReducer', ...response }); // 提交到reducers里面的
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },
    *queryLookCsvFileAction({payload, callback}, { call }) {
      const response = yield call(captureFileListServices.queryLookCsvFile, payload);
      console.log(response);
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },
    *deleteCsvFileAction({payload, callback}, { call }) {
      const response = yield call(captureFileListServices.deleteCsvFile, payload);
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
      console.log(response)
    },
    *pushStorageCsvFileAction({payload, callback}, { call }) {
      const response = yield call(captureFileListServices.pushStorageCsvFile, payload);
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
      console.log(response)
    }
  },
  // 用于修改数据
  reducers: {
    queryCsvFileReducer(state, action) {
      // console.log('queryCsvFileReducer---', action);
      return { data: { ...state.data, csvFileList: {...action.data} } }
    }
  },
};
