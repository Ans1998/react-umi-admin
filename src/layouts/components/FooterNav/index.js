// import styles from './index.css';
import { Layout } from 'antd';
import React, {Component} from 'react'
import { connect } from 'dva';
const { Footer } = Layout;

class FooterNav extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        An UI 模版 ©2019 Created
      </Footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(FooterNav)

