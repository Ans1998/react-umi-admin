import React, {Component} from 'react'

// import styles from './index.css';
import { connect } from 'dva';
import { Button } from 'antd';

class AddForm extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div style={{marginBottom: 12}}>
        <Button type="primary" icon="plus" >
          新建
        </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddForm)
