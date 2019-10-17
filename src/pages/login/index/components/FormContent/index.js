import React, {Component} from 'react'
// import styles from './index.css';
import { connect } from 'dva';
import { Button, Col, Icon, Input, Row, Form } from 'antd';

class FormContent extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row>
        <Col>
          <Form onSubmit={this.props.onSubmit.bind(this, this.props.form)}>
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入用户名"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true,
                    message: '请输入6位数密码!',
                    min: 6,
                  }
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="请输入密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
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
export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'formContent' })(FormContent))
