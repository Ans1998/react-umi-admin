import React, {Component} from 'react'

import { connect } from 'dva';
import { Result } from 'antd';
class AuthRoute extends  Component{
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
    this.props.getUserMenu()
  }
  authMenu = (data) => {
    let show = false;
    for (let i=0; i<data.length; i++) {
      if (data[i].url === this.props.location.pathname) {
        // console.log('路由权限存在');
        show = true;
        return true
      } else {
        // console.log('路由权限不存在');
      }
    }
    return show;
  };
  authRender = () => {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        // extra={<Button type="primary">Back Home</Button>}
      />
    )
  };
  render() {
    const {authMenuList} = this.props;
    console.log(this.authMenu(authMenuList));
    return (
      // this.props.children
      <div>
       {
         this.authMenu(authMenuList) ? this.props.children : this.authRender()
       }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    authMenuList: state.globalModel.data.authMenuList
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getUserMenu: () => {
      const action = {
        type: 'globalModel/queryUserMenuInfoAction',
        callback: (res) => {
          console.log('auth----callback---', res);
        }
      };
      dispatch(action);
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute)
