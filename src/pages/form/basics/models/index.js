// 同步更新 state 的 reducers
// 处理异步逻辑的 effects （比如网络请求）
// 订阅数据源的 subscriptions（监听路由，进入页面就如何，可以在这写）

export default {
  namespace: 'formBasics',
  state: {
    data: {
      name: 'aaa'
    }
  },
  subscriptions: {
    setup({ dispatch, history, query }) {
    },
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      // const { data, headers } = yield call(usersService.fetch, { page }); // 等待网络请求完成
      // const indexData = yield select((state) => state.index) // 查询state里面的数据
      yield put({ type: 'formBasics/save' }); // 提交到reducers里面的save

    },
  },
  reducers: {
    save(state, action) {
      console.log(action);
      return { ...state, ...action.payload };
    },
  },

};
