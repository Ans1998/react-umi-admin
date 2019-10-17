import React, {Component} from 'react'
import { connect } from 'dva';
import { Popover, Avatar } from 'antd';
import styles from './index.css';

class HeaderUserInfo extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      userInfoVisible: false
    };
  }
// 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
  }
  // 组件卸载
  componentWillUnmount() {
  }
  userInfoPopoverRender = () => {
    return (
      <div className={styles.userInfoContent}>
        <div className={styles.U_C_list} onClick={this.handleLogOut}>
          <span>退出登录</span>
        </div>
      </div>
    )
  };
  render() {
    const { userData } = this.props;
    return (
      <Popover content={this.userInfoPopoverRender()}
               visible={this.state.userInfoVisible}
               onVisibleChange={this.handleUserInfoVisibleChange}
               style={{ padding: 0, margin: 0}}
      >
        <div className={styles.H_R_L_right}>
          <span className={styles.H_R_L_R_hint}>Hi,</span>
          <span className={styles.H_R_L_R_userName}>{userData.userInfo.name}</span>
          <Avatar src={userData.userInfo.avatar} size={40} icon="user" />
        </div>
      </Popover>
    );
  }
  handleUserInfoVisibleChange= (e) => {
    this.setState({
      userInfoVisible: e
    });
    console.log('handleUserInfoVisibleChange', e)
  };
  handleLogOut = () => {
    this.setState({
      userInfoVisible: false
    });
    console.log('退出登录')
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderUserInfo)
