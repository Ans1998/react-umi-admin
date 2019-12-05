import styles from './index.css'
import React, {Component} from 'react'

import { connect } from 'dva';
import { Table, message, Card, Button, Popconfirm, Tag, Badge, notification } from 'antd';
import { sleep } from '@utils/sleep'
import AddForm from './components/AddForm';

const mapStateToProps = (state, props) => {
  return {
    weiBoRecordList: state.captureDataModels.data.weiBoRecordList
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    queryCaptureRecordAction: (that) => {
      const action = {
        type: 'captureDataModels/getWeiBoQueryRecord',
        callback: async(res) => {
          console.log(res);
          // await sleep(1800);
          // message.destroy();
          that.setState({
            tableLoading: false,
          });
          // if (res.status === 'success') {
          //   message.success(res.msg)
          // } else {
          //   message.error(res.msg)
          // }
        }
      };
      dispatch(action)
    },
    addCaptureDataAction: (form, propsForm, that) => {
      const action = {
        type: 'captureDataModels/getWeiBoCapture',
        payload: form,
        callback: async(res) => {
          console.log(res);
          await sleep(1800);
          message.destroy();
          // notification.info({
          //   message: res.msg,
          //   description: res.data.content,
          //   duration: 4.5
          // });
          that.setState({
            addFormLoading: false,
            addFormVisible: false
          });
          propsForm.resetFields();
          that.props.queryCaptureRecordAction(that);
          if (res.status === 'success') {
            message.success(res.msg);
          } else {
            message.error(res.msg)
          }
        }
      };
      dispatch(action)
    },
    deleteCaptureRecordAction: (form, that) => {
      const action = {
        type: 'captureDataModels/getWeiBoDeleteRecord',
        payload: form,
        callback: async(res) => {
          console.log(res);
          await sleep(1800);
          message.destroy();
          if (res.status === 'success') {
            message.success(res.msg);
            that.props.queryCaptureRecordAction(that)
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
class CaptureData extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '抓取时间',
          dataIndex: 'create_time',
          key: 'create_time',
        },
        {
          title: '完成时间',
          dataIndex: 'update_time',
          key: 'update_time',
        },
        {
          title: '抓取网址',
          dataIndex: 'url',
          key: 'url',
          render: (text, record) => (
            <a>{text}</a>
          ),
        },
        {
          title: '抓取用户前缀',
          dataIndex: 'userIdPrefix',
          key: 'userIdPrefix',
        },
        {
          title: '开始范围',
          dataIndex: 'scopeStart',
          key: 'scopeStart',
        },
        {
          title: '结束范围',
          dataIndex: 'scopeEnd',
          key: 'scopeEnd',
        },
        {
          title: '抓取状态',
          dataIndex: 'status',
          key: 'status',
          render: (text, record) => {
            switch (text) {
              case 0:
                return (<Badge status="processing" text="进行中" />);
              case 1:
                return (<Tag color="#87d068">完成</Tag>);
              case 2:
                return (<Tag color="#f50">异常</Tag>);
            }
          },
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
              <Popconfirm title={"确定删除该条数据?"} onConfirm={this.handleTableDelete.bind(this, record)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          ),
        },
      ],
      tableLoading: true,
      addFormVisible: false,
      addFormLoading: false
    };
  }
  // 组件渲染之前
  componentWillMount() {
    // this.props.getUserInfo()
  }
  // 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
    this.props.queryCaptureRecordAction(this)
  }
  // 组件卸载
  componentWillUnmount() {
  }
  // 表格删除
  handleTableDelete(record) {
    console.log(record);
    message.loading('正在操作', 0);
    let form = {
      id: record.id
    };
    this.props.deleteCaptureRecordAction(form, this);
  }
  // 抓取数据
  handleTableAdd = () => {
    this.setState({
      addFormVisible: true
    })
  };
  // 模态框取消
  onCancel = () => {
    this.setState({
      addFormVisible: false
    })
  };
  onAddFormSubmit = (values, propsForm) => {
    this.setState({
      addFormLoading: true
    });
    console.log('onAddFormSubmit', values);
    message.loading('正在加载', 0);
    this.props.addCaptureDataAction(values, propsForm, this)
  };
  render() {
    const {columns, tableLoading} = this.state;
    const {weiBoRecordList} = this.props;
    return (
      <div style={{ background: '#fff'}}>
        <Card title="爬虫列表" bordered={false}>
          <div style={{marginBottom: 12}}>
            <Button type="primary" icon="plus" onClick={this.handleTableAdd}>
              抓取数据
            </Button>
          </div>
          <Table dataSource={weiBoRecordList} columns={columns} loading={tableLoading} />
        </Card>
        <AddForm
          handleSubmit={this.onAddFormSubmit}
          handleCancel={this.onCancel}
          visible={this.state.addFormVisible}
          loading={this.state.addFormLoading}
        ></AddForm>
      </div>
    );
  };
}
export default CaptureData
