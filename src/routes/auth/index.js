import React, {Component} from 'react'

import { connect } from 'dva';
class AuthRoute extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  // 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <div>
       {
         this.props.children
       }
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
