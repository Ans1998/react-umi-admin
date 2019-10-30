import React, {Component} from 'react'

// import styles from './index.css';
import { connect } from 'dva';
import { Modal, Form, Button, Input, Radio } from 'antd';

class FormModal extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const {visible, item, confirmLoading, handleOk, handleCancel} = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div key={item.key}>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Modal
            title={'添加用户'}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel.bind(this)}>取消</Button>,
              <Button onClick={this.handleSubmit.bind(this)} type="primary" htmlType="submit" loading={confirmLoading}>确定</Button>,
            ]}
          >
            <Form.Item label="用户名称">
              {
                getFieldDecorator('name', {
                  initialValue: item.u_name,
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请输入用户名称!'
                    }
                  ],
                })(
                  <Input placeholder="请输入用户名称" />
                )
              }
            </Form.Item>
            <Form.Item label="用户密码">
              {
                getFieldDecorator('password', {
                  initialValue: item.u_password,
                  rules: [
                    {
                      required: true,
                      message: '请输入6位数密码!',
                      min: 6,
                    }
                  ],
                })(
                  <Input placeholder="请输入用户密码" />
                )
              }
            </Form.Item>

            <Form.Item label="用户状态">
              {
                getFieldDecorator('status', {
                  initialValue: item.u_status,
                  rules: [
                    {
                      type: 'number',
                      required: true,
                      whitespace: true,
                      message: '请选择用户状态!'
                    }
                  ],
                })(
                  <Radio.Group>
                    <Radio value={1}>开启</Radio>
                    <Radio value={0}>关闭</Radio>
                  </Radio.Group>
                )
              }
            </Form.Item>

          </Modal>
        </Form>
      </div>
    );
  }
  // 表单提交
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values,);
        if ('u_id' in this.props.item) {
          values.id = this.props.item.u_id
        }
        this.props.handleOk(values, this.props.form);
      }
    });
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
export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'authUserFormModal' })(FormModal))
