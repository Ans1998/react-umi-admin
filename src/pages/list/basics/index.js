import styles from './index.css'
import React, {Component} from 'react'

import moment from 'moment';

import { connect } from 'dva';
import {
  Table, Divider, Tag, Modal, Popconfirm, Steps, Button,
  message, Row, Col, Form, Input, Cascader, DatePicker, Radio,
  Icon, Select
} from 'antd';

const { TextArea } = Input;
const { Option } = Select;


const data = [
  {
    key: '0',
    productName: '测试商品',
    productSum: 1455,
    productDescribe: '测试商品的描述',
    productSendAddress: '广州市',
    productSendTime: '2019-10-7 14:00:00',
    productPlaceOfReceipt: '佛山市',
    productTimeOfReceipt: '2019-10-8 12:30:00',
    productState: '1',
    // productState: ['normal', 'abnormal', 'receive'],
  },
  {
    key: '1',
    productName: '测试商品1',
    productSum: 1405,
    productDescribe: '测试商品的描述1',
    productSendAddress: '广州市1',
    productSendTime: '2019-10-7 14:00:00',
    productPlaceOfReceipt: '佛山市1',
    productTimeOfReceipt: '2019-10-8 12:30:00',
    productState: '0',
  },
  {
    key: '2',
    productName: '测试商品2',
    productSum: 14005,
    productDescribe: '测试商品的描述2',
    productSendAddress: '广州市2',
    productSendTime: '2019-10-7 14:00:02',
    productPlaceOfReceipt: '佛山市2',
    productTimeOfReceipt: '2019-10-8 12:30:00',
    productState: '0',
  }
];

const { Step } = Steps;

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

const productStateRender = (productState) => {
  switch (productState) {
    case '0':
      return (
        <Tag color='#f50'>
          异常
        </Tag>
      );
    case '1':
      return (
        <Tag color='green'>
          正常
        </Tag>
      );
    case '2':
      return (
        <Tag color="#87d068">
          已收货
        </Tag>
      );
  }
};
const productSumSorter = (one, two) => {
  // 自个把数据全部循环
  return one.productSum - two.productSum
  // console.log('one', one)
  // console.log('two', two)
};

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

class BasicsList extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      visible: false,
      loadingShow: false,
      ModalText: 'Content of the modal',
      confirmLoading: false,
      columns: [
        {
          title: '商品名称',
          dataIndex: 'productName',
          key: 'productName',
          render: text => <a>{text}</a>,
        },
        {
          title: '商品总价',
          dataIndex: 'productSum',
          key: 'productSum',
          sorter: productSumSorter,
          // render: text => <a>{text}</a>,
        },
        {
          title: '商品描述',
          dataIndex: 'productDescribe',
          key: 'productDescribe',
          // render: text => <a>{text}</a>,
        },
        {
          title: '商品发货地址',
          dataIndex: 'productSendAddress',
          key: 'productSendAddress',
          // render: text => <a>{text}</a>,
        },
        {
          title: '商品发货时间',
          dataIndex: 'productSendTime',
          sorter: (one, two) => moment(one.productSendTime, "YYYY-MM-DD HH:mm:ss").valueOf() - moment(two.productSendTime, "YYYY-MM-DD HH:mm:ss").valueOf(),
          key: 'productSendTime',
          // render: text => <a>{text}</a>,
        },
        {
          title: '商品收货地址',
          dataIndex: 'productPlaceOfReceipt',
          key: 'productPlaceOfReceipt',
          // render: text => <a>{text}</a>,
        },
        {
          title: '商品收货时间',
          dataIndex: 'productTimeOfReceipt',
          sorter: (one, two) => moment(one.productTimeOfReceipt, "YYYY-MM-DD HH:mm:ss").valueOf() - moment(two.productTimeOfReceipt, "YYYY-MM-DD HH:mm:ss").valueOf(),
          key: 'productTimeOfReceipt',
          // render: text => <a>{text}</a>,
        },
        {
          title: '商品状态',
          key: 'productState',
          dataIndex: 'productState',
          filters: [{ text: '正常', value: '1' }, { text: '异常', value: '0' }, { text: '已收货', value: '2' }],
          onFilter: (val, item) => {
            return item.productState === val
            // console.log('val', val)
            // console.log('item', item)
          },
          render: (productState) => (
            <span>
        {
          productStateRender(productState)
        }
      </span>
          ),
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
        <a>详情</a>
        <Divider type="vertical" />
        <a onClick={this.showEditProductModal.bind(this, record)}>编辑</a>
        <Divider type="vertical" />
        <Popconfirm title={"确定删除该条数据?"} onConfirm={this.showDeleteProductModal.bind(this, record)}>
          <a>删除</a>
        </Popconfirm>
      </span>
          ),
        },
      ],
      current: 0,
      item: {
        key: '2',
        productName: '测试商品2',
        productSum: 14005,
        productDescribe: '测试商品的描述2',
        productSendAddress: '广州市2',
        productSendTime: '2019-10-7 14:00:02',
        productPlaceOfReceipt: '佛山市2',
        productTimeOfReceipt: '2019-10-8 12:30:00',
        productState: '0',
      },
      expand: false,
    };
  }
