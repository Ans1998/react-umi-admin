import React, {Component} from 'react'

import {Base64} from 'js-base64'
import router from 'umi/router';
import { connect } from 'dva';

class AuthRoute extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {location, userData} = this.props;
    let url = Base64.encode(location.pathname + location.search);
    // console.log('this.props.route', route);
    // console.log(location.pathname + location.search);
    // console.log(url);
    let token = null;
    if (typeof userData === 'object' && 'token' in userData) {
      // console.log('userData', userData);
      token = userData.token
    } else {
      token = localStorage.getItem('token') || null;
    }
    // console.log('token', token);
    if (!token) {
      router.push('/login?ref=' + url);
      return false
    }
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    userData: () => {
      if ('loginModel' in state) {
        return
      } else {
        return {}
      }
    }
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute)
