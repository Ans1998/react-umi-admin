import React, {Component} from 'react'

// import styles from './index.css';
import { connect } from 'dva';
import { Button, Form, Input, Select  } from 'antd';
const { Option } = Select;
class MenuChildForm extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleChildSubmit}>
        <Form.Item label="请选择关联菜单">
          {
            getFieldDecorator('menuRelevanceName', {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '请选择关联菜单!'
                }
              ],
            })(
              <Select
                style={{ width: 200 }}
                placeholder="请选择关联菜单模块"
              >
                <Option value="测试管理">测试管理</Option>
                <Option value="表单管理">表单管理</Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="子菜单名称">
          {
            getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '请输入子菜单名称!'
                }
              ],
            })(
              <Input placeholder="请输入子菜单名称" />
            )
          }
        </Form.Item>
        <Form.Item label="子菜单路由">
          {
            getFieldDecorator('url', {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '请输入子菜单路由!'
                }
              ],
            })(
              <Input placeholder="请输入子菜单路由" />
            )
          }
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" >提交</Button>
        </Form.Item>
      </Form>
    );
  }
  handleChildSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('handleChildSubmit', values);
        const current = this.state.current + 1;
        this.setState({ current });
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'menuChildForm' })(MenuChildForm))
