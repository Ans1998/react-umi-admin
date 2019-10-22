import React, {Component} from 'react'
import router from 'umi/router';
import styles from './index.css'
import { connect } from 'dva';
import { sleep } from '@utils/sleep'
import { Layout, Row, Col, message } from 'antd';

import FooterNav from './components/FooterNav'
import FormContent from './components/FormContent'

import { Base64 } from 'js-base64';

const { Footer, Content } = Layout;

class Login extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  // 组件加载完
  componentDidMount() {
    console.log(this.props)
  }
  // 在组件接收到了新的 props 或者 state 即将进行重新渲染前
  componentWillUpdate() {
  }
  // 在组件接收到了新的 props 或者 state 即将进行重新渲染后
  componentDidUpdate(prevProps, prevState, snapshot) {
  }
  render() {
    return (
      <Layout>
        <Content className={styles.loginContent}>
          <Row style={{textAlign: 'center', marginBottom: 24}}>
            <Col>
              <img style={{marginRight: '8px'}} className={'publicLogoImg'}
                   src={require("./../../../assets/img/4.png")} alt=""/>
              <h1 className={'publicLogoTitle'}>管理后台</h1>
            </Col>
          </Row>
          <FormContent onSubmit={this.handleSubmit}></FormContent>
          <Row>
            <Col lg={12} md={6} style={{textAlign: 'left'}}>
              <a>忘记密码</a>
            </Col>
            <Col lg={12} md={18} style={{textAlign: 'right'}}>
              <a>马上注册</a>
            </Col>
          </Row>
        </Content>
        <Footer className={styles.loginFooter}>
          <FooterNav></FooterNav>
        </Footer>
      </Layout>
    );
  }
  // 提交表单
  handleSubmit = (propsForm, e) => {
    e.preventDefault();
    propsForm.validateFields((err, values) => {
      if (!err) {
        message.loading('正在登录', 0);
        this.props.login(values);
      }
    });
  };
}

const mapStateToProps = (state, props) => {
  return {
    userData: state.loginModel.data
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    login: (form) => {
      const action = {
        type: 'loginModel/actionLogin',
        payload: form,
        callback: async (res) => {
          console.log('callback', res);// 请求完成后返回的结果
          if (res.status === 'success') {
            localStorage.setItem('token', res.data.token);
            await sleep(1000);
            message.destroy();
            message.success(res.msg);
            let url = Base64.decode(props.location.query.ref);
            // console.log(url)
            router.replace(url);
          } else {
            await sleep(1000);
            message.destroy();
            message.error(res.msg);
          }
        }
      };
      dispatch(action);
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
