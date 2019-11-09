import styles from './index.css'

import React, {Component} from 'react'

import { connect } from 'dva';
import { Form, Row, Col, Card, Icon, DatePicker, Badge, Menu,
  Dropdown, Button, Statistic, Tooltip as AntdTooltip, Table     } from 'antd';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";

import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';
TweenOne.plugins.push(Children);

const {Meta} = Card;
const { RangePicker } = DatePicker;
const ButtonGroup = Button.Group;

const data = [
  {
    year: "1 月",
    sales: 100
  },
  {
    year: "2 月",
    sales: 52
  },
  {
    year: "3 月",
    sales: 61
  },
  {
    year: "4 月",
    sales: 145
  },
  {
    year: "5 月",
    sales: 48
  },
  {
    year: "6 月",
    sales: 38
  },
  {
    year: "7 月",
    sales: 120
  },
  {
    year: "8 月",
    sales: 38
  },
  {
    year: "9 月",
    sales: 40
  },
  {
    year: "10 月",
    sales: 20
  },
  {
    year: "11 月",
    sales: 78
  },
  {
    year: "12 月",
    sales: 140
  }
];
const cols = {
  sales: {
    tickInterval: 20
  }
};

const data1 = [
  {
    year: "1991",
    value: 1
  },
  {
    year: "1994",
    value: 6
  },
  {
    year: "1995",
    value: 4
  },
  {
    year: "1992",
    value: 8
  },
  {
    year: "1993",
    value: 3
  },
  {
    year: "1998",
    value: 7
  },
  {
    year: "1999",
    value: 2
  }
];

const data2 = [
  { item: '事例一', count: 40, percent: 0.4 },
  { item: '事例二', count: 21, percent: 0.21 },
  { item: '事例三', count: 17, percent: 0.17 },
  { item: '事例四', count: 13, percent: 0.13 },
  { item: '事例五', count: 9, percent: 0.09 },
];
const cols2 = {
  percent: {
    formatter: val => (val = `${val * 100}%`),
  },
};

const data3 = [
  {
    month: "Jan",
    city: "Tokyo",
    temperature: 7
  },
  {
    month: "Jan",
    city: "London",
    temperature: 3.9
  },
  {
    month: "Feb",
    city: "Tokyo",
    temperature: 6.9
  },
  {
    month: "Feb",
    city: "London",
    temperature: 4.2
  },
  {
    month: "Mar",
    city: "Tokyo",
    temperature: 9.5
  },
  {
    month: "Mar",
    city: "London",
    temperature: 5.7
  },
  {
    month: "Apr",
    city: "Tokyo",
    temperature: 14.5
  },
  {
    month: "Apr",
    city: "London",
    temperature: 8.5
  },
  {
    month: "May",
    city: "Tokyo",
    temperature: 18.4
  },
  {
    month: "May",
    city: "London",
    temperature: 11.9
  },
  {
    month: "Jun",
    city: "Tokyo",
    temperature: 21.5
  },
  {
    month: "Jun",
    city: "London",
    temperature: 15.2
  },
  {
    month: "Jul",
    city: "Tokyo",
    temperature: 25.2
  },
  {
    month: "Jul",
    city: "London",
    temperature: 17
  },
  {
    month: "Aug",
    city: "Tokyo",
    temperature: 26.5
  },
  {
    month: "Aug",
    city: "London",
    temperature: 16.6
  },
  {
    month: "Sep",
    city: "Tokyo",
    temperature: 23.3
  },
  {
    month: "Sep",
    city: "London",
    temperature: 14.2
  },
  {
    month: "Oct",
    city: "Tokyo",
    temperature: 18.3
  },
  {
    month: "Oct",
    city: "London",
    temperature: 10.3
  },
  {
    month: "Nov",
    city: "Tokyo",
    temperature: 13.9
  },
  {
    month: "Nov",
    city: "London",
    temperature: 6.6
  },
  {
    month: "Dec",
    city: "Tokyo",
    temperature: 9.6
  },
  {
    month: "Dec",
    city: "London",
    temperature: 4.8
  }
];
const cols3 = {
  month: {
    range: [0, 1]
  }
};

