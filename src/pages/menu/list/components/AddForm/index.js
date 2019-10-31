import React, {Component} from 'react'

// import styles from './index.css';
import { connect } from 'dva';
import { Button, Form, Input, Modal, Radio, Cascader  } from 'antd';

class AddForm extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  // filterMenu(data) {
  //   data.map((item) => {
  //     item.label = item.name;
  //     item.value = item.id;
  //     if ('children' in item) {
  //       this.filterMenu(item.children)
  //     }
  //   })
  // };
  // 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
  }
  // 组件卸载
  componentWillUnmount(){
  }
  render() {
    const {visible, loading, handleCancel, menuList} = this.props;
    // menuList.map((item) => {
    //   console.log(item);
    //   item.label = item.name;
    //   item.value = item.id;
    //   if ('children' in item) {
    //     this.filterMenu(item.children)
    //   }
    // });
    const { getFieldDecorator } = this.props.form;
    const formItemPublicLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
    };
    return (
      <div>
        <Form {...formItemPublicLayout} onSubmit={this.handleSubmit.bind(this)} style={{margin: '0 auto'}}>
          <Modal
            visible={visible}
            title="添加菜单"
            onCancel={handleCancel.bind(this)}
            footer={[
              <Button key="back" onClick={handleCancel.bind(this)}>取消</Button>,
              <Button onClick={this.handleSubmit.bind(this)} type="primary" htmlType="submit" loading={loading}>确定</Button>,
            ]}
          >
            <Form.Item label="关联菜单" style={{paddingTop: 24}}>
              {
                getFieldDecorator('p_id', {
                })(
                  <Cascader placeholder="请选择关联菜单"
                            fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                            options={menuList} changeOnSelect />
                )
              }
            </Form.Item>
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
            <Form.Item label="菜单图标">
              {
                getFieldDecorator('icon', {
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请输入菜单图标!'
                    }
                  ],
                })(
                  <Input placeholder="请输入菜单图标" />
                )
              }
            </Form.Item>
            <Form.Item label="菜单状态">
              {
                getFieldDecorator('status', {
                  rules: [
                    {
                      type: 'number',
                      required: true,
                      whitespace: true,
                      message: '请选择菜单状态!'
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
        if (!values.p_id) {
          values.p_id = 0
        } else {
          values.p_id = values.p_id[values.p_id.length-1]
        }
        this.props.handleSubmit(values, this.props.form);
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'listMenuAddForm' })(AddForm))
