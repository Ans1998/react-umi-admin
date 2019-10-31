import layoutServices from './../services/index';
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
  namespace: 'layoutModel',
  state: {
    // 初始数据
    data: {
      userMenuList: []
    }
  },
  // 用于订阅数据
  subscriptions: {
    setup({ dispatch, history, query }) {
    },
  },
  // 用于获取数据
  effects: {
    *logOutAction({callback}, { call }) {
      const response = yield call (layoutServices.logOut);
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },
    *queryUserMenuAction({callback}, { call, put }) {
      arr = []; // 置空全局数组
      const response = yield call (layoutServices.getUserMenu);
      response.data = filterMenuData(response.data);
      yield put({ type: 'queryUserMenuReducer', ...response }); // 提交到reducers里面的
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },
  },
  // 用于修改数据
  reducers: {
    queryUserMenuReducer(state, action) {
      return { data: { ...state.data, userMenuList: [...action.data] } }
    }
  },
};
