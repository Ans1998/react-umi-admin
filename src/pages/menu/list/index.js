// import styles from './index.css'
import React, {Component} from 'react'
import { connect } from 'dva';
import EditForm from './components/EditForm';
import { Card, Divider, Popconfirm, Table, message } from 'antd';
import { sleep } from '@utils/sleep'
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class MenuList extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      tableLoading: true,
      menuItem: {}
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
      },
      {
        title: '最近编辑时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
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
          <Table columns={columns}  dataSource={menuList}
                 loading={this.state.tableLoading}
          />
        </Card>
        <EditForm handleSubmit={this.onSubmit} handleCancel={this.onCancel} visible={this.state.visible} loading={this.state.loading} menuItem={this.state.menuItem}></EditForm>
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
    console.log('showDeleteProductModal', record);
    if (record.key.indexOf('-') === -1) {
      console.log('删菜单');
      let form = {
        id: record.key
      };
      message.loading('正在加载', 0);
      this.props.deleteMenuAction(form, this)
    } else {
      console.log('删子菜单');
      let id = record.key.split('-');
      console.log(id);
      let src = this.props.menuList.filter((item) => {
        return item.key === id['0'];
      });
      src[0].children.splice(id['1'], 1);
      let form = {
        id: src[0].id,
        child: JSON.stringify(src[0].children)
      };
      // console.log('子菜单---', form);
      message.loading('正在加载', 0);
      this.props.editorChildMenuAction(form, this)
    }

  };
  // 模态框取消
  onCancel = () => {
    this.setState({
      visible: false
    })
  };
  onSubmit = (values) => {
    this.setState({
      loading: true
    });
    if (values.id.indexOf('-') === -1) {
      // console.log('菜单---', values);
      message.loading('正在加载', 0);
      this.props.editorMenuAction(values, this)
    } else {
      let id = values.id.split('-');
      let src = this.props.menuList.filter((item) => {
        return item.key === id['0'];
      });
      // Object.assign()
      src[0].children[id['1']].name =  values.name;
      src[0].children[id['1']].url =  values.url;
      // console.log(src);
      let form = {
        id: src[0].id,
        child: JSON.stringify(src[0].children)
      };
      // console.log('子菜单---', form);
      message.loading('正在加载', 0);
      this.props.editorChildMenuAction(form, this)
    }

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
    editorMenuAction: (form, that) => {
      const action = {
        type: 'menuListModel/editorMenuAction',
        payload: form,
        callback: async (res) => {
          await sleep(1800);
          console.log('editorMenuAction----callback---', res);
          that.setState({
            visible: false,
            loading: false
          });
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
    editorChildMenuAction: (form, that) => {
      const action = {
        type: 'menuListModel/editorChildMenuAction',
        payload: form,
        callback: async (res) => {
          await sleep(1800);
          that.setState({
            visible: false,
            loading: false
          });
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
