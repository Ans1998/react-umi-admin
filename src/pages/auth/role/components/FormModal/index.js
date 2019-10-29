import React, {Component} from 'react'

// import styles from './index.css';
import { connect } from 'dva';
import { Modal, Form, Button, Input, Radio } from 'antd';
const { TextArea } = Input;
class FormModal extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const {title, visible, item, confirmLoading, handleOk, handleCancel} = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div key={item.key}>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Modal
            title={title}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel.bind(this)}>取消</Button>,
              <Button onClick={this.handleSubmit.bind(this)} type="primary" htmlType="submit" loading={confirmLoading}>确定</Button>,
            ]}
          >
            <Form.Item label="角色名称" style={{paddingTop: 24}}>
              {
                getFieldDecorator('name', {
                  initialValue: item.name,
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请输入角色名称!'
                    }
                  ],
                })(
                  <Input placeholder="请输入角色名称" />
                )
              }
            </Form.Item>
            <Form.Item label="角色描述">
              {
                getFieldDecorator('describe', {
                  initialValue: item.describe,
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请输入角色描述!'
                    }
                  ],
                })(
                  <TextArea rows={4} placeholder="请输入角色描述" />
                )
              }
            </Form.Item>
            <Form.Item label="角色状态">
              {
                getFieldDecorator('status', {
                  initialValue: item.status,
                  rules: [
                    {
                      type: 'number',
                      required: true,
                      whitespace: true,
                      message: '请选择角色状态!'
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
        // console.log('Received values of form: ', values);
        if ('id' in this.props.item) {
          values.id = this.props.item.id;
          this.props.handleOk(values);
        } else {
          this.props.handleOk(values);
        }
        this.props.form.resetFields();
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
export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'authRoleFormModal' })(FormModal))
