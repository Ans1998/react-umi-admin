import captureDataServices from '../services/index'
export default {
  namespace: 'captureDataModels',
  state: {
    // 初始数据
    data: {
      weiBoRecordList: []
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
    *getWeiBoCapture({payload, callback}, { call }) {
      const response = yield call(captureDataServices.weiBoCapture, payload);
      console.log(response);
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },
    *getWeiBoQueryRecord({callback}, { call, put }) {
      const response = yield call(captureDataServices.weiBoQueryRecord);
      response.data.map((item) => {
        item.key = item.id.toString()
      });
      console.log(response);
      yield put({ type: 'queryWeiBoReducer', ...response }); // 提交到reducers里面的
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },
    *getWeiBoDeleteRecord({payload, callback}, { call }) {
      const response = yield call(captureDataServices.weiBoDeleteRecord, payload);
      console.log(response);
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    }
  },
  // 用于修改数据
  reducers: {
    queryWeiBoReducer(state, action) {
      return { data: { ...state.data, weiBoRecordList: [...action.data] } }
    }
  },
};
