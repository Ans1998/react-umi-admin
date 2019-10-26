import menuAddService from '@/pages/menu/add/services/index';
import loginService from '@/pages/login/index/services';

export default {
  namespace: 'globalModel',
  state: {
    // 初始数据
    data: {
      menuList: []
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
    // *loginAction({ payload, callback  }, { call, put }) {
    //   const response = yield call(loginService.login, payload ); // 等待网络请求完成
    //   yield put({ type: 'loginReducer', ...response }); // 提交到reducers里面的loginData
    //   if (callback && typeof callback === 'function') {
    //     callback(response); // 返回结果
    //   }
    // },
    *queryMenuAction({payload , callback}, { call, put }) {
      const response = yield call(menuAddService.queryMenu);
      // 数据处理(菜单列表)
      if (payload && 'filter' in payload && payload.filter === 'true') {
        response.data.forEach((item) => {
          item.key = item.id.toString();
          let child = JSON.parse(item.child);
          if (child.length > 0) {
            item.children = child;
            item.children.forEach((childItem, key) => {
              childItem.key = item.key + '-' + key
            })
          }
        });
      }
      yield put({ type: 'queryMenuReducer', ...response }); // 提交到reducers里面的loginData
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    }
  },
  // 用于修改数据
  reducers: {
    // loginReducer(state, action) {
    //   return {
    //     ...action.data
    //   }
    // }
    queryMenuReducer(state, action) {
      return { data: { menuList: [...action.data] } }
    }
  },
}
