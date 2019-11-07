// import styles from './index.css'
import React, {Component} from 'react'
import { connect } from 'dva';
import EditForm from './components/EditForm';
import AddForm from './components/AddForm'
import { Card, Divider, Popconfirm, Table, message, Button, Tag, Icon } from 'antd';
import { sleep } from '@utils/sleep'
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import router from 'umi/router';
class MenuList extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      tableLoading: true,

      editFormLoading: false,
      editFormVisible: false,
      menuItem: {},

      addFormVisible: false,
      addFormLoading: false
    };
  }
// 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
    this.props.queryMenuAction(this)
  }
  // 组件卸载
  componentWillUnmount() {
  }
  render() {
    const columns = [
      {
        title: '菜单名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '菜单路由',
        dataIndex: 'url',
        key: 'url',
        render: (text, record) => (
          <a onClick={() => {
            router.push(text)
          }}>{text}</a>
        )
      },
      {
        title: '菜单图标',
        dataIndex: 'icon',
        key: 'icon',
        render: (text, record) => (
          text ? <Icon onClick={this.showEditProductModal.bind(this, record)} type={text}></Icon> : null
        )
      },
      {
        title: '菜单状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => (
          text === 1 ? (<Tag color="#87d068">开启</Tag>) : (<Tag color="#f50">关闭</Tag>)
        ),
      },
      {
        title: '最近编辑时间',
        dataIndex: 'update_time',
        key: 'update_time',
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
    const {menuList} = this.props;
    return (
      <div style={{ background: '#fff'}}>
        <Card title="菜单列表" bordered={false}>
          <div style={{marginBottom: 12}}>
            <Button type="primary" icon="plus" onClick={this.handleTableAdd}>
              新建
            </Button>
          </div>
          <Table columns={columns}  dataSource={menuList}
                 loading={this.state.tableLoading}
          />
        </Card>
        <AddForm
          menuList={menuList}
          handleSubmit={this.onAddFormSubmit}
          handleCancel={this.onCancel}
          visible={this.state.addFormVisible}
          loading={this.state.addFormLoading}
          ></AddForm>
        <EditForm
          handleSubmit={this.onEditFormSubmit}
          handleCancel={this.onCancel}
          visible={this.state.editFormVisible}
          loading={this.state.editFormLoading}
          menuItem={this.state.menuItem}
        ></EditForm>
      </div>
    );
  };
  // filterMenu(data) {
  //   data.map((item) => {
  //     item.label = item.name;
  //     item.value = item.id;
  //     if ('children' in item) {
  //       this.filterMenu(item.children)
  //     }
  //   })
  // };
  handleTableAdd = () => {
    console.log('handleTableAdd');
    this.setState({
      addFormVisible: true
    });
  };
  // 编辑按钮
  showEditProductModal = (record) => {
    console.log('showEditProductModal', record);
    this.setState({
      editFormVisible: true,
      menuItem: record
    });
  };
  // 删除按钮
  handleTableDelete = (record) => {
    console.log('showDeleteProductModal', record);
    let form = {
      id: record.id
    };
    // console.log('子菜单---', form);
    message.loading('正在加载', 0);
    this.props.deleteMenuAction(form, this)

  };
  // 模态框取消
  onCancel = () => {
    this.setState({
      editFormVisible: false,
      addFormVisible: false
    })
  };
  onEditFormSubmit = (values, propsForm) => {
    this.setState({
      editFormLoading: true
    });
    // console.log('子菜单---', values);
    message.loading('正在加载', 0);
    this.props.editorMenuAction(values, propsForm, this)
  };
  onAddFormSubmit = (values, propsForm) => {
    this.setState({
      addFormLoading: true
    });
    console.log('onAddFormSubmit', values);
    message.loading('正在加载', 0);
    this.props.addMenuAction(values, propsForm, this)
  }
}


const mapStateToProps = (state, props) => {
  return {
    menuList: state.globalModel.data.menuList
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    queryMenuAction: (that) => {
      const action = {
        type: 'globalModel/queryMenuAction',
        payload: { filter: 'true' },
        callback: (res) => {
          that.setState({
            tableLoading: false
          });
          console.log('----callback---', res);
        }
      };
      dispatch(action);
    },
    addMenuAction: (form, propsForm, that) => {
      const action = {
        type: 'menuListModel/addMenuAction',
        payload: form,
        callback: async (res) => {
          await sleep(1800);
          console.log('editorMenuAction----callback---', res);
          that.setState({
            addFormVisible: false,
            addFormLoading: false
          });
          propsForm.resetFields();
          if (res.status === 'success') {
            message.destroy();
            message.success(res.msg);
            that.props.queryMenuAction(that);
          } else {
            message.destroy();
            message.success(res.msg)
          }
        }
      };
      dispatch(action);
    },
    editorMenuAction: (form, propsForm, that) => {
      const action = {
        type: 'menuListModel/editorMenuAction',
        payload: form,
        callback: async (res) => {
          await sleep(1800);
          console.log('editorMenuAction----callback---', res);
          that.setState({
            editFormVisible: false,
            editFormLoading: false
          });
          propsForm.resetFields();
          if (res.status === 'success') {
            message.destroy();
            message.success(res.msg);
            that.props.queryMenuAction(that);
          } else {
            message.destroy();
            message.success(res.msg)
          }
        }
      };
      dispatch(action);
    },
    deleteMenuAction: (form, that) => {
      const action = {
        type: 'menuListModel/deleteMenuAction',
        payload: form,
        callback: async (res) => {
          await sleep(1800);
          console.log('editorChildMenuAction----callback---', res);
          if (res.status === 'success') {
            message.destroy();
            message.success(res.msg);
            that.props.queryMenuAction(that);
          } else {
            message.destroy();
            message.success(res.msg)
          }
        }
      };
      dispatch(action);
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuList)
