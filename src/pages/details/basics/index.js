import styles from './index.css'
import React, {Component} from 'react'

import { connect } from 'dva';

import { Row, Col, Table, Card, Divider,Badge  } from 'antd';
const { Meta } = Card;
class BasicsDetails extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
    };
  }
// 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
  }
  // 组件卸载
  componentWillUnmount() {
  }

  render() {
    const productColumns = [
      {
        title: '商品编号',
        dataIndex: 'productId',
        key: 'productId',
        render: (text) => {
          if (text !== '总计') {
            return (
              <a> {text} </a>
            )
          } else {
            return (
              <span style={{fontWeight: 600}}> {text} </span>
            )
          }
        }
      },
      {
        title: '商品名称',
        dataIndex: 'productName',
        key: 'productName',
      },
      {
        title: '商品条码',
        dataIndex: 'productCode',
        key: 'productCode',
      },
      {
        title: '单价',
        dataIndex: 'productPrice',
        key: 'productPrice',
      },
      {
        title: '数量',
        dataIndex: 'productCount',
        key: 'productCount',
      },
      {
        title: '金额',
        dataIndex: 'productMoney',
        key: 'productMoney',
      },
    ];
    const productDataSource = [
      {
        productId: '111111',
        productName: '测试商品1',
        productCode: '111111111111111',
        productPrice: '2.00',
        productCount: '1',
        productMoney: '2.00',
      },
      {
        productId: '222222',
        productName: '测试商品2',
        productCode: '2222222222222222',
        productPrice: '3.00',
        productCount: '2',
        productMoney: '6.00',
      },
      {
        productId: '总计',
        productName: '',
        productCode: '',
        productPrice: '',
        productCount: '3',
        productMoney: '8.00',
      },
    ];

    const returnColumns = [
      {
        title: '时间',
        dataIndex: 'goodTime',
        key: 'goodTime',
      },
      {
        title: '当前进度',
        dataIndex: 'goodSchedule',
        key: 'goodSchedule',
      },
      {
        title: '状态',
        dataIndex: 'goodState',
        key: 'goodState',
        render: (text) => {
          if (text === '进行中') {
            return(<Badge status="processing" text={text} />)
          } else {
            return(<Badge status="success" text={text} />)
          }
        }
      },
      {
        title: '操作员ID',
        dataIndex: 'goodAdmin',
        key: 'goodAdmin',
      },
      {
        title: '耗时',
        dataIndex: 'goodElapsed',
        key: 'goodElapsed',
      },
    ];
    const returnDataSource = [
      {
        goodTime: '2017-10-01 14:10',
        goodSchedule: '联系客户',
        goodState: '进行中',
        goodAdmin: 'An',
        goodElapsed: '5mins'
      },
      {
        goodTime: '2017-10-05 14:10',
        goodSchedule: '取货员出发',
        goodState: '成功',
        goodAdmin: '取货员ID 1234',
        goodElapsed: '1h'
      }
    ];
    return (
      <div style={{ background: '#fff'}}>
        <Row>
          <Col>
            <Card bordered={false}>
              <Meta title="退款申请"
                    style={{color: 'rgba(0,0,0,.85)',
                fontWeight: 700,
                fontSize: 18}}
              ></Meta>
              <Row>
                <Col span={8} style={{marginTop: 24}}>
                  <span style={{marginRight: 6}}>取货单号:</span>
                  <span>100000000000</span>
                </Col>
                <Col span={8} style={{marginTop: 24}}>
                  <span style={{marginRight: 6}}>状态:</span>
                  <span>已取货</span>
                </Col>
                <Col span={8} style={{marginTop: 24}}>
                  <span style={{marginRight: 6}}>销售单号:</span>
                  <span>10008523366</span>
                </Col>
                <Col span={8} style={{marginTop: 24}}>
                  <span style={{marginRight: 6}}>子单号:</span>
                  <span>10085366000000</span>
                </Col>
              </Row>
            </Card>

          </Col>
        </Row>

        <Row style={{paddingLeft: 24, paddingRight: 24}}>
          <Divider></Divider>
        </Row>

        <Row>
          <Col>
            <Card bordered={false}>
              <Meta title="用户信息"
                    style={{color: 'rgba(0,0,0,.85)',
                fontWeight: 700,
                fontSize: 16}}
              ></Meta>
              <Row>
                <Col span={8} style={{marginTop: 24}}>
                  <span style={{marginRight: 6}}>用户姓名:</span>
                  <span>测试用户</span>
                </Col>
                <Col span={8} style={{marginTop: 24}}>
                  <span style={{marginRight: 6}}>联系电话:</span>
                  <span>12345678555</span>
                </Col>
                <Col span={8} style={{marginTop: 24}}>
                  <span style={{marginRight: 6}}>常用快递:</span>
                  <span>京东快递</span>
                </Col>
                <Col span={8} style={{marginTop: 24}}>
                  <span style={{marginRight: 6}}>取货地址:</span>
                  <span>浙江省杭州市西湖区万塘路</span>
                </Col>
                <Col span={8} style={{marginTop: 24}}>
                  <span style={{marginRight: 6}}>备注:</span>
                  <span>无</span>
                </Col>
              </Row>
            </Card>

          </Col>
        </Row>

        <Row style={{paddingLeft: 24, paddingRight: 24}}>
          <Divider></Divider>
        </Row>

        <Row>
          <Col>
            <Card bordered={false}>
              <Meta title="退货商品"
              ></Meta>
              <Row style={{marginTop: 24}}>
                <Col>
                  <Table pagination={false} dataSource={productDataSource} columns={productColumns} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/*<Row style={{paddingLeft: 24, paddingRight: 24}}>*/}
          {/*<Divider></Divider>*/}
        {/*</Row>*/}

        <Row>
          <Col>
            <Card bordered={false}>
              <Meta title="退货进度"></Meta>
              <Row style={{marginTop: 24}}>
                <Col>
                  <Table pagination={false} dataSource={returnDataSource} columns={returnColumns} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

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

export default connect(mapStateToProps, mapDispatchToProps)(BasicsDetails)
