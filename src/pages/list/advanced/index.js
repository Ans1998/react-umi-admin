import styles from './index.css'
import React, {Component} from 'react'

import { connect } from 'dva';
import {Table} from 'antd';

class AdvancedList extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {

    };
  }
// 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
  }
  // 组件卸载
  componentWillUnmount() {
  }
  render() {
    return (
      <div style={{ background: '#fff'}}>
        高级列表页
      </div>
    );
  };
}

const mapStateToProps = (state, props) => {
  return {
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedList)
