import styles from './index.css'
import React, {Component} from 'react'

import { connect } from 'dva';

import {
  Table, PageHeader, Button, Descriptions, Row, Col,
  Dropdown, Menu, Tabs, Statistic, Card, Steps, Popover, Divider,
  Badge
} from 'antd';

const ButtonGroup = Button.Group;
const { TabPane } = Tabs;
const { Step } = Steps;


class AdvancedDetails extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      noTitleKey: 'one',
    };
  }
// 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
  }
  // 组件卸载
  componentWillUnmount() {
  }
  // 页头导航栏
  handleMenuClick = (val) => {
    console.log(val)
  };
  // 页头tab
  handleTabsChange(val) {
    console.log(val)
  }
  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">选项一</Menu.Item>
        <Menu.Item key="2">选项二</Menu.Item>
        <Menu.Item key="3">选项三</Menu.Item>
      </Menu>
    );
    const customDot = (dot, { status, index }) => {
      // console.log(status);
      return (
        <Popover key={index} content = { <span>step {index} status: {status}</span> } >
          {dot}
        </Popover>
      )
    };
    return (
      <div style={{ background: '#fff'}}>
        <PageHeader
          title="单号：23255688555222"
          extra={[
            <ButtonGroup style={{marginRight: 10}}>
              <Button>操作一</Button>
              <Button>操作二</Button>
              <Dropdown overlay={menu}>
                <Button>...</Button>
              </Dropdown>
            </ButtonGroup>,
            <Button key="1" type="primary">
              主要操作
            </Button>,
          ]}
          footer={
            <Tabs defaultActiveKey="1" animated={false} onChange={this.handleTabsChange}>
              <TabPane tab="详情" key="details"></TabPane>
              <TabPane tab="规则" key="rule"></TabPane>
            </Tabs>
          }
        >
          <Row>
            <Col lg={19} md={12} sm={24} xs={24}>
              <Descriptions size="small" column={{lg: 2, md: 2, sm: 1, xs: 1}}>
                <Descriptions.Item label="创建人">An</Descriptions.Item>
                <Descriptions.Item label="订购产品">An服务</Descriptions.Item>
                {/*<Descriptions.Item label="状态"></Descriptions.Item>*/}
                {/*<Descriptions.Item label="订单金额"></Descriptions.Item>*/}
                <Descriptions.Item label="创建时间">2017-07-07</Descriptions.Item>
                <Descriptions.Item label="关联单据">
                  <a>12354</a>
                </Descriptions.Item>
                {/*<Descriptions.Item>待审批</Descriptions.Item>*/}
                {/*<Descriptions.Item>￥568.08</Descriptions.Item>*/}
                <Descriptions.Item label="生效日期">2017-07-07 ~ 2017-08-08</Descriptions.Item>
                <Descriptions.Item label="备注">请于两个工作日内确认</Descriptions.Item>
              </Descriptions>
            </Col>
            <Col lg={5} md={12} sm={24} xs={24}>
              <Row type="flex">
                <Col lg={10} style={{textAlign: 'center'}}>
                  <div>
                    <Statistic title="状态"  value={'待审批'}/>
                  </div>
                </Col>
                <Col lg={14} style={{textAlign: 'center'}}>
                  <div>
                    <Statistic title="订单金额" prefix="$" value={3345.08} />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </PageHeader>

        <div style={{height: 24, backgroundColor: '#EEF0F3'}}></div>

        <div>
          <Card title="流程进度" bordered={false}>
            <Steps current={1} progressDot={customDot}>
              <Step title="创建项目"  description={this.test(0)} />
              <Step title="部门初审" description={this.test(1)} />
              <Step title="财务复核" description={this.test(2)} />
              <Step title="完成"  description={this.test(3)}/>
            </Steps>
          </Card>
        </div>

        <div style={{height: 24, backgroundColor: '#EEF0F3'}}></div>

        <div>
          <Card title="用户信息" bordered={false}>
            <Descriptions column={{lg: 3}}>
              <Descriptions.Item label="用户姓名">付小小</Descriptions.Item>
              <Descriptions.Item label="会员卡号">1810000000</Descriptions.Item>
              <Descriptions.Item label="身份证">0000000000000000000000</Descriptions.Item>
              <Descriptions.Item label="联系方式">12255555555555</Descriptions.Item>
              <Descriptions.Item label="联系地址">曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口</Descriptions.Item>
            </Descriptions>
            <Descriptions title="信息组" column={{lg: 3}} style={{paddingTop: 24}}>
              <Descriptions.Item label="某某数据">725</Descriptions.Item>
              <Descriptions.Item label="该数据更新时间">2017-08-08</Descriptions.Item>
              <Descriptions.Item label="某某数据">725</Descriptions.Item>
              <Descriptions.Item label="该数据更新时间">2017-08-08</Descriptions.Item>
            </Descriptions>
            <p
              style={{
                fontSize: 14,
                color: 'rgba(0, 0, 0, 0.85)',
                paddingTop: 24
              }}
            >
              信息组
            </p>
            <Card type="inner" title="多层级信息组">
              <Row  style={{paddingTop: 24}}>
                <Col>
                  <Descriptions title="组名称" column={{lg: 3}}>
                    <Descriptions.Item label="负责人">An</Descriptions.Item>
                    <Descriptions.Item label="角色码">123456</Descriptions.Item>
                    <Descriptions.Item label="所属部门">
                      <span>xxx公司</span>
                      <span>-</span>
                      <span>YY部</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="过期时间">2017-08-08</Descriptions.Item>
                    <Descriptions.Item label="描述">
                      这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>

              <Row>
                <Divider></Divider>
              </Row>

              <Row>
                <Col>
                  <Descriptions title="组名称" column={{lg: 3}}>
                    <Descriptions.Item label="学名">Citrullus lanatus (Thunb.) Matsum. et Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗</Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>

              <Row>
                <Divider></Divider>
              </Row>

              <Row>
                <Col>
                  <Descriptions title="组名称" column={{lg: 3}}>
                    <Descriptions.Item label="负责人">An</Descriptions.Item>
                    <Descriptions.Item label="角色码">123456</Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>

            </Card>
          </Card>
        </div>

        <div style={{height: 24, backgroundColor: '#EEF0F3'}}></div>

        <div>
          <Card title="用户近半年来电记录" bordered={false}>
            <Table></Table>
          </Card>
        </div>

        <div style={{height: 24, backgroundColor: '#EEF0F3'}}></div>

        <div>
          <Card
            style={{ width: '100%' }}
            tabList={ [
              {
                key: 'one',
                tab: '操作日志一',
              },
              {
                key: 'two',
                tab: '操作日志二',
              },
              {
                key: 'three',
                tab: '操作日志三',
              }
            ]}
            activeTabKey={this.state.noTitleKey}
            onTabChange={key => {
              this.onTabChange(key);
            }}
          >
            {this.contentListNoTitle()}
          </Card>
        </div>


      </div>
    );
  };
  onTabChange = (key) => {
    console.log(key);
    this.setState({ noTitleKey: key });
  };
  contentListNoTitle = () => {
    switch (this.state.noTitleKey) {
      case 'one':
        let data = [
          {
            test: '订购关系生效',
            test1: 'An',
            test2: '成功',
            test3: '2017-01-02 19:23:12',
            test4: '-'
          },
          {
            test: '财务复审',
            test1: '付小小',
            test2: '驳回',
            test3: '2017-01-02 19:23:12',
            test4: '不通过原因'
          },
          {
            test: '部门初审',
            test1: '周毛毛',
            test2: '成功',
            test3: '2017-01-02 19:23:12',
            test4: '很棒'
          }
        ];
        return  this.noTitleRender(data);
      case 'two':
        let dataTwo = [
          {
            test: '订购关系生效',
            test1: 'An',
            test2: '成功',
            test3: '2017-01-02 19:23:12',
            test4: '-'
          }
        ];
        return  this.noTitleRender(dataTwo);
      case 'three':
        let dataThree = [
          {
            test: '提交订单',
            test1: '汗牙牙',
            test2: '成功',
            test3: '2017-01-02 19:23:12',
            test4: '-'
          }
        ];
        return  this.noTitleRender(dataThree);
    }
  };
  noTitleRender = (dataSource) => {
    let columns = [
      {
        title: '操作类型',
        dataIndex: 'test',
        key: 'test',
      },
      {
        title: '操作人',
        dataIndex: 'test1',
        key: 'test1',
      },
      {
        title: '执行结果',
        dataIndex: 'test2',
        key: 'test2',
        render: (text) => {
          if (text === '成功') {
            return (
              <div>
                <Badge status="success" text={text} />
              </div>
            )
          } else {
            return (
              <div>
                <Badge status="error" text={text} />
              </div>
            )
          }
        }
      },
      {
        title: '操作时间',
        dataIndex: 'test3',
        key: 'test3',
      },
      {
        title: '备注',
        dataIndex: 'test4',
        key: 'test4',
      },
    ];
    return (
      <Table dataSource={dataSource} columns={columns} pagination={false}></Table>
    )
  };
  test = (state) => {
    switch (state) {
      case 0:
        return (
          <div>
            <div>ll</div>
            <div>2016-12-12 12:32</div>
          </div>
        );
      case 1:
        return (
          <div>
            <div>ll</div>
            <div>
              <a>催一下</a>
            </div>
          </div>
        )
      default:
        return (
          <div></div>
        )
    }

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

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedDetails)
