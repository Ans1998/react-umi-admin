import styles from './index.css'
import React, {Component} from 'react'

import moment from 'moment';

import { connect } from 'dva';

import {
  Table, Divider, Tag, Popconfirm, Icon, Button,
} from 'antd';

import SearchForm from './components/SearchForm';
import AddForm from './components/AddForm';

import EditForm from './components/EditForm';
// 商品状态排版
const productStateRender = (productState) => {
  switch (productState) {
    case '0':
      return (
        <Tag color='#f50'>
          异常
        </Tag>
      );
    case '1':
      return (
        <Tag color='green'>
          正常
        </Tag>
      );
    case '2':
      return (
        <Tag color="#87d068">
          已收货
        </Tag>
      );
  }
};
// 商品总价排序
const productSumSorter = (one, two) => {
  // 循环对比
  // console.log('one', one)
  // console.log('two', two)
  return one.productSum - two.productSum
};

class BasicsList extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      // 表格配置
      columns: [
        {
          title: '商品名称',
          dataIndex: 'productName',
          key: 'productName',
          render: text => <a>{text}</a>,
        },
        {
          title: '商品总价',
          dataIndex: 'productSum',
          key: 'productSum',
          sorter: productSumSorter,
          // render: text => <a>{text}</a>,
        },
        {
          title: '商品描述',
          dataIndex: 'productDescribe',
          key: 'productDescribe',
          // render: text => <a>{text}</a>,
        },
        {
          title: '商品发货地址',
          dataIndex: 'productSendAddress',
          key: 'productSendAddress',
          // render: text => <a>{text}</a>,
        },
        {
          title: '商品发货时间',
          dataIndex: 'productSendTime',
          sorter: (one, two) => moment(one.productSendTime, "YYYY-MM-DD HH:mm:ss").valueOf() - moment(two.productSendTime, "YYYY-MM-DD HH:mm:ss").valueOf(),
          key: 'productSendTime',
          // render: text => <a>{text}</a>,
        },
        {
          title: '商品收货地址',
          dataIndex: 'productPlaceOfReceipt',
          key: 'productPlaceOfReceipt',
          // render: text => <a>{text}</a>,
        },
        {
          title: '商品收货时间',
          dataIndex: 'productTimeOfReceipt',
          sorter: (one, two) => moment(one.productTimeOfReceipt, "YYYY-MM-DD HH:mm:ss").valueOf() - moment(two.productTimeOfReceipt, "YYYY-MM-DD HH:mm:ss").valueOf(),
          key: 'productTimeOfReceipt',
          // render: text => <a>{text}</a>,
        },
        {
          title: '商品状态',
          key: 'productState',
          dataIndex: 'productState',
          filters: [{ text: '正常', value: '1' }, { text: '异常', value: '0' }, { text: '已收货', value: '2' }],
          onFilter: (val, item) => {
            return item.productState === val
            // console.log('val', val)
            // console.log('item', item)
          },
          render: (productState) => (
            <span>
        {
          productStateRender(productState)
        }
      </span>
          ),
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
              <a>详情</a>
              <Divider type="vertical" />
              <a onClick={this.showEditProductModal.bind(this, record)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title={"确定删除该条数据?"} onConfirm={this.handleTableDelete.bind(this, record)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          ),
        },
      ],
      data: [
        {
          key: '0',
          productName: '测试商品',
          productSum: 1455,
          productDescribe: '测试商品的描述',
          productSendAddress: '广州市',
          productSendTime: '2019-10-7 14:00:00',
          productPlaceOfReceipt: '佛山市',
          productTimeOfReceipt: '2019-10-8 12:30:00',
          productState: '1',
          // productState: ['normal', 'abnormal', 'receive'],
        },
        {
          key: '1',
          productName: '测试商品1',
          productSum: 1405,
          productDescribe: '测试商品的描述1',
          productSendAddress: '广州市1',
          productSendTime: '2019-10-7 14:00:00',
          productPlaceOfReceipt: '佛山市1',
          productTimeOfReceipt: '2019-10-8 12:30:00',
          productState: '0',
        },
        {
          key: '2',
          productName: '测试商品2',
          productSum: 14005,
          productDescribe: '测试商品的描述2',
          productSendAddress: '广州市2',
          productSendTime: '2019-10-7 14:00:02',
          productPlaceOfReceipt: '佛山市2',
          productTimeOfReceipt: '2019-10-8 12:30:00',
          productState: '0',
        }
      ],
      loadingShow: false,
      selectedRowList: [],

      // 步骤条
      item: {},
      visible: false,
      // xxx
      expand: false,
    };
  }
// 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loadingShow: false
      })
    }, 1800)
  }
  // 组件卸载
  componentWillUnmount() {
  }
  // 编辑按钮
  showEditProductModal = (record) => {
    console.log('showEditProductModal', record);
    this.setState({
      visible: true,
      item: record
    });
  };
  // 删除按钮
  handleTableDelete = (record) => {
    console.log('showDeleteProductModal', record)
  };
  // 分页按钮
  handleTablePaginationChange = (page, pageSize) => {
    console.log('handleTablePaginationChange', page, pageSize)
  };
  handleTablePaginationSizeChange = (current, size) => {
    console.log('handleTablePaginationSizeChange', current, size)
  };
  render() {
    const rowSelection = {
        selectedRowKeys: this.state.selectedRowList,
        onChange: (selectedRowKeys, selectedRows) => {
          this.setState({
            selectedRowList: selectedRowKeys,
            selectedSum: selectedRows.length
          });
        }
    };
    return (
      <div style={{ background: '#fff', padding: 12}}>

        <SearchForm></SearchForm>

        <EditForm visible={this.state.visible} item={this.state.item} handleSubmit={this.onSubmit} handleCancel={this.onCancel}></EditForm>

        <div style={{marginBottom: 12}}>
          <Button type="primary" icon="plus" >
            新建
          </Button>
        </div>
        {/*<AddForm></AddForm>*/}

        <div className={styles.alertInfo}>
          <span><Icon style={{color: '#1890ff'}} theme='filled' type="exclamation-circle" /></span>
          <span style={{marginLeft: 10}}>已选择
            <a style={{margin: '0 5px'}}>{this.state.selectedRowList.length}</a>
            项</span>
           <a style={{marginLeft: 10}} onClick={() => {
             this.setState({
               selectedRowList: []
             })
           }}>清空</a>
        </div>

        <Table
          pagination={{
            total: 50,
            defaultPageSize: 10,
            pageSizeOptions: ['10', '20'],
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: this.handleTablePaginationChange,
            onShowSizeChange: this.handleTablePaginationSizeChange
          }}
          rowSelection={rowSelection}
          columns={this.state.columns}
          dataSource={this.state.data}
          loading={this.state.loadingShow} />

      </div>
    );
  };
  // 完成
  onSubmit = (e) => {
    console.log('---完成---', e);
    this.setState({
      visible: false,
    });
  };
  // 取消
  onCancel = () => {
    console.log('基础列表触发');
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

export default connect(mapStateToProps, mapDispatchToProps)(BasicsList)
