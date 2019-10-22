import React, {Component} from 'react'

// import styles from './index.css';
import { connect } from 'dva';
import { Button, Form, Input, Modal } from 'antd';

class EditForm extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  renderForm = (menuItem) => {
    const { getFieldDecorator } = this.props.form;
    return [
      <Form.Item label="菜单名称" key={menuItem.key} style={{paddingTop: 24}}>
        {
          getFieldDecorator('menuName', {
            initialValue: menuItem.menuName,
            rules: [
              {
                required: true,
                whitespace: true,
                message: '请输入菜单名称!'
              }
            ],
          })(
            <Input placeholder="请输入菜单名称" />
          )
        }
      </Form.Item>,
    ]
  };
  render() {
    const {visible, menuItem, handleCancel} = this.props;
    const formItemPublicLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
    };
    return (
      <Form {...formItemPublicLayout} onSubmit={this.handleSubmit.bind(this)} style={{margin: '0 auto'}}>
        <Modal
          visible={visible}
          title="修改菜单"
          onCancel={handleCancel.bind(this)}
          footer={[
            <Button key="back" onClick={handleCancel.bind(this)}>取消</Button>,
            <Button onClick={this.handleSubmit.bind(this)} type="primary" htmlType="submit" loading={this.state.loading}>确定</Button>,
          ]}
        >
          {
            this.renderForm(menuItem)
          }
        </Modal>
      </Form>
    );
  }
  // 表单提交
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        setTimeout(() => {
          console.log('Received values of form: ', values);
          this.setState({ loading: false });
          this.props.handleSubmit(values)
        }, 3000);

      }
    });
  }
}

const mapStateToProps = (state, props) => {
  return {
    indexData: state.index
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onClickSave: (form) => {
      const action = {
        type: 'formAdvanced/save',
        payload: form,
      };
      dispatch(action);
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'editForm' })(EditForm))
