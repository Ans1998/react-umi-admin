import authRoleServices from './../services/index'
export default {
  namespace: 'authRoleModel',
  state: {
    // 初始数据
    data: {
      roleList: [],
      roleItem: {}
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
    *queryAuthRoleAction({payload, callback}, { call, put }) {
      const result = yield call(authRoleServices.queryAuthRole, payload);
      // yield put({ type: 'queryAuthRoleReducer', ...result }); // 提交到reducers里面的loginData
      if (callback && typeof callback === 'function') {
        callback(result); // 返回结果
      }
      // console.log(result)
    },
    *addRoleAction({payload, callback}, { call }) {
      const result = yield call(authRoleServices.addRole, payload);
      if (callback && typeof callback === 'function') {
        callback(result); // 返回结果
      }
      console.log(result)
    },
    *deleteRoleAction({payload, callback}, { call}) {
      const result = yield call(authRoleServices.deleteRole, payload);
      if (callback && typeof callback === 'function') {
        callback(result); // 返回结果
      }
      console.log(result)
    },
    *editorRoleAction({payload, callback}, { call }) {
      const result = yield call(authRoleServices.editorRole, payload);
      if (callback && typeof callback === 'function') {
        callback(result); // 返回结果
      }
      console.log(result)
    },
    *configAuthRoleAction({payload, callback}, { call }) {
      const result = yield call(authRoleServices.configAuthRole, payload);
      if (callback && typeof callback === 'function') {
        callback(result); // 返回结果
      }
      console.log(result)
    },
  },
  // 用于修改数据
  reducers: {
    // queryAuthRoleReducer(state, action) {
    //   return { data: { ...state.data, roleItem: [...action.data] } }
    // }
  },
};
