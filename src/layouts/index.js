// import styles from './index.css';
import React, {Component} from 'react'

import {Link} from 'umi';

import HeaderNav from './components/HeaderNav'
import LeftNav from './components/LeftNav'
import FooterNav from './components/FooterNav'

import Login from '../pages/login/pages/index'

import { connect } from 'dva';
import { Layout, Breadcrumb  } from 'antd';
const { Content } = Layout;

class BasicLayout extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }
  handleClick = (collapsed) => {
    // console.log(collapsed);
    this.setState({
      collapsed: !collapsed,
    });
  };
  // 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
    if (document.body.clientWidth <= 400) {
      this.setState({
        collapsed: true
      })
    }
  }
  // 组件卸载
  componentWillUnmount() {
  }

  render() {
    // 面包屑数据赋值
    let routes = [];
    this.props.route.routes.forEach((item) => {
      if (item.path === this.props.location.pathname) {
        // console.log(item);
        routes = item.breadcrumbArr;
        // return true
      }
    });

    if (this.props.location.pathname === '/login') {
      return (<Login></Login>)
    }
    return (
      <Layout>
        {/*左边导航栏*/}
        <LeftNav collapsed={this.state.collapsed} data={this.props}></LeftNav>
        <Layout>
          {/*头部*/}
          <HeaderNav collapsed={this.state.collapsed} onClickTest={this.handleClick}></HeaderNav>
          {/*面包屑*/}
          <Breadcrumb  style={{ margin: '24px 0 0 18px' }}>
            {
              routes.map((item, key) => {
                // console.log('item', item);
                return item.path ? (<Breadcrumb.Item key={key} href={item.path}>{item.breadcrumbName}</Breadcrumb.Item>) : (<Breadcrumb.Item key={key}>{item.breadcrumbName}</Breadcrumb.Item>);
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
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            { this.props.children }
          </Content>
          {/*底部*/}
          <FooterNav></FooterNav>
        </Layout>
      </Layout>
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

export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout)