const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="1">操作1</Menu.Item>
    <Menu.Item key="2">操作2</Menu.Item>
  </Menu>
);
const columns = [
  {
    title: '排名',
    dataIndex: 'test1',
    key: 'test1',
  },
  {
    title: '搜索关键词',
    dataIndex: 'test2',
    key: 'test2',
    render: (text) => {
      return (
        <a>{text}</a>
      )
    },
  },
  {
    title: '用户数',
    dataIndex: 'test3',
    key: 'test3',
    sorter: (a, b) => a.test3 - b.test3,
  },
  {
    title: '涨幅',
    dataIndex: 'test4',
    key: 'test4',
    sorter: (a, b) => a.test4 - b.test4,
    render: (text) => {
      return (
        <div>
          <span> {text}%</span>
          <span><Icon type="caret-up" style={{color: 'red', fontSize: 12, marginLeft: 10}} /></span>
        </div>
      )
    },
  },
];
const dataSource = [
  {
    test1: '2',
    test2: '搜索关键词-0',
    test3: 30,
    test4: 25,
  },
  {
    test1: '1',
    test2: '搜索关键词-0',
    test3: 32,
    test4: 29,
  },
];
const onClick =(val) => {
  console.log(val);
};
class Index extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      animation: {
        Children: {
          value: 10000,
          floatLength: 0,
          formatMoney: true,
        },
        duration: 1000,
      },
      noTitleKey: 'test'
    };
  }
