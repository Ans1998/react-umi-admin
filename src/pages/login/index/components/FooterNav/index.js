import React, {Component} from 'react'

// import styles from './index.css';
import { connect } from 'dva';

class FooterNav extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
          An UI 模版 ©2019 Created
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

export default connect(mapStateToProps, mapDispatchToProps)(FooterNav)
