import layoutServices from './../services/index';

export default {
  namespace: 'layoutModel',
  state: {
    // 初始数据
    data: {
    }
  },
  // 用于订阅数据
  subscriptions: {
    setup({ dispatch, history, query }) {
    },
  },
  // 用于获取数据
  effects: {
    *getUserInfo({ payload } , { call, put }) {
      console.log('layoutModel-payload');
      const response = yield call(layoutServices.userInfo); // 等待网络请求完成
      console.log('layoutModel-response', response);
      yield put({ type: 'getUserData', ...response }); // 提交到reducers里面的save
    },
  },
  // 用于修改数据
  reducers: {
    getUserData(state, action) {
      console.log(action);
      return {  ...action };
    },
  },
};
