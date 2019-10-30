import styles from './index.css'
import React, {Component} from 'react'

import { connect } from 'dva';
import { Form, message } from 'antd';

class AdvancedForm extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  // 组件渲染之前
  componentWillMount() {
    // this.props.getUserInfo()
  }
  // 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
  }
  // 组件卸载
  componentWillUnmount() {
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ background: '#fff'}}>
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
    // test: (form, that) => {
    //   const action = {
    //     type: 'authRoleModel/configAuthRoleAction',
    //     payload: form,
    //     callback: (res) => {
    //       console.log(res);
    //       message.destroy();
    //       if (res.status === 'success') {
    //         that.setState({
    //         });
    //         message.success(res.msg)
    //       } else {
    //         message.error(res.msg)
    //       }
    //     }
    //   };
    //   dispatch(action)
    // }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'advancedForm' })(AdvancedForm))
