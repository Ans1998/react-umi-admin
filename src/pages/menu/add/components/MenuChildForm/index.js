import React, {Component} from 'react'

// import styles from './index.css';
import { connect } from 'dva';
import { sleep } from '@utils/sleep';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import router from 'umi/router';
const { Option } = Select;
class MenuChildForm extends  Component{
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
    // console.log(JSON.parse(arr))
  }
  render() {
    const { menuList } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleChildSubmit}>
        <Form.Item label="请选择关联菜单">
          {
            getFieldDecorator('menuRelevanceName', {
              rules: [
                {
                  type: 'string',
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
                {
                  menuList.map((item) => {
                    return (<Option value={JSON.stringify(item)} key={item.id}>{item.name}</Option>)
                  })
                }
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
        // console.log('handleChildSubmit', values);
        let menu = JSON.parse(values.menuRelevanceName);
        // console.log(menu);
        let menuChild = JSON.parse(menu.child);
        menuChild.push({name: values.name, url: values.url});
        // console.log(menuChild);
        let form = {
          id: menu.id,
          child: JSON.stringify(menuChild),
        };
        message.loading('正在操作', 0);
        this.props.addChildMenuRequest(form)
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
    addChildMenuRequest: (form, that) => {
      const action = {
        type: 'menuAddModel/addChildMenuAction',
        payload: form,
        callback: async (res) => {
          await sleep(1000);
          message.destroy();
          console.log('callback', res);
          if (res.status === 'success') {
            message.success(res.msg);
            that.props.form.resetFields();
          } else {
            message.error(res.msg);
          }
        }
      };
      dispatch(action);
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'menuChildForm' })(MenuChildForm))
