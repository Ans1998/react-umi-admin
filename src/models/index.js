import menuAddService from '@/pages/menu/add/services/index';
import authRoleServices from '@/pages/auth/role/services';
import authUserServices from '@/pages/auth/user/services';
import layoutServices from '@/layouts/services';

let arr = [];
const filterMenuData = (data) => {
  data.forEach((item, key) => {
    if (item.p_id === 0) {
      item.key = item.id.toString();
      arr.push(item);  // 获取父菜单
      filterMenuTwoData(data, item, arr.length-1)
    } else {
      for (let i=1; i < data.length; i++) {
        // 获取三级以上菜单
        if (item.id === data[i].p_id) {
          data[i].key = data[i].id.toString();
          if (item.children && 'children' in item) {
            item.children.push(data[i])
          } else {
            item.children = [];
            item.children.push(data[i])
          }
        }
      }
    }
  });
  return arr;
};
const filterMenuTwoData = (data, item, key) => {
  data.forEach((test2Item) => {
    if (test2Item.p_id === item.id) {
      test2Item.key = test2Item.id.toString();
      // 获取二级菜单
      if (arr[key].children && 'children' in arr[key]) {
        arr[key].children.push(test2Item)
      } else {
        arr[key].children = [];
        arr[key].children.push(test2Item)
      }
    }
  })
};

export default {
  namespace: 'globalModel',
  state: {
    // 初始数据
    data: {
      authMenuList: [],
      menuList: [],
      roleList: [],
      userInfo: {}
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
    *queryMenuAction({payload , callback}, { call, put }) {
      arr = []; // 置空全局数组
      let response = yield call(menuAddService.queryMenu);
      // 数据处理(菜单列表)
      if (payload && 'filter' in payload && payload.filter === 'true') {
        response.data = filterMenuData(response.data);
        yield put({ type: 'queryMenuReducer', ...response }); // 提交到reducers里面的
      }
      // console.log(response);
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },
    *queryRoleAction({callback}, { call, put }) {
      const result = yield call(authRoleServices.queryRole);
      result.data.map((item) => {
        item.key = item.id.toString()
      });
      yield put({ type: 'queryRoleReducer', ...result }); // 提交到reducers里面的
      if (callback && typeof callback === 'function') {
        callback(result); // 返回结果
      }
      // console.log(result)
    },
    *queryUserInfoAction({callback}, { call, put }) {
      const result = yield call(authUserServices.queryUserInfo);
      yield put({ type: 'queryUserInfoReducer', ...result }); // 提交到reducers里面的
      if (callback && typeof callback === 'function') {
        callback(result); // 返回结果
      }
      // console.log(result)
    },
    *queryUserMenuInfoAction({callback}, { call, put }) {
      const response = yield call (layoutServices.getUserMenu);
      yield put({ type: 'queryAuthMenuReducer', ...response }); // 提交到reducers里面的
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
      // console.log(result)
    },
  },
  // 用于修改数据
  reducers: {
    queryAuthMenuReducer(state, action) {
      return { data: { ...state.data, authMenuList: [...action.data] } }
    },
    queryMenuReducer(state, action) {
      return { data: { ...state.data, menuList: [...action.data] } }
    },
    queryRoleReducer(state, action) {
      return { data: { ...state.data, roleList: [...action.data] } }
    },
    queryUserInfoReducer(state, action) {
      return { data: { ...state.data, userInfo: {...action.data} } }
    }
  },
}
