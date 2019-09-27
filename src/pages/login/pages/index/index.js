import React, {Component} from 'react'

import Main from './components/Main'

import { connect } from 'dva';

class Index extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Main></Main>
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
