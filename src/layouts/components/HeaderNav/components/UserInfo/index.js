import React, {Component} from 'react'
import { connect } from 'dva';
import { Popover, Icon, Badge, Avatar } from 'antd';
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
  render() {
    return (
      <Popover content={this.userInfoPopoverRender()}
               visible={this.state.userInfoVisible}
               onVisibleChange={this.handleUserInfoVisibleChange}
               style={{ padding: 0, margin: 0}}
      >
        <div className={styles.H_R_L_right}>
          <span className={styles.H_R_L_R_hint}>Hi,</span>
          <span className={styles.H_R_L_R_userName}>root</span>
          <Avatar src="https://image.zuiidea.com/photo-1525879000488-bff3b1c387cf.jpeg?imageView2/1/w/200/h/200/format/webp/q/75|imageslim" size={40} icon="user" />
        </div>
      </Popover>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderUserInfo)
