// import styles from './index.css'
import React, {Component} from 'react'

import { connect } from 'dva';
import { Button, Card, Divider, Popconfirm, Table, Tag, message } from 'antd';
import SetAuthModal from './components/SetAuthModal'
import FormModal from './components/FormModal'
import { sleep } from '@utils/sleep'
const mapStateToProps = (state, props) => {
  return {
    roleList: state.globalModel.data.roleList,
    userList: state.authUserModel.data.userList,
  }
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    dispatch,
    queryUser: (that) => {
        const action = {
          type: 'authUserModel/queryUserAction',
          callback: async(res) => {
            console.log(res);
            // await sleep(1800);
            if (res.status === 'success') {
              that.setState({
                tableLoading: false
              });
              that.props.queryRole()
              // message.success(res.msg)
            } else {
              message.destroy();
              message.error(res.msg)
            }
          }
        };
        dispatch(action)
    },
    queryRole: () => {
      const action = {
        type: 'globalModel/queryRoleAction',
        callback: (res) => {
          console.log(res);
          if (res.status === 'success') {
          } else {
            message.destroy();
            message.error(res.msg)
          }
        }
      };
      dispatch(action)
    },
    addUser: (form, that, propsForm) => {
      const action = {
        type: 'authUserModel/addUserAction',
        payload: form,
        callback: async(res) => {
          console.log(res);
          await sleep(1800);
          message.destroy();
          if (res.status === 'success') {
            that.props.queryUser(that);
            that.setState({
              formModalVisible: false,
              formModalConfirmLoading: false,
            });
            message.success(res.msg);
            propsForm.resetFields();
          } else {
            message.error(res.msg)
          }
        }
      };
      dispatch(action)
    },
    editorUser: (form, that, propsForm) => {
      const action = {
        type: 'authUserModel/editorUserAction',
        payload: form,
        callback: async(res) => {
          console.log(res);
          await sleep(1800);
          message.destroy();
          if (res.status === 'success') {
            that.props.queryUser(that);
              that.setState({
                formModalVisible: false,
                formModalConfirmLoading: false,
              });
            message.success(res.msg);
            propsForm.resetFields();
          } else {
            message.error(res.msg)
          }
        }
      };
      dispatch(action)
    },
    addSetAuthUser: (form, that, propsForm) => {
      const action = {
        type: 'authUserModel/addSetAuthUserAction',
        payload: form,
        callback: async(res) => {
          console.log(res);
          await sleep(1800);
          message.destroy();
          if (res.status === 'success') {
            that.props.queryUser(that);
            that.setState({
              setAuthVisible: false,
              setAuthConfirmLoading: false,
            });
            message.success(res.msg);
            propsForm.resetFields();
          } else {
            message.error(res.msg)
          }
        }
      };
      dispatch(action)
    },
    editorSetAuthUser: (form, that, propsForm) => {
      const action = {
        type: 'authUserModel/editorSetAuthUserAction',
        payload: form,
        callback: async(res) => {
          console.log(res);
          await sleep(1800);
          message.destroy();
          if (res.status === 'success') {
            that.props.queryUser(that);
            that.setState({
              setAuthVisible: false,
              setAuthConfirmLoading: false,
            });
            message.success(res.msg);
            propsForm.resetFields();
          } else {
            message.error(res.msg)
          }
        }
      };
      dispatch(action)
    }
  }
};
@connect(mapStateToProps, mapDispatchToProps)
class AuthUser extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      tableLoading: true,
      // 设置权限
      setAuthVisible: false,
      setAuthConfirmLoading: false,
      setAuthModalItem: {},
      // 角色
      title: '',
      formModalItem: { key: '0', u_name: '', u_password: '' , u_status: 0},
      formModalVisible: false,
      formModalConfirmLoading: false,
    };
  }
  // 组件渲染之前
  componentWillMount() {
    // this.props.getUserInfo()
  }
  // 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
   this.props.queryUser(this)
  }
  // 组件卸载
  componentWillUnmount() {
  }

  render() {
    const {setAuthVisible, setAuthConfirmLoading,
      formModalVisible, formModalConfirmLoading, formModalItem, title, setAuthModalItem} = this.state;
    const { userList, roleList } = this.props;
    const columns = [
      {
        title: '用户名称',
        dataIndex: 'u_name',
        key: 'u_name',
      },
      {
        title: '用户密码',
        dataIndex: 'u_password',
        key: 'u_password',
      },
      {
        title: '用户状态',
        dataIndex: 'u_status',
        key: 'u_status',
        render: (text, record) => (
          text === 1 ? (<Tag color="#87d068">开启</Tag>) : (<Tag color="#f50">关闭</Tag>)
        ),
      },
      {
        title: '用户当前角色',
        dataIndex: 'r_name',
        key: 'r_name',
        render: (text, record) => (
          <span onClick={this.showSetAuthModal.bind(this, record)}>
              <a>{text}</a>
            </span>
        ),
      },
      {
        title: '用户最近操作日志',
        key: 'log',
        render: (text, record) => (
          <Tag color='#108ee9'>
            查看
          </Tag>
        ),
      },
      {
        title: '最近登录时间',
        dataIndex: 'u_update_time',
        key: 'u_update_time',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
              <a onClick={this.showSetAuthModal.bind(this, record)}>设置权限</a>
              <Divider type="vertical" />
              <a onClick={this.showFormModal.bind(this, record)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title={"确定删除该条数据?"} onConfirm={this.handleTableDelete.bind(this,record)}>
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
            <Button type="primary" icon="plus" onClick={this.handleTableAdd}>
              新建
            </Button>
          </div>
          <Table columns={columns}  dataSource={ userList }
                 loading={this.state.tableLoading}
          />
          <SetAuthModal
            roleList={roleList}
            item={setAuthModalItem}
            visible={setAuthVisible}
            confirmLoading={setAuthConfirmLoading}
            handleOk={this.onSetAuthOk}
            handleCancel={this.onCancel}></SetAuthModal>
          <FormModal
            title={title}
            item={formModalItem}
            visible={formModalVisible}
            confirmLoading={formModalConfirmLoading}
            handleOk={this.onFormModalOk}
            handleCancel={this.onCancel}>
          </FormModal>
        </Card>
      </div>
    );
  };
  handleTableDelete = (record) => {
    console.log(record);
    const { dispatch } = this.props;
    let form = {
      id: record.u_id
    };
    message.loading('正在加载', 0);
    const action = {
      type: 'authUserModel/deleteUserAction',
      payload: form,
      callback: async(res) => {
        console.log(res);
        await sleep(1800);
        message.destroy();
        if (res.status === 'success') {
          message.success(res.msg);
          this.props.queryUser(this)
        } else {
          message.error(res.msg)
        }
      }
    };
    dispatch(action)
  };
  handleTableAdd = () => {
    this.setState({
      title: '添加角色',
      formModalItem: { key: '0', u_name: '', u_password: '' , u_status: 0},
      formModalVisible: true,
    });
  };
  showSetAuthModal = (record) => {
    console.log(record);
    if (record.role_id) {
      record.role_id = record.role_id.toString()
    }
    this.setState({
      setAuthModalItem: record,
      setAuthVisible: true,
    });
  };
  showFormModal = (record) => {
    console.log(record);
    this.setState({
      title: '编辑角色',
      formModalItem: record,
      formModalVisible: true,
    });
  };
  onSetAuthOk = (values, propsForm) => {
    this.setState({
      setAuthConfirmLoading: true,
    });
    message.loading('正在加载', 0);
    // console.log('onSetAuthOk', values);
    if (values.id) {
      this.props.editorSetAuthUser(values,this, propsForm)
    } else {
      this.props.addSetAuthUser(values,this, propsForm)
    }
  };
  onFormModalOk = (values, propsForm) => {
    message.loading('正在加载', 0);
    this.setState({
      formModalConfirmLoading: true,
    });
    // console.log('onFormModalOk', values);
    if ('id' in values) {
      this.props.editorUser(values, this, propsForm)
    } else {
      this.props.addUser(values, this, propsForm)
    }
  };
  onCancel = () => {
    this.setState({
      setAuthVisible: false,
      formModalVisible: false,
    });
  };
}

export default AuthUser
