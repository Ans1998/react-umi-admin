import React, {Component} from 'react'
import { connect } from 'dva';
import { Popover, Avatar, message } from 'antd';
import styles from './index.css';
import { sleep } from '@utils/sleep';
import { Base64 } from 'js-base64';
import router from 'umi/router';
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
    // console.log('测试--------------', this.props)
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
    const { userInfo } = this.props;
    return (
      <Popover content={this.userInfoPopoverRender()}
               visible={this.state.userInfoVisible}
               onVisibleChange={this.handleUserInfoVisibleChange}
               style={{ padding: 0, margin: 0}}
      >
        <div className={styles.H_R_L_right}>
          <span className={styles.H_R_L_R_hint}>Hi,</span>
          <span className={styles.H_R_L_R_userName}>{userInfo.name}</span>
          <Avatar src="@/assets/img/4.png" size={40} icon="user" />
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
    message.loading('正在退出登录', 0);
    this.props.logOutRequest(this.props.headerProps)
  };
}

const mapStateToProps = (state, props) => {
  return {
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    logOutRequest: (headerProps) => {
      const action = {
        type: 'layoutModel/logOutAction',
        callback: async (res) => {
          await sleep(1800);
          console.log(res);
          console.log(headerProps);
          if (res.status === 'success') {
            message.destroy();
            message.success(res.msg);
            localStorage.removeItem('token');
            let url = Base64.encode(headerProps.location.pathname + headerProps.location.search);
            router.push('/login?ref=' + url);
          } else {
            message.destroy();
            message.warning(res.msg);
            localStorage.removeItem('token');
            let url = Base64.encode(headerProps.location.pathname + headerProps.location.search);
            router.push('/login?ref=' + url);
            // localStorage.removeItem('token');
            // let url = Base64.encode(headerProps.location.pathname + headerProps.location.search);
            // router.push('/login?ref=' + url);
          }
        }
      };
      dispatch(action);
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderUserInfo)
