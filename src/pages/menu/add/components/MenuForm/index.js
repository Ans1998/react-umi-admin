import React, {Component} from 'react'

// import styles from './index.css';
import { connect } from 'dva';
// import router from 'umi/router'; // Modal
import { Button, Form, Input, message } from 'antd';
import { sleep } from '@utils/sleep';
class MenuForm extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  // 组件渲染之前
  componentWillMount() {
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="菜单名称">
          {
            getFieldDecorator('name', {
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
        </Form.Item>
        <Form.Item label="菜单路由">
          {
            getFieldDecorator('url', {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '请输入菜单路由!'
                }
              ],
            })(
              <Input placeholder="请输入菜单路由" />
            )
          }
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" >提交</Button>
        </Form.Item>
      </Form>
    );
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('handleSubmit', values);
        message.loading('正在加载', 0);
        this.props.addMenuRequest(values, this)
      }
    });
  }
}

const mapStateToProps = (state, props) => {
  return {}
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    addMenuRequest: (form, that) => {
      form.child = '[]';
      const action = {
        type: 'menuAddModel/addMenuAction',
        payload: form,
        callback: async (res) => {
          console.log(res);
          await sleep(1000);
          if (res) {
            message.destroy();
            message.success(res.msg);
            that.props.form.resetFields();
            that.props.postQueryMenuAction();
            // Modal.success({
            //   title: res.msg,
            //   content: '是否前往表单列表',
            //   okText: '前往',
            //   cancelText: '暂不前往',
            //   onOk() {
            //     router.replace('/menu/list');
            //     console.log('OK');
            //   },
            //   onCancel() {
            //     that.props.form.resetFields();
            //     that.props.postQueryMenuAction();
            //     console.log('Cancel');
            //   },
            // });
          } else {
            message.destroy();
            message.warning(res.msg);
          }
        }
      };
      dispatch(action);
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'menuForm' })(MenuForm))
