import React, {Component} from 'react'

import styles from './index.css';
import { connect } from 'dva';
import { Cascader, Col, DatePicker, Form, Input, Modal, Radio, Row, Steps, Button } from 'antd';

const { Step } = Steps;
const { TextArea } = Input;

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const steps = [
  {
    title: '商品名称'
  },
  {
    title: '商品地址'
  },
  {
    title: '商品状态'
  },
];
class EditForm extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
    console.log(props)
  }
  // 对话框底部按钮渲染
  footerRender = () => {
    return (
      <Row>
        <Col lg={16} md={16} sm={12} xs={12} style={{textAlign: 'left'}}>
          {
            this.state.current > 0 ? (
              <Button key="back" onClick={this.handlePrev.bind(this)}>
                上一步
              </Button>
            ) : null
          }
        </Col>
        <Col lg={4} md={4} sm={6} xs={6}>
          <Button key="back" onClick={this.props.handleCancel}>
            取消
          </Button>
        </Col>
        <Col lg={4} md={4} sm={6} xs={6}>
          {
            this.state.current === steps.length - 1 ? (
              <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                完成
              </Button>
            ) : (
              <Button type="primary" htmlType="submit"  onClick={this.handleNext}>
                下一步
              </Button>
            )
          }
        </Col>
      </Row>
    )
  };
  // 在组件接收到了新的 props 或者 state 即将进行重新渲染后
  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(this.props)
  }
  render() {
    const formItemPublicLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    return (
      <Form onSubmit={this.handleSubmit} {...formItemPublicLayout}>
        <Modal
          title="商品编辑"
          onCancel={this.props.handleCancel}
          visible={this.props.visible}
          footer={this.footerRender()}
        >
          {
            this.productModalRender()
          }
        </Modal>
      </Form>
    );
  }
  productModalRender = () => {
    return (
      <div>
        <Steps current={this.state.current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div style={{padding: 24}}>
          {this.stepsContentRender()}
        </div>
      </div>
    )
  };
  stepsContentRender = () => {
    switch (this.state.current) {
      case 0:
        return this.stepsProductNameRender();
      case 1:
        return this.stepsProductAddressRender();
      case 2:
        return this.stepsProductStateRender();
    }
  };
  stepsProductNameRender = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row>
        <Col>
          <Form.Item label="商品名称">
            {
              getFieldDecorator('productName', {
                initialValue: this.props.item.productName,
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请输入商品名称!'
                  }
                ],
              })(
                <Input placeholder="请输入商品名称" />
              )
            }
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="商品总价">
            {
              getFieldDecorator('productSum', {
                initialValue: this.props.item.productSum,
                rules: [
                  {
                    type: 'number',
                    required: true,
                    whitespace: true,
                    message: '请输入商品总价!'
                  }
                ],
              })(
                <Input placeholder="请输入商品总价" />
              )
            }
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="商品描述">
            {
              getFieldDecorator('productDescribe', {
                initialValue: this.props.item.productDescribe,
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请输入商品描述!'
                  }
                ],
              })(
                <TextArea rows={8} placeholder="请填写商品描述" />
              )
            }
          </Form.Item>
        </Col>
      </Row>
    )
  };
  stepsProductAddressRender = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row>
        <Col>
          <Form.Item label="商品发货地址">
            {
              getFieldDecorator('productSendAddress', {
                // initialValue: this.props.item.productSendAddress,
                rules: [
                  {
                    type: 'array',
                    required: true,
                    whitespace: true,
                    message: '请输入商品发货地址!'
                  }
                ],
              })(
                <Cascader options={options} placeholder="请选择发货地址" />
              )
            }
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="商品发货时间">
            {
              getFieldDecorator('productSendTime', {
                // initialValue: this.props.item.productSendTime,
                rules: [
                  {
                    required: true,
                    message: '请输入商品发货时间!'
                  }
                ],
              })(
                <DatePicker showTime placeholder="请输入商品发货时间"  />
              )
            }
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="商品收获地址">
            {
              getFieldDecorator('productPlaceOfReceipt', {
                // initialValue: this.props.item.productPlaceOfReceipt,
                rules: [
                  {
                    type: 'array',
                    required: true,
                    whitespace: true,
                    message: '请输入商品收获地址!'
                  }
                ],
              })(
                <Cascader options={options}  placeholder="请选择商品收获地址" />
              )
            }
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="商品收货时间">
            {
              getFieldDecorator('productTimeOfReceipt', {
                // initialValue: this.props.item.productTimeOfReceipt,
                rules: [
                  {
                    required: true,
                    message: '请输入商品收货时间!'
                  }
                ],
              })(
                <DatePicker showTime placeholder="请输入商品收货时间" />
              )
            }
          </Form.Item>
        </Col>
      </Row>
    )
  };
  stepsProductStateRender = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row>
        <Col>
          <Form.Item label="商品状态">
            {
              getFieldDecorator('productState', {
                initialValue: this.props.item.productState,
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请输入商品状态!'
                  }
                ],
              })(
                <Radio.Group>
                  <Radio value={'1'}>正常</Radio>
                  <Radio value={'0'}>异常</Radio>
                  <Radio value={'2'}>已收货</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
        </Col>
      </Row>
    )
  };

  // 上一步
  handlePrev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  // 下一步
  handleNext = (item) => {
    console.log(item);
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     console.log('handleSubmit form: ', values);
    //
    //     // this.setState({
    //     //   visible: false,
    //     //   confirmLoading: false,
    //     // });
    //   }
    // });
    const current = this.state.current + 1;
    this.setState({ current });
  };
  // 完成
  handleSubmit = (e) => {
    console.log('---完成---');
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('handleSubmit form: ', values);
        this.setState({
          visible: false,
          confirmLoading: false,
        });
      }
      return values
    });

  };
  // 取消
  handleCancel = () => {
    console.log('修改的触发');
    return false
  };
}

const mapStateToProps = (state, props) => {
  return {
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'editForm' })(EditForm))
