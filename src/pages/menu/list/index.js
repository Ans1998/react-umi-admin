// import styles from './index.css'
import React, {Component} from 'react'

import { connect } from 'dva';
import EditForm from './components/EditForm';
import { Card, Divider, Popconfirm, Table } from 'antd';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class MenuList extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      menuList: [
        {
          key: '1',
          menuTime: '2019-10-21 15:00:00',
          menuName: '首页'
        },
        {
          key: '2',
          menuName: '表单管理',
          menuTime: '2019-10-20 15:00:00',
          children: [
            {
              key: '2-1',
              menuName: '基础表单',
              menuTime: '2019-10-21 15:00:00',
              children: [
                {
                  key: '2-1-1',
                  menuTime: '2019-10-21 15:00:00',
                  menuName: '基础表单-1'
                }
              ]
            },
            {
              key: '2-2',
              menuTime: '2019-10-21 15:00:00',
              menuName: '高级表单'
            }
          ]
        },
        {
          key: '3',
          menuTime: '2019-10-10 15:50:00',
          menuName: '测试页'
        },
      ],
      visible: false,
      menuItem: {}
    };
  }
// 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
  }
  // 组件卸载
  componentWillUnmount() {
  }
  render() {
    const columns = [
      {
        title: '菜单名称',
        dataIndex: 'menuName',
        key: 'menuName',
      },
      {
        title: '最近编辑时间',
        dataIndex: 'menuTime',
        key: 'menuTime',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
              <a onClick={this.showEditProductModal.bind(this, record)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title={"确定删除该条数据?"} onConfirm={this.handleTableDelete.bind(this, record)}>
                <a>删除</a>
              </Popconfirm>
            </span>
        ),
      },
    ];
    return (
      <div style={{ background: '#fff'}}>
        <Card title="菜单列表" bordered={false}>
          <Table columns={columns}  dataSource={this.state.menuList} />
        </Card>
        <EditForm handleSubmit={this.onSubmit} handleCancel={this.onCancel} visible={this.state.visible} menuItem={this.state.menuItem}></EditForm>
      </div>
    );
  };
  // 编辑按钮
  showEditProductModal = (record) => {
    console.log('showEditProductModal', record);
    this.setState({
      visible: true,
      menuItem: record
    });
  };
  // 删除按钮
  handleTableDelete = (record) => {
    console.log('showDeleteProductModal', record)
  };
  // 模态框取消
  onCancel = () => {
    this.setState({
      visible: false
    })
  };
  onSubmit = (values) => {
    console.log('onSubmit', values)
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuList)
