// import styles from './index.css'
import React, {Component} from 'react'
import withRouter from 'umi/withRouter';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import HeaderNav from './components/HeaderNav'
import LeftNav from './components/LeftNav'
import FooterNav from './components/FooterNav'

import Login from '../pages/login/index/index'

import { connect } from 'dva';

import { Layout, Breadcrumb, ConfigProvider, Empty, notification } from 'antd';
// import configLocale from 'antd/es/locale/en_US'; // 英文
import configLocale from 'antd/es/locale/zh_CN'; // 中文

import {socket} from  '@utils/socket';
// 连接成功
socket.on('connect', (res) => {
  console.log('----与服务端连接成功----', res);
});
// 监听
socket.on('res', obj => {
  console.log('监听到服务端的信息 ---packet----', obj);
  if (obj.status === 'success' && obj.code === '200') {
    notification.success({
      message: obj.msg,
      description: obj.data.content,
      duration: 4.5
    });
  } else {
    notification.error({
      message: obj.msg,
      description: obj.data.content,
      duration: 4.5
    });
  }
});
// test = () => {
//   console.log('----socket----');
//   let obj = {
//     code: 200,
//     status: 'success',
//     msg: '测试发送数据',
//     data: {},
//   };
//   socket.emit('res', obj);
// };

const { Content } = Layout;


class BasicLayout extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }
  // 组件渲染之前
  componentWillMount() {
  }
  // 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
    this.props.getUserInfo(this)
    // 监听屏幕宽度
    // if (document.body.clientWidth <= 400) {
    //   this.setState({
    //     collapsed: true
    //   })
    // }
  }
  // 组件卸载
  componentWillUnmount() {
  }
  // 全局空状态
  publicEmpty = () => {
    return (<Empty/>)
  };
  render() {
    const {userInfo, userMenuList} = this.props;
    // 面包屑数据赋值
    let routes = [];
    this.props.route.routes.forEach((item) => {
      if (item.path === this.props.location.pathname) {
        // console.log(item);
        routes = item.breadcrumbArr;
        // return true
      }
    });
    // 单独页
    if (this.props.location.pathname === '/login') {
      return (<Login></Login>)
    }
    return (
      <ConfigProvider locale={configLocale} renderEmpty={this.publicEmpty}>
      <Layout style={{ minHeight: '100vh' }}>
        {/*左边导航栏*/}
        <LeftNav userMenuList={userMenuList} collapsed={this.state.collapsed} data={this.props}></LeftNav>
        <Layout>
          {/*头部*/}
          <HeaderNav userInfo={userInfo} layoutProps={this.props} collapsed={this.state.collapsed} onClickCollapsed={this.handleHeaderNavCollapsedClick}></HeaderNav>
          {/*面包屑*/}
          <Breadcrumb  style={{ margin: '24px 0 0 18px' }}>
            {
              routes.map((item, key) => {
                // console.log('item', item);
                return item.path ? (<Breadcrumb.Item key={key} href={'/#'+item.path}>{item.breadcrumbName}</Breadcrumb.Item>) : (<Breadcrumb.Item key={key}>{item.breadcrumbName}</Breadcrumb.Item>);
                // return item.path ?
                //   (<Breadcrumb.Item key={key}>
                //     <Link to={item.path}>{item.breadcrumbName}</Link>
                //   </Breadcrumb.Item>)
                //   :
                //   (<Breadcrumb.Item key={key}>{item.breadcrumbName}</Breadcrumb.Item>);
              })
            }
          </Breadcrumb>
          {/*内容*/}
          <Content
            style={{
              margin: '24px 16px',
              minHeight: 280
            }}
          >
            <TransitionGroup>
              {/*key={this.props.location.pathname}*/}
              <CSSTransition classNames="fade" timeout={300} appear={true} >
                { this.props.children }
              </CSSTransition>
            </TransitionGroup>
          </Content>
          {/*底部*/}
          <FooterNav></FooterNav>
        </Layout>
      </Layout>
      </ConfigProvider>
    );
  }
  // 头部导航栏缩进
  handleHeaderNavCollapsedClick = (collapsed) => {
    this.setState({
      collapsed: !collapsed,
    });
  };
}

const mapStateToProps = (state, props) => {
  return {
    userMenuList: state.layoutModel.data.userMenuList,
    userInfo: state.globalModel.data.userInfo
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getUserInfo: (that) => {
      const action = {
        type: 'globalModel/queryUserInfoAction',
        callback: (res) => {
          that.props.getUserMenu();
          console.log('----callback---', res);
        }
      };
      dispatch(action);
    },
    getUserMenu: () => {
      const action = {
        type: 'layoutModel/queryUserMenuAction',
        callback: (res) => {
          console.log('----callback---', res);
        }
      };
      dispatch(action);
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BasicLayout))
