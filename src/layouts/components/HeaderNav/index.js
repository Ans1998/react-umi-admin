import styles from './index.css';
import { Layout, Icon, message } from 'antd';
import React, {Component} from 'react'
import { connect } from 'dva';

import HeaderBadge from './components/Badge/';
import HeaderLanguage from './components/Language/';
import HeaderUserInfo from './components/UserInfo/';


const { Header } = Layout;

class HeaderNav extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  // 组件渲染之前
  componentWillMount() {
  }
  // 组件渲染完之后
  componentDidMount() {
    // console.log('headerNav----------', this.props)
  }
  render() {
    const { userInfo, collapsed, onClickCollapsed, layoutProps } = this.props;
    return (
      <Header style={{ background: '#fff', height: '75px', padding: 0, boxShadow: '4px 4px 40px 0 rgba(0,0,0,.05)' }}>
        <div className={styles.HeaderContent}>
          <div className={styles.HeaderLeft} onClick={onClickCollapsed.bind(this, collapsed)}>
            <Icon
              className={styles.HeaderMenuIcon}
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
            />
          </div>
          <div className={styles.HeaderRight}>
            <div className={styles.H_R_list}>
              <HeaderBadge></HeaderBadge>
              <HeaderLanguage></HeaderLanguage>
              <HeaderUserInfo userInfo={userInfo} headerProps={layoutProps}></HeaderUserInfo>
            </div>
          </div>
        </div>
      </Header>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav)

