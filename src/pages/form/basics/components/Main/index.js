import React, {Component} from 'react'

import styles from './index.css';
import { connect } from 'dva';

class Main extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className={styles.test}>
        测试test~~~
        <div onClick={this.test}>点击测试</div>
        <div onClick={this.testA}>点击查询</div>
      </div>
    );
  }

  test = () => {
    console.log(this.props);

    // mapDispatchToProps 把dispatch 赋值一个变量为 dispatch
    // this.props.dispatch({
    //   type: 'index/save',
    //   payload: {age: '14'},
    // });
    this.props.onClickSave({age: '14'});
  };
  testA = () => {
    console.log(this.props);
  }
}

const mapStateToProps = (state, props) => {
  return {
    indexData: state.index
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onClickSave: (form) => {
      const action = {
        type: 'formBasics/save',
        payload: form,
      };
      dispatch(action);
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main)
