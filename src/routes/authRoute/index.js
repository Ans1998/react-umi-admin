import React, {Component} from 'react'

import { connect } from 'dva';

class AuthRoute extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <div>PrivateRoute (routes/PrivateRoute.js)</div>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute)
