import authUserServices from './../services/index'
export default {
  namespace: 'authUserModel',
  state: {
    // 初始数据
    data: {
      userList: []
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
    *queryUserAction({payload, callback}, { call, put }) {
      let result = yield call(authUserServices.queryUser);
      result.data.forEach((item) => {
        item.key = item.u_id.toString()
      });
      yield put({type: 'queryUserReducers', ...result});
      if (callback && typeof callback === 'function') {
        callback(result); // 返回结果
      }
      // console.log(result)
    },
    *addUserAction({payload, callback}, { call }) {
      let result = yield call(authUserServices.addUser, payload);
      if (callback && typeof callback === 'function') {
        callback(result); // 返回结果
      }
      // console.log(result)
    },
    *deleteUserAction({payload, callback}, { call }) {
      let result = yield call(authUserServices.deleteUser, payload);
      if (callback && typeof callback === 'function') {
        callback(result); // 返回结果
      }
      // console.log(result)
    },
    *editorUserAction({payload, callback}, { call }) {
      let result = yield call(authUserServices.editorUser, payload);
      if (callback && typeof callback === 'function') {
        callback(result); // 返回结果
      }
      // console.log(result)
    },
    *addSetAuthUserAction({payload, callback}, { call }) {
      let result = yield call(authUserServices.addSetAuthUser, payload);
      if (callback && typeof callback === 'function') {
        callback(result); // 返回结果
      }
      // console.log(result)
    },
    *editorSetAuthUserAction({payload, callback}, { call }) {
      let result = yield call(authUserServices.editorSetAuthUser, payload);
      if (callback && typeof callback === 'function') {
        callback(result); // 返回结果
      }
      // console.log(result)
    },
  },
  // 用于修改数据
  reducers: {
    queryUserReducers(state, action) {
      return { data: { ...state.data, userList: [...action.data] } }
    }
  },
};