// 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loadingShow: false
      })
    }, 1800)
  }
  // 组件卸载
  componentWillUnmount() {
  }
  // 表单编辑按钮
  showEditProductModal = (record) => {
    console.log('showEditProductModal', record);
    this.setState({
      visible: true,
      item: record
    });
  };
  // 表单删除按钮
  showDeleteProductModal = (record) => {
    console.log('showDeleteProductModal', record)
  };
  // 分页按钮
  handleTablePaginationChange = (page, pageSize) => {
    console.log('handleTablePaginationChange', page, pageSize)
  };
  handleTablePaginationSizeChange = (current, size) => {
    console.log('handleTablePaginationSizeChange', current, size)
  };
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
          <Button key="back" onClick={this.handleCancel}>
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

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
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
      <Col span={8}>
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
      <Col span={8}>
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
    const formItemPublicLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    const formItemHandleSearch = {
      labelCol: { span: 4 },
      labelAlign: 'left',
      wrapperCol: { span: 18 },
    };
    const { getFieldDecorator } = this.props.form;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        console.log('onSelect', record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log('onSelectAll', selected, selectedRows, changeRows);
      },
    };

    return (
      <div style={{ background: '#fff', padding: 12}}>
        <div>
          <Form {...formItemHandleSearch} onSubmit={this.handleSearch}>
            <Row>
              <Col span={8}>
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
              <Col span={8}>
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
              <Col span={8} style={{ textAlign: 'left'}}>
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
        <div style={{marginBottom: 12}}>
          <Button type="primary" icon="plus" >
            新建
          </Button>
        </div>
        <div className={styles.alertInfo}>
          <span><Icon style={{color: '#1890ff'}} theme='filled' type="exclamation-circle" /></span>
          <span style={{marginLeft: 10}}>已选择
            <a style={{margin: '0 5px'}}>0</a>
            项</span>
           <a style={{marginLeft: 10}}>清空</a>
        </div>
        <Table
          pagination={{
            total: 50,
            defaultPageSize: 10,
            pageSizeOptions: ['10', '20'],
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: this.handleTablePaginationChange,
            onShowSizeChange: this.handleTablePaginationSizeChange
          }}
          rowSelection={rowSelection}
          columns={this.state.columns}
          dataSource={data}
          loading={this.state.loadingShow} />
        <Form onSubmit={this.handleSubmit} {...formItemPublicLayout}>
          <Modal
            title="商品编辑"
            onCancel={this.handleCancel}
            visible={this.state.visible}
            footer={this.footerRender()}
          >
            {
              this.productModalRender()
            }
          </Modal>
        </Form>
      </div>
    );
  };
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
                initialValue: this.state.item.productName,
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
                initialValue: this.state.item.productSum,
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
                initialValue: this.state.item.productDescribe,
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
                // initialValue: this.state.item.productSendAddress,
                rules: [
                  {
                    type: 'array',
                    required: true,
                    whitespace: true,
                    message: '请输入商品发货地址!'
                  }
                ],
              })(
                <Cascader options={options} onChange={this.handleCascadeChange} placeholder="请选择发货地址" />
              )
            }
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="商品发货时间">
            {
              getFieldDecorator('productSendTime', {
                // initialValue: this.state.item.productSendTime,
                rules: [
                  {
                    required: true,
                    message: '请输入商品发货时间!'
                  }
                ],
              })(
                <DatePicker showTime placeholder="请输入商品发货时间" onChange={this.handleProductSendTime} onOk={this.handleProductSendTimeOk} />
              )
            }
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="商品收获地址">
            {
              getFieldDecorator('productPlaceOfReceipt', {
                // initialValue: this.state.item.productPlaceOfReceipt,
                rules: [
                  {
                    type: 'array',
                    required: true,
                    whitespace: true,
                    message: '请输入商品收获地址!'
                  }
                ],
              })(
                <Cascader options={options} onChange={this.handlePlaceOfReceiptCascadeChange} placeholder="请选择商品收获地址" />
              )
            }
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="商品收货时间">
            {
              getFieldDecorator('productTimeOfReceipt', {
                // initialValue: this.state.item.productTimeOfReceipt,
                rules: [
                  {
                    required: true,
                    message: '请输入商品收货时间!'
                  }
                ],
              })(
                <DatePicker showTime placeholder="请输入商品收货时间" onChange={this.handleProductTimeOfReceipt} onOk={this.handleProductTimeOfReceiptOk} />
              )
            }
          </Form.Item>
        </Col>
      </Row>
    )
  };
  // 地址
  handleCascadeChange = (value) => {
    console.log(value);
  };
  handlePlaceOfReceiptCascadeChange = (value) => {
    console.log(value);
  };
  // 时间
  handleProductSendTime = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };
  handleProductSendTimeOk = (value) => {
    console.log(value)
  };
  handleProductTimeOfReceipt = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };
  handleProductTimeOfReceiptOk = (value) => {
    console.log(value)
  };

  stepsProductStateRender = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row>
        <Col>
          <Form.Item label="商品状态">
            {
              getFieldDecorator('productState', {
                initialValue: this.state.item.productState,
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
    });

  };
  // 取消
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      // current: 0,
      visible: false,
    });
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'basicsList' })(BasicsList))
