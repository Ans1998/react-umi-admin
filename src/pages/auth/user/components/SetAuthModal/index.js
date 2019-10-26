import React, {Component} from 'react'

// import styles from './index.css';
import { connect } from 'dva';
import { Modal, Form, Button, Select } from 'antd';
const { Option } = Select;
class SetAuthModal extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const {visible, confirmLoading, handleCancel} = this.props;
    return (
      <div key={0}>
        <Form onSubmit={this.handleSubmit}>
          <Modal
            title="设置配置"
            visible={visible}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                取消
              </Button>,
              <Button htmlType="submit" type="primary" loading={confirmLoading} onClick={this.handleSubmit}>
                确定
              </Button>,
            ]}
          >
            <Form.Item label="角色选择">
              {
                getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请选择角色!'
                    }
                  ],
                })(
                  <Select
                    style={{ width: 200 }}
                    placeholder="请选择角色"
                  >
                    <Option value="jack">管理员</Option>
                    <Option value="lucy">财务部门</Option>
                    <Option value="tom">技术部门</Option>
                  </Select>
                )
              }
            </Form.Item>
          </Modal>
        </Form>
      </div>
    );
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('handleSubmit form: ', values);
        this.props.handleOk(values)
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
export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'setAuthModal' })(SetAuthModal))
