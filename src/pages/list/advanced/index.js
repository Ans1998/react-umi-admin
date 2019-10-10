import styles from './index.css'
import React, {Component} from 'react'

import { connect } from 'dva';

import { Row, Col, Input, Tabs, PageHeader, Tag, Form, Select, Card,  Icon, Avatar } from 'antd';

const { Search } = Input;
const { TabPane } = Tabs;
const { CheckableTag } = Tag;
const { Option } = Select;
const { Meta } = Card;
class AdvancedList extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      selectedTags: [],
      tabKey: 'project'
    };
  }
// 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
  }
  // 组件卸载
  componentWillUnmount() {
  }
  // tabs切换
  handleTabsChange = (e) => {
    console.log(e);
    this.setState({
      tabKey: e
    });
  };
  render() {
    return (
      <div style={{ background: '#fff'}}>
        <PageHeader
          title="搜索列表(项目)"
          footer={
            <Tabs defaultActiveKey="1" animated={false} onChange={this.handleTabsChange}>
              <TabPane tab="项目" key="project"></TabPane>
              <TabPane tab="应用" key="adhibition"></TabPane>
            </Tabs>
          }
        >
         <div>
           <Row>
             <Col span={12} push={6}>
               <Search
               placeholder="请输入"
               enterButton="搜索"
               size="large"
               onSearch={value => console.log(value)}
               />
             </Col>
           </Row>
         </div>
        </PageHeader>

        <div style={{height: 24, backgroundColor: '#EEF0F3'}}></div>

        {
          this.tabsNavRender()
        }

        <div style={{height: 24, backgroundColor: '#EEF0F3'}}></div>

        {
          this.tabsNavContentRender()
        }
      </div>
    );
  };
  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  tabsNavRender = () => {
    const tagsFromServer = ['测试项目', '演示项目', '研发项目', '研发2项目'];
    return (
      <div style={{color: 'rgba(0,0,0,.85)', fontSize: 14}}>
        <Row type='flex' align="middle"  style={{borderBottom: '1px dashed #e8e8e8', margin: 14, paddingTop: 10, paddingBottom: 20}}>
          <Col span={3}>
            <span style={{ marginRight: 4, display: 'inline' }}>所属类目</span>
            <span>:</span>
          </Col>
          <Col span={16}>
            {tagsFromServer.map(tag => (
              <CheckableTag
                style={{fontSize: 14}}
                key={tag}
                checked={this.state.selectedTags.indexOf(tag) > -1}
                onChange={checked => this.handleChange(tag, checked)}
              >
                {tag}
              </CheckableTag>
            ))}
          </Col>
        </Row>
        <Row type='flex' align="middle" style={{margin: 14, paddingTop: 10, paddingBottom: 20}}>
          <Col span={3}>
            <span style={{ marginRight: 4, display: 'inline' }}>其他选项</span>
            <span>:</span>
          </Col>
          <Col span={10}>
            <span style={{ marginRight: 4, marginLeft: 6}}>管理员</span>
            <span style={{ marginRight: 6}}>:</span>
            <Select
              style={{ width: 200 }}
              placeholder="请选择项目管理员"
            >
              <Option value="An">An</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </Col>
        </Row>
      </div>
    )
  };

  tabsNavContentRender = () => {
    switch (this.state.tabKey) {
      case 'project':
        return this.tabsNavContentProjectRender();
      case 'adhibition':
        return this.tabsNavContentAdhibitionRender();
    }
  };
  tabsNavContentProjectRender = () => {
    return (
      <div style={{paddingBottom: 24, paddingLeft: '4%'}}>
        <Row>
          <Col span={6} style={{paddingTop: 24}}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
              <Meta title="测试项目" description="就是测试项目而已" />
            </Card>
          </Col>
          <Col span={6} style={{paddingTop: 24}}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
              <Meta title="测试项目" description="就是测试项目而已" />
            </Card>
          </Col>
          <Col span={6} style={{paddingTop: 24}}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
              <Meta title="测试项目" description="就是测试项目而已" />
            </Card>
          </Col>
          <Col span={6} style={{paddingTop: 24}}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
              <Meta title="测试项目" description="就是测试项目而已" />
            </Card>
          </Col>
          <Col span={6} style={{paddingTop: 24}}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
              <Meta title="测试项目" description="就是测试项目而已" />
            </Card>
          </Col>
        </Row>
      </div>
    )
  };
  tabsNavContentAdhibitionRender = () => {
    return (
      <div style={{paddingBottom: 24}}>
        <Row>
          <Col span={6} style={{padding: 24}}>
            <Card
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <Icon type="setting" key="setting" />,
                <Icon type="edit" key="edit" />,
                <Icon type="ellipsis" key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title="Card title"
                description="This is the description"
              />
            </Card>
          </Col>
          <Col span={6} style={{padding: 24}}>
            <Card
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <Icon type="setting" key="setting" />,
                <Icon type="edit" key="edit" />,
                <Icon type="ellipsis" key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title="Card title"
                description="This is the description"
              />
            </Card>
          </Col>
          <Col span={6} style={{padding: 24}}>
            <Card
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <Icon type="setting" key="setting" />,
                <Icon type="edit" key="edit" />,
                <Icon type="ellipsis" key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title="Card title"
                description="This is the description"
              />
            </Card>
          </Col>
          <Col span={6} style={{padding: 24}}>
            <Card
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <Icon type="setting" key="setting" />,
                <Icon type="edit" key="edit" />,
                <Icon type="ellipsis" key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title="Card title"
                description="This is the description"
              />
            </Card>
          </Col>
          <Col span={6} style={{padding: 24}}>
            <Card
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <Icon type="setting" key="setting" />,
                <Icon type="edit" key="edit" />,
                <Icon type="ellipsis" key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title="Card title"
                description="This is the description"
              />
            </Card>
          </Col>
        </Row>
      </div>
    )
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
export default connect(mapStateToProps, mapDispatchToProps)(AdvancedList)
