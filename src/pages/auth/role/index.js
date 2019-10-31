// import styles from './index.css'
import React, {Component} from 'react'

import { connect } from 'dva';
import { Card, Divider, Popconfirm, Table, Button, message, Tag } from 'antd';
import ConfigAuthModal from './components/ConfigAuthModal'
import FormModal from './components/FormModal'
import { sleep } from '@utils/sleep'
class AuthList extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      tableLoading: true,
      queryAuthRole: [],
      roleItem: {}, // 保存角色信息
      roleItemMenuId: [],
      showConfigAuthModal: false,
      showConfigAuthLoading: false,
      formModalTitle: '',
      formModelItem: {name: '', describe: '', key: '0', status: 0},
      showFormModal: false,
      showFormModalLoading: false
    };
  }
  // 组件渲染之前
  componentWillMount() {
    // this.props.getUserInfo()
  }
  // 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
    this.props.queryRole(this);
  }
  // 组件卸载
  componentWillUnmount() {
  }

  render() {
    const { roleList, menuList } = this.props;
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '角色描述',
        dataIndex: 'describe',
        key: 'describe',
      },
      {
        title: '角色状态',
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
              <a onClick={this.showConfigAuthModal.bind(this, record)}>配置权限</a>
             <Divider type="vertical" />
             <a onClick={this.showEditorModal.bind(this, record)}>编辑</a>
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
        <Card title="角色列表" bordered={false}>

          <div style={{marginBottom: 12}}>
            <Button type="primary" icon="plus" onClick={this.handleTableAdd}>
              新建
            </Button>
          </div>

          <Table columns={columns}  dataSource={roleList}
                 loading={this.state.tableLoading}
          />
          <ConfigAuthModal
            visible={this.state.showConfigAuthModal}
            menuList={menuList}
            roleItem={this.state.roleItemMenuId}
            confirmLoading={this.state.showConfigAuthLoading}
            handleOk={this.onConfigAuthOk}
            handleCancel={this.onCancel}
            handleCheck={this.onCheck}
          ></ConfigAuthModal>
          <FormModal
            title={this.state.formModalTitle}
            item={this.state.formModelItem}
            visible={this.state.showFormModal}
            confirmLoading={this.state.showFormModalLoading}
            handleOk={this.onFormModalOk}
            handleCancel={this.onCancel}
          ></FormModal>
        </Card>
      </div>
    );
  };
  showConfigAuthModal = (record) => {
    console.log(record);
    this.setState({
      roleItem: record
    });
    let form = {
      role_id: record.id
    };
    message.loading('正在加载', 0);
    this.props.queryAuthRole(form, this);
  };
  showEditorModal = (record) => {
    console.log(record);
    this.setState({
      formModalTitle: '编辑角色',
      formModelItem: record,
      showFormModal: true,
    });
  };
  handleTableAdd = () => {
    console.log('添加');
    this.setState({
      formModalTitle: '添加角色',
      formModelItem: {name: '', describe: '', key: '0'},
      showFormModal: true,
    });
  };
  handleTableDelete = (record) => {
    message.loading('正在加载', 0);
    console.log(record);
    let form = {
      id: record.id
    };
    console.log(form);
    this.props.deleteRole(form, this)
  };
  onCheck = (values) => {
    this.setState({
      roleItemMenuId: values
    });
  };
  onConfigAuthOk = () => {
    // message.loading('正在加载', 0);
    let {roleItem, roleItemMenuId, queryAuthRole} = this.state;
    // console.log(roleItem, roleItemMenuId, queryAuthRole);
    let roleArr = {
      add: [],
      detele: [],
      editor: []
    };
    queryAuthRole.forEach((item) => {
      if (roleItemMenuId.indexOf(item.menu_id.toString()) === -1) {
        roleArr.detele.push(item)
      } else {
        roleArr.editor.push(item)
      }
    });

    let queryArr = [];
    queryAuthRole.forEach((item) => {
      queryArr.push(item.menu_id.toString());
    });

    roleItemMenuId.forEach((item) => {
      if (queryArr.indexOf(item) === -1) {
        let obj = {
          menu_id: item,
          role_id: roleItem.id
        };
        roleArr.add.push(obj)
      }
    });
    // console.log(roleArr);
    let form = {
      role_id: roleItem.id,
      menu_arr: JSON.stringify(roleArr),
    };
    console.log(form);
    this.setState({
      showConfigAuthLoading: true,
    });
    this.props.configAuthRole(form, this)
  };
  onFormModalOk = (values, propsForm) => {
    message.loading('正在加载', 0);
    console.log(values);
    this.setState({
      showFormModalLoading: true,
    });
    if ('id' in values) {
      this.props.editorRole(values, this, propsForm)
    } else {
      this.props.addRole(values, this, propsForm)
    }
  };
  onCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      showConfigAuthModal: false,
      showFormModal: false
    });
  };
}

