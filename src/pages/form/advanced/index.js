import styles from './index.css'
import React, {Component} from 'react'

import { connect } from 'dva';
import { Form, Input, Button, Checkbox, Icon,
  Radio,DatePicker, InputNumber, Cascader,Switch,
  Select, Rate, Card, Row, Col, Affix
} from 'antd';

import TableForm from './components/TableForm/'

const { Option } = Select;

const tableData = [
  {
    key: '1',
    workId: '00001',
    name: 'John Brown',
    department: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    workId: '00002',
    name: 'Jim Green',
    department: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    workId: '00003',
    name: 'Joe Black',
    department: 'Sidney No. 1 Lake Park',
  },
];

class AdvancedForm extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      options: [
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
      ]
    };
  }
// 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
  }
  // 组件卸载
  componentWillUnmount() {
  }
  // 表单提交
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('handleSubmit form: ', values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ background: '#fff'}}>
        <Form onSubmit={this.handleSubmit}
                layout="vertical"
                hideRequiredMark
        >
          <Card title="商品库存管理" bordered={false} >
            <Row gutter={20}>
              <Col lg={8} md={12} sm={24}>
                <Form.Item label="商品仓库名称">
                  {
                    getFieldDecorator('shopRepertoryName', {
                      rules: [
                        {
                          required: true,
                          whitespace: true,
                          message: '请输入仓库名称!'
                        }
                      ],
                    })(
                      <Input placeholder="请输入仓库名称" />
                    )
                  }
                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item label="商品仓库位置">
                  {
                    getFieldDecorator('shopName', {
                      // initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                      rules: [
                        {
                          type: 'array',
                          required: true,
                          whitespace: true,
                          message: '请选择商品仓库位置!'
                        }
                      ],
                    })(
                      <Cascader
                        placeholder="请选择商品仓库位置"
                        options={this.state.options}
                      />,
                    )
                  }
                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item label="商品仓库管理员">
                  {
                    getFieldDecorator('shopRepertoryAdministrator', {
                      initialValue: 'An',
                      rules: [
                        {
                          required: true,
                          whitespace: true,
                          message: '请选择仓库管理员!'
                        }
                      ],
                    })(
                      <Select
                        placeholder="请选择仓库管理员"
                      >
                        <Option value="An">An</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>,
                    )
                  }
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col lg={8} md={12} sm={24}>
                <Form.Item label="商品仓库名称">
                  {
                    getFieldDecorator('shopRepertoryName', {
                      rules: [
                        {
                          required: true,
                          whitespace: true,
                          message: '请输入仓库名称!'
                        }
                      ],
                    })(
                      <Input placeholder="请输入仓库名称" />
                    )
                  }
                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item label="商品仓库位置">
                  {
                    getFieldDecorator('shopName', {
                      // initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                      rules: [
                        {
                          type: 'array',
                          required: true,
                          whitespace: true,
                          message: '请选择商品仓库位置!'
                        }
                      ],
                    })(
                      <Cascader
                        placeholder="请选择商品仓库位置"
                        options={this.state.options}
                      />,
                    )
                  }
                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item label="商品仓库管理员">
                  {
                    getFieldDecorator('shopRepertoryAdministrator', {
                      initialValue: 'An',
                      rules: [
                        {
                          required: true,
                          whitespace: true,
                          message: '请选择仓库管理员!'
                        }
                      ],
                    })(
                      <Select
                        placeholder="请选择仓库管理员"
                      >
                        <Option value="An">An</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>,
                    )
                  }
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <div style={{height: 24, backgroundColor: '#EEF0F3'}}></div>

          <Card title="商品分类管理" bordered={false}>
            <Row gutter={20}>
              <Col lg={8} md={12} sm={24}>
                <Form.Item label="商品仓库名称">
                  {
                    getFieldDecorator('shopRepertoryName', {
                      rules: [
                        {
                          required: true,
                          whitespace: true,
                          message: '请输入仓库名称!'
                        }
                      ],
                    })(
                      <Input placeholder="请输入仓库名称" />
                    )
                  }
                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item label="商品仓库位置">
                  {
                    getFieldDecorator('shopName', {
                      // initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                      rules: [
                        {
                          type: 'array',
                          required: true,
                          whitespace: true,
                          message: '请选择商品仓库位置!'
                        }
                      ],
                    })(
                      <Cascader
                        placeholder="请选择商品仓库位置"
                        options={this.state.options}
                      />,
                    )
                  }
                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item label="商品仓库管理员">
                  {
                    getFieldDecorator('shopRepertoryAdministrator', {
                      initialValue: 'An',
                      rules: [
                        {
                          required: true,
                          whitespace: true,
                          message: '请选择仓库管理员!'
                        }
                      ],
                    })(
                      <Select
                        placeholder="请选择仓库管理员"
                      >
                        <Option value="An">An</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>,
                    )
                  }
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col lg={8} md={12} sm={24}>
                <Form.Item label="商品仓库名称">
                  {
                    getFieldDecorator('shopRepertoryName', {
                      rules: [
                        {
                          required: true,
                          whitespace: true,
                          message: '请输入仓库名称!'
                        }
                      ],
                    })(
                      <Input placeholder="请输入仓库名称" />
                    )
                  }
                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item label="商品仓库位置">
                  {
                    getFieldDecorator('shopName', {
                      // initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                      rules: [
                        {
                          type: 'array',
                          required: true,
                          whitespace: true,
                          message: '请选择商品仓库位置!'
                        }
                      ],
                    })(
                      <Cascader
                        placeholder="请选择商品仓库位置"
                        options={this.state.options}
                      />,
                    )
                  }
                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item label="商品仓库管理员">
                  {
                    getFieldDecorator('shopRepertoryAdministrator', {
                      initialValue: 'An',
                      rules: [
                        {
                          required: true,
                          whitespace: true,
                          message: '请选择仓库管理员!'
                        }
                      ],
                    })(
                      <Select
                        placeholder="请选择仓库管理员"
                      >
                        <Option value="An">An</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>,
                    )
                  }
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <div style={{height: 24, backgroundColor: '#EEF0F3'}}></div>

          <Form.Item style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            zIndex: 999}}>
            <Button className={styles.formItemButton} type="primary" htmlType="submit">提交</Button>
          </Form.Item>

        </Form>
        <Card title="管理员列表" bordered={false}>
          {<TableForm />}
        </Card>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'advancedForm' })(AdvancedForm))
