import loginService from './../services/index';
import { message } from 'antd';

export default {
  namespace: 'loginModel',
  state: {
    data: {
      userInfo: {
        name: null,
        avatar: null
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history, query }) {
    },
  },
  effects: {
    *actionLogin({ payload, callback  }, { call, put }) {
      const response = yield call(loginService.login, payload); // 等待网络请求完成
      // console.log('actionLogin-response', response);
      yield put({ type: 'loginData', ...response }); // 提交到reducers里面的loginData
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    }
  },
  reducers: {
    loginData(state, action) {
      return {
        ...action.data
      }
    }
  },

};
