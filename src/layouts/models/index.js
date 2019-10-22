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
      const response = yield call(layoutServices.userInfo); // 等待网络请求完成
      console.log(response);
      yield put({ type: 'getUserData', ...response }); // 提交到reducers里面的save
    },
    *logOutAction({callback}, { call }) {
      const response = yield call (layoutServices.logOut);
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    }
  },
  // 用于修改数据
  reducers: {
    getUserData(state, action) {
      console.log(action);
      return {  ...action };
    },
  },
};
