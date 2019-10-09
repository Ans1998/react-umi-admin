import React, {Component} from 'react'

// import styles from './index.css';

import {
  Button, Row, Col, Form, Input, DatePicker,
  Icon, Select
} from 'antd';

import { connect } from 'dva';

const { Option } = Select;

class SearchForm extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  };
  handleReset = () => {
    this.props.form.resetFields();
  };
  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };
  testResetRender = () => {
    const { getFieldDecorator } = this.props.form;
    let children = [];
    children.push(
      <Col lg={8} md={8} sm={24}>
        <Form.Item label='发货时间'>
          {getFieldDecorator('searchProductSendTime', {
            rules: [
              {
                required: false,
                message: '请输入发货时间!',
              },
            ],
          })(
            <DatePicker showTime
                        placeholder="请输入发货时间"
                        onChange={this.handleProductSendTime}
                        onOk={this.handleProductSendTimeOk} />
          )}
        </Form.Item>
      </Col>,
      <Col lg={8} md={8} sm={24}>
        <Form.Item label='商品状态'>
          {getFieldDecorator('searchProductState', {
            rules: [
              {
                required: false,
                message: '请输入商品状态!',
              },
            ],
          })(
            <Select
              showSearch
              placeholder="请输入商品状态"
            >
              <Option value="1">正常</Option>
              <Option value="0">异常</Option>
              <Option value="2">已收货</Option>
            </Select>,
          )}
        </Form.Item>
      </Col>,
    );
    return children;
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemHandleSearch = {
      labelCol: {
        lg: 4,
        md: 24,
        sm: 6
      },
      labelAlign: 'left',
      wrapperCol: {
        lg: 16,
        md: 24,
        sm: 18
      },
    };
    return (
      <div>
        <Form {...formItemHandleSearch} onSubmit={this.handleSearch}>
          <Row>
            <Col lg={8} md={8} sm={24}>
              <Form.Item label='商品名称'>
                {getFieldDecorator('searchProductName ', {
                  rules: [
                    {
                      required: false,
                      message: '请输入商品名称!',
                    },
                  ],
                })(
                  <Input placeholder="请输入商品名称" />
                )}
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item label='商品价格'>
                {getFieldDecorator('searchProductSum', {
                  rules: [
                    {
                      required: false,
                      message: '请输入商品价格!',
                    },
                  ],
                })(
                  <Input placeholder="请输入商品价格" />
                )}
              </Form.Item>
            </Col>
            {
              this.state.expand ? this.testResetRender() : null
            }
            <Col lg={8} md={8} sm={24} style={{ textAlign: 'left'}}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                  重置
                </Button>
                <a onClick={this.toggle} style={{ marginLeft: 8, fontSize: 12 }}>
                  展开 <Icon type={this.state.expand ? 'up' : 'down'} />
                </a>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'searchForm' })(SearchForm))