// 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
  }
  // 组件卸载
  componentWillUnmount() {
  }
  test =() => {
   return (
     <TweenOne
       animation={this.state.animation}
       style={{ fontSize: 24 }}
     >
       0
     </TweenOne>
   )
  };
  onTabChange = (val) => {
    this.setState({
      noTitleKey: val
    });
    console.log(val);
  };
  onRangePickerChange = (date, dateString) => {
    console.log(dateString)
  };
  testR = () => {
    return (
      <Row>
        <Col span={10}>
          <Row type="flex" gutter={{lg: 24}}>
            <Col>
              <a>今日</a>
            </Col>
            <Col>
              <a>本周</a>
            </Col>
            <Col>
              <a>本月</a>
            </Col>
            <Col>
              <a>全年</a>
            </Col>
          </Row>
        </Col>
        <Col span={14}>
          <RangePicker onChange={this.onRangePickerChange} />
        </Col>
      </Row>
    )
  };
  testStatistic = () => {
    return (
      <Row type="flex" gutter={10}>
        <Col>
          搜索用户数
        </Col>
        <Col>
          <AntdTooltip title="指标提示">
            <Icon type="info-circle" />
          </AntdTooltip>
        </Col>
      </Row>
    )
  };
  testStatisticSuffix = () => {
    return (
      <div style={{marginLeft: 10}}>
        <span style={{color: '#999'}}>12.1</span>
        <Icon type="caret-up" style={{color: 'red', fontSize: 12, marginLeft: 4}} />
      </div>
    )
  };
  render() {
    return (
      <div>

        <Row gutter={24}>
          <Col lg={6}>
            <Card title={null} bordered={false}>
              <Row type="flex" align="middle" style={{paddingBottom: 32, paddingTop: 32}}>
                <Col lg={9}>
                  <Icon type="pay-circle" style={{fontSize: 54, color: 'rgb(100, 234, 145)'}} />
                  {/*<Avatar size={64} icon="pay-circle" />*/}
                </Col>
                <Col lg={15}>
                 <div className={'publicText'}>
                   测试测试测试测试测试测试测试测试测试测试测试测试
                 </div>
                  <div>
                    {this.test()}
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={6}>
            <Card title={null} bordered={false}>
              <Row type="flex" align="middle" style={{paddingBottom: 32, paddingTop: 32}}>
                <Col lg={9}>
                  <Icon type="team" style={{fontSize: 54, color: 'rgb(143, 201, 251)'}} />
                  {/*<Avatar size={64} icon="pay-circle" />*/}
                </Col>
                <Col lg={15}>
                  <div className={'publicText'}>
                    测试测试测试测试测试测试测试测试测试测试测试测试
                  </div>
                  <div>
                    {this.test()}
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={6}>
            <Card title={null} bordered={false}>
              <Row type="flex" align="middle" style={{paddingBottom: 32, paddingTop: 32}}>
                <Col lg={9}>
                  <Icon type="message" style={{fontSize: 54, color: 'rgb(216, 151, 235)'}} />
                  {/*<Avatar size={64} icon="pay-circle" />*/}
                </Col>
                <Col lg={15}>
                  <div className={'publicText'}>
                    测试测试测试测试测试测试测试测试测试测试测试测试
                  </div>
                  <div>
                    {this.test()}
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={6}>
            <Card title={null} bordered={false}>
              <Row type="flex" align="middle" style={{paddingBottom: 32, paddingTop: 32}}>
                <Col lg={9}>
                  <Icon type="shopping-cart" style={{fontSize: 54, color: 'rgb(246, 152, 153)'}} />
                  {/*<Avatar size={64} icon="pay-circle" />*/}
                </Col>
                <Col lg={15}>
                  <div className={'publicText'}>
                    测试测试测试测试测试测试测试测试测试测试测试测试
                  </div>
                  <div>
                    {this.test()}
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <div style={{height: 24, backgroundColor: '#EEF0F3'}}></div>

        <Row>
          <Card
            style={{ width: '100%' }}
            tabList={[
              {
                key: 'test',
                tab: '销售额',
              },
              {
                key: 'test1',
                tab: '访问量',
              }
            ]}
            activeTabKey={this.state.noTitleKey}
            tabBarExtraContent={
              this.testR()
            }
            onTabChange={key => {
              this.onTabChange(key, 'noTitleKey');
            }}
          >
            <Row>
              <Col lg={16}>
                <Row>
                  <Col lg={4} style={{paddingBottom: 24}}>
                    <h4 style={{color: 'rgba(0,0,0,.85)',
                      fontWeight: 500}}>访问量趋势</h4>
                  </Col>
                  <Col lg={24}>
                    <Chart height={300} data={data} scale={cols} padding={'auto'} forceFit>
                      <Axis name="year" />
                      <Axis name="sales"/>
                      <Tooltip
                        crosshairs={{
                          type: "y"
                        }}
                      />
                      <Geom type="interval" position="year*sales" />
                    </Chart>
                  </Col>
                </Row>
              </Col>
              {/*style={{backgroundColor: 'red'}}*/}
              <Col lg={6} push={1} style={{marginLeft: 22}}>
                <Row>
                  <Col lg={24}  style={{paddingBottom: 24, marginLeft: 12}}>
                    <h4 style={{color: 'rgba(0,0,0,.85)',
                      fontWeight: 500}}>门店访问排名量</h4>
                  </Col>
                </Row>
                <Row type="flex" align="middle" justify="center">
                  <Col lg={4} style={{textAlign: 'center'}}>
                    {
                      false ? (<span>1</span>) : (<Badge
                        count={1}
                        style={{ backgroundColor: '#314659', color: '#fff'}}
                      />)
                    }
                  </Col>
                  <Col lg={12}>
                    工专路 0 号店
                  </Col>
                  <Col lg={8} style={{textAlign: 'right'}}>
                    323, 234
                  </Col>
                </Row>
                <Row type="flex" align="middle" justify="center" style={{paddingTop: 20}}>
                  <Col lg={4} style={{textAlign: 'center'}}>
                    {
                      false ? (<span>2</span>) : (<Badge
                        count={2}
                        style={{ backgroundColor: '#314659', color: '#fff'}}
                      />)
                    }
                  </Col>
                  <Col lg={12}>
                    工专路 0 号店
                  </Col>
                  <Col lg={8} style={{textAlign: 'right'}}>
                    323, 234
                  </Col>
                </Row>
                <Row type="flex" align="middle" justify="center" style={{paddingTop: 20}}>
                  <Col lg={4} style={{textAlign: 'center'}}>
                    {
                      false ? (<span>3</span>) : (<Badge
                        count={3}
                        style={{ backgroundColor: '#314659', color: '#fff'}}
                      />)
                    }
                  </Col>
                  <Col lg={12}>
                    工专路 0 号店
                  </Col>
                  <Col lg={8} style={{textAlign: 'right'}}>
                    323, 234
                  </Col>
                </Row>
                <Row type="flex" align="middle" justify="center" style={{paddingTop: 20}}>
                  <Col lg={4} style={{textAlign: 'center'}}>
                    {
                      true ? (<span>4</span>) : (<Badge
                        count={4}
                        style={{ backgroundColor: '#314659', color: '#fff'}}
                      />)
                    }
                  </Col>
                  <Col lg={12}>
                    工专路 0 号店
                  </Col>
                  <Col lg={8} style={{textAlign: 'right'}}>
                    323, 234
                  </Col>
                </Row>
                <Row type="flex" align="middle" justify="center" style={{paddingTop: 20}}>
                  <Col lg={4} style={{textAlign: 'center'}}>
                    {
                      true ? (<span>1</span>) : (<Badge
                        count={1}
                        style={{ backgroundColor: '#314659', color: '#fff'}}
                      />)
                    }
                  </Col>
                  <Col lg={12}>
                    工专路 0 号店
                  </Col>
                  <Col lg={8} style={{textAlign: 'right'}}>
                    323, 234
                  </Col>
                </Row>
                <Row type="flex" align="middle" justify="center" style={{paddingTop: 20}}>
                  <Col lg={4} style={{textAlign: 'center'}}>
                    {
                      true ? (<span>1</span>) : (<Badge
                        count={1}
                        style={{ backgroundColor: '#314659', color: '#fff'}}
                      />)
                    }
                  </Col>
                  <Col lg={12}>
                    工专路 0 号店
                  </Col>
                  <Col lg={8} style={{textAlign: 'right'}}>
                    323, 234
                  </Col>
                </Row>
                <Row type="flex" align="middle" justify="center" style={{paddingTop: 20}}>
                  <Col lg={4} style={{textAlign: 'center'}}>
                    {
                      true ? (<span>1</span>) : (<Badge
                        count={1}
                        style={{ backgroundColor: '#314659', color: '#fff'}}
                      />)
                    }
                  </Col>
                  <Col lg={12}>
                    工专路 0 号店
                  </Col>
                  <Col lg={8} style={{textAlign: 'right'}}>
                    323, 234
                  </Col>
                </Row>
                <Row type="flex" align="middle" justify="center" style={{paddingTop: 20}}>
                  <Col lg={4} style={{textAlign: 'center'}}>
                    {
                      true ? (<span>1</span>) : (<Badge
                        count={1}
                        style={{ backgroundColor: '#314659', color: '#fff'}}
                      />)
                    }
                  </Col>
                  <Col lg={12}>
                    工专路 0 号店
                  </Col>
                  <Col lg={8} style={{textAlign: 'right'}}>
                    323, 234
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Row>

        <div style={{height: 24, backgroundColor: '#EEF0F3'}}></div>

        <Row gutter={24}>
          <Col lg={12}>
            <Card title="线上热门搜索" bordered={false}
                  extra={
                    <Dropdown overlay={menu}>
                      <span>...</span>
                    </Dropdown>
                  }
            >
             <Row type="flex" gutter={24}>
               <Col lg={12}>
                 <Statistic
                   title={this.testStatistic()}
                   value={1121.28}
                   precision={2}
                   valueStyle={{ color: '#222' }}
                   suffix={this.testStatisticSuffix()}
                 />
                 <div>
                   <Chart height={50} data={data1} forceFit padding={[10,0,10,0]}>
                     <Tooltip
                       crosshairs={{
                         type: "line"
                       }}
                     />
                     <Geom type="area" position="year*value" shape={"smooth"} />
                     <Geom type="line" position="year*value" shape={"smooth"} size={2} />
                   </Chart>
                 </div>
               </Col>
               <Col lg={12}>
                 <Statistic
                   title={this.testStatistic()}
                   value={1121.28}
                   precision={2}
                   valueStyle={{ color: '#222' }}
                   suffix={this.testStatisticSuffix()}
                 />
                 <div>
                   <Chart height={50} data={data1} forceFit padding={[10,0,10,0]}>
                     <Tooltip
                       crosshairs={{
                         type: "line"
                       }}
                     />
                     <Geom type="area" position="year*value" shape={"smooth"} />
                     <Geom type="line" position="year*value" shape={"smooth"} size={2} />
                   </Chart>
                 </div>
               </Col>
             </Row>
              <Row>
                <Table dataSource={dataSource} columns={columns} />
              </Row>
            </Card>
          </Col>
          <Col lg={12}>
            <Card title="销售额类别占比" bordered={false}
                  extra={
                    <Row type="flex">
                      <Col>
                        <ButtonGroup>
                          <Button>全部渠道</Button>
                          <Button>线上</Button>
                          <Button>线下</Button>
                        </ButtonGroup>
                      </Col>
                      <Col style={{paddingLeft: 24}}>
                        <Dropdown overlay={menu}>
                          <span>...</span>
                        </Dropdown>
                      </Col>
                    </Row>
                  }
            >
              <Row>
                <Col lg={4} style={{paddingBottom: 24}}>
                  <h4 style={{color: 'rgba(0,0,0,.85)',
                    fontWeight: 500}}>销售额</h4>
                </Col>
                <Col lg={24}>
                  <Chart
                    width={400}
                    height={275}
                    data={data2}
                    scale={cols2}
                    padding={[0, 0, 0, 0]}
                    forceFit
                    onGetG2Instance={(chart) => {
                      // 饼图绘制多次会导致setSelected处理不生效，延时hack一下fixed
                    }} // 设置选中
                    onPlotClick={(ev) => {
                      console.log(ev);
                    }}
                  >
                    <Coord type={"theta"} radius={1} innerRadius={.5} />
                    <Axis name="percent" />
                    <Legend
                      position="right"
                      offsetY={-275 / 2 + 120}
                      offsetX={-100}
                    />
                    <Tooltip
                      showTitle={false}
                      itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                    />
                    <Guide>
                      <Guide.Html
                        position={["50%", "50%"]}
                        html="<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;>主机<br><span style=&quot;color:#262626;font-size:2.5em&quot;>200</span>台</div>"
                        alignX="middle"
                        alignY="middle"
                      />
                    </Guide>
                    <Geom
                      type="intervalStack"
                      position="percent"
                      color="item"
                      tooltip={[
                        "item*percent",
                        (item, percent) => {
                          percent = percent * 100 + "%";
                          return {
                            name: item,
                            value: percent
                          };
                        }
                      ]}
                      style={{
                        lineWidth: 1,
                        stroke: "#fff"
                      }}
                    >
                    </Geom>

                  </Chart>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <div style={{height: 24, backgroundColor: '#EEF0F3'}}></div>

        <Row>
          <Col>
            <Card bordered={false} title={null}>
              <Chart height={400} data={data3} scale={cols3} forceFit padding={'auto'}>
                <Legend position="top" />
                <Axis name="month" />
                <Axis
                  name="temperature"
                  label={{
                    formatter: val => `${val}°C`
                  }}
                />
                <Tooltip
                  crosshairs={{
                    type: "y"
                  }}
                />
                <Geom
                  type="line"
                  position="month*temperature"
                  size={2}
                  color={"city"}
                  shape={"smooth"}
                />
                <Geom
                  type="point"
                  position="month*temperature"
                  size={4}
                  shape={"circle"}
                  color={"city"}
                  style={{
                    stroke: "#fff",
                    lineWidth: 1
                  }}
                />
              </Chart>
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

export default connect(mapStateToProps, mapDispatchToProps)(Index)
