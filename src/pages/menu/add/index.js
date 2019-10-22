// import styles from './index.css'
import React, {Component} from 'react'
// import router from 'umi/router';
import { connect } from 'dva';
import MenuForm from './components/MenuForm';
import MenuChildForm from './components/MenuChildForm';
import { Form, Card, } from 'antd';

class MenuAdd extends  Component{
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

        <Card title="添加菜单" bordered={false}>
          <MenuForm></MenuForm>
        </Card>

        <div style={{height: 24, backgroundColor: '#EEF0F3'}}></div>

        <Card title="添加子菜单" bordered={false}>
          <MenuChildForm></MenuChildForm>
        </Card>

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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'menuAdd' })(MenuAdd))