const mapStateToProps = (state, props) => {
  return {
    roleList: state.globalModel.data.roleList,
    menuList: state.globalModel.data.menuList
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    queryMenuAction: () => {
      const action = {
        type: 'globalModel/queryMenuAction',
        payload: { filter: 'true' },
        callback: (res) => {
          console.log('----callback---', res);
        }
      };
      dispatch(action);
    },
    queryRole: (that) => {
      const action = {
        type: 'globalModel/queryRoleAction',
        callback: (res) => {
          console.log(res);
          if (res.status === 'success') {
            that.setState({
              tableLoading: false
            });
            that.props.queryMenuAction();
          } else {
            message.destroy();
            message.error(res.msg)
          }
        }
      };
      dispatch(action)
    },
    addRole: (form, that, propsForm) => {
      const action = {
        type: 'authRoleModel/addRoleAction',
        payload: form,
        callback: async(res) => {
          console.log(res);
          await sleep(1800);
          message.destroy();
          if (res.status === 'success') {
            that.setState({
              showFormModal: false,
              showFormModalLoading: false,
            });
            message.success(res.msg);
            that.props.queryRole(that);
            propsForm.resetFields();
          } else {
            message.error(res.msg)
          }
        }
      };
      dispatch(action)
    },
    deleteRole: (form, that) => {
      const action = {
        type: 'authRoleModel/deleteRoleAction',
        payload: form,
        callback: async (res) => {
          console.log(res);
          await sleep(1800);
          message.destroy();
          if (res.status === 'success') {
            message.success(res.msg);
            that.props.queryRole(that)
          } else {
            message.error(res.msg)
          }
        }
      };
      dispatch(action)
    },
    editorRole: (form, that, propsForm) => {
      const action = {
        type: 'authRoleModel/editorRoleAction',
        payload: form,
        callback: async (res) => {
          console.log(res);
          await sleep(1800);
          message.destroy();
          if (res.status === 'success') {
            that.setState({
              showFormModal: false,
              showFormModalLoading: false,
            });
            message.success(res.msg);
            that.props.queryRole(that);
            propsForm.resetFields();
          } else {
            message.error(res.msg)
          }
        }
      };
      dispatch(action)
    },
    queryAuthRole: (form, that) => {
      const action = {
        type: 'authRoleModel/queryAuthRoleAction',
        payload: form,
        callback: (res) => {
          console.log(res);
          message.destroy();
          if (res.status === 'success') {
            let arr = [];
            res.data.forEach((item) => {
              arr.push(item.menu_id.toString())
            });
            that.setState({
              queryAuthRole: res.data,
              roleItemMenuId: arr,
              showConfigAuthModal: true,
            });
          } else {
            message.error(res.msg)
          }
        }
      };
      dispatch(action)
    },
    configAuthRole: (form, that) => {
      const action = {
        type: 'authRoleModel/configAuthRoleAction',
        payload: form,
        callback: async(res) => {
          console.log(res);
          await sleep(1800);
          message.destroy();
          if (res.status === 'success') {
              that.setState({
                showConfigAuthModal: false,
                showConfigAuthLoading: false,
              });
            message.success(res.msg)
          } else {
            message.error(res.msg)
          }
        }
      };
      dispatch(action)
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthList)
