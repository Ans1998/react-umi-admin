// import styles from './index.css'
import React, {Component} from 'react'
// import router from 'umi/router';
import { connect } from 'dva';
import MenuForm from './components/MenuForm';
import MenuChildForm from './components/MenuChildForm';
import { Form, Card, message } from 'antd';

class MenuAdd extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  // 组件渲染之前
  componentWillMount() {
  }
  // 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
    this.props.postQueryMenuAction()
  }
  // 组件卸载
  componentWillUnmount() {
  }
  render() {
    const { menuList } = this.props;
    return (
      <div style={{ background: '#fff'}}>

        <Card title="添加菜单" bordered={false}>
          <MenuForm postQueryMenuAction={this.props.postQueryMenuAction}></MenuForm>
        </Card>

        <div style={{height: 24, backgroundColor: '#EEF0F3'}}></div>

        <Card title="添加子菜单" bordered={false}>
          <MenuChildForm menuList={menuList}></MenuChildForm>
        </Card>

      </div>
    );
  };
}

const mapStateToProps = (state, props) => {
  return {
    menuList: state.globalModel.data.menuList
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    postQueryMenuAction: () => {
      const action = {
        type: 'globalModel/queryMenuAction',
        callback: (res) => {
          console.log('----callback---', res);
          if (res.status === 'success') {
          } else {
            message.destroy();
            message.success(res.msg)
          }
        }
      };
      dispatch(action);
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'menuAdd' })(MenuAdd))
