// import styles from './index.css'
import React, {Component} from 'react'

import { connect } from 'dva';
import { Button, Card, Divider, Popconfirm, Table, Tag } from 'antd';
import SetAuthModal from './components/SetAuthModal'
class AuthSet extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      authList: [
        {
          key : '0',
          name: 'a',
          password: '123456',
          describe: 'a',
          role: '管理员',
          log: '点击查看',
          updateTime: '2017-10-29'
        }
      ],
      tableLoading: false,
      visible: false,
      confirmLoading: false,
    };
  }
  // 组件渲染之前
  componentWillMount() {
    // this.props.getUserInfo()
  }
  // 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
  }
  // 组件卸载
  componentWillUnmount() {
  }

  render() {
    const {authList} = this.state;
    const columns = [
      {
        title: '用户名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '用户密码',
        dataIndex: 'password',
        key: 'password',
      },
      {
        title: '用户描述',
        dataIndex: 'describe',
        key: 'describe',
      },
      {
        title: '用户当前角色',
        dataIndex: 'role',
        key: 'role',
        render: (text, record) => (
          <span onClick={this.showEditProductModal.bind(this, record)}>
              <a>{text}</a>
            </span>
        ),
      },
      {
        title: '用户最近操作日志',
        dataIndex: 'log',
        key: 'log',
        render: (text, record) => (
          <Tag color='#108ee9'>
            查看
          </Tag>
        ),
      },
      {
        title: '最近登录时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
              <a onClick={this.showEditProductModal.bind(this, record)}>设置权限</a>
              <Divider type="vertical" />
              <a>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title={"确定删除该条数据?"} onConfirm={null}>
                <a>删除</a>
              </Popconfirm>
            </span>
        ),
      },
    ];
    return (
      <div style={{ background: '#fff'}}>
        <Card title="用户列表" bordered={false}>
          <div style={{marginBottom: 12}}>
            <Button type="primary" icon="plus" >
              新建
            </Button>
          </div>
          <Table columns={columns}  dataSource={authList}
                 loading={this.state.tableLoading}
          />
          <SetAuthModal
            visible={this.state.visible}
            confirmLoading={this.state.confirmLoading}
            handleOk={this.onOk}
            handleCancel={this.onCancel}></SetAuthModal>
        </Card>
      </div>
    );
  };
  showEditProductModal = (record) => {
    console.log(record);
    this.setState({
      visible: true,
    });
  };
  onOk = (values) => {
    this.setState({
      confirmLoading: true,
    });
    console.log('onOk', values);
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };
  onCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthSet)
