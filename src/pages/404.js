import React, {Component} from 'react'

import { connect } from 'dva';

class Index extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
    };
  }
// 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
    // console.log('my', this.props)
  }
  // 组件卸载
  componentWillUnmount() {
  }
  render() {
    return (
      <div>
        404
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

export default connect(mapStateToProps, mapDispatchToProps)(Index)
