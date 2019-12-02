import styles from './index.css'
import React, {Component} from 'react'
import { connect } from 'dva';
import {
  Table, Icon, Button, message, Tree
} from 'antd';
import { sleep } from '@utils/sleep'
import EditForm from './components/EditForm';

const { TreeNode } = Tree;
// 排序
const timeSorter = (one, two) => {
  // 循环对比
  // console.log('one', one)
  // console.log('two', two)
  return one.name - two.name
};

class captureFileList extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      // 表格配置
      columns: [
        {
          title: '文件名',
          dataIndex: 'name',
          sorter: timeSorter,
          key: 'name',
          // render: text => <a>{text}</a>,
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
              {
                record.name.indexOf('.csv') !== -1 ? (<a onClick={this.showEditProductModal.bind(this, record)}>查看</a>) : null
              }
            </span>
          ),
        },
      ],
      tableLoadingShow: true,

      selectedRows: [],
      selectedRowKeys: [],

      // 步骤条
      item: {},
      visible: false,
      // xxx
      expand: false,
    };
  }
// 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
    this.props.queryCsvFile(this)
  }
  // 组件卸载
  componentWillUnmount() {
  }
  // 查看按钮
  showEditProductModal = (record) => {
    console.log('showEditProductModal', record);
    this.setState({
      visible: true,
      item: record
    });
  };
  dataFiltration = (data) => {
    let catalogueForm = [];
    data.forEach((item) => {
      let catalogueObj = {
        name: '',
        file: []
      };
      if (item.key.toString().indexOf('-') !== -1) {
      } else {
        catalogueObj.name = item.name;
        let catalogueId = item.key.toString();
        data.forEach((twoItem) => {
          if (twoItem.key.toString().indexOf('-') !== -1) {
            let fileId = twoItem.key.toString().substr(0, 1);
            if (catalogueId === fileId) {
              let fileObj = {
                name: twoItem.name
              };
              catalogueObj.file.push(fileObj);
            }
          }
        });
        catalogueForm.push(catalogueObj);
      }
    });
    console.log(catalogueForm);
    return catalogueForm
  };
  // 删除按钮
  handleTableDelete = () => {
    console.log('showDeleteProductModal', this.state.selectedRows);
    let form = this.dataFiltration(this.state.selectedRows);
  };
  // 进库按钮
  handleTablePushStorage = () => {
    console.log('handleTablePushStorage', this.state.selectedRows);
    let form = this.dataFiltration(this.state.selectedRows);
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
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows);
        this.setState({
          selectedRows: selectedRows,
          selectedRowKeys: selectedRowKeys,
        });
      }
    };
    const {csvFileList} = this.props;
    console.log('csvFileList----', csvFileList);
    const {visible, item, columns, tableLoadingShow, selectedRowKeys, selectedRows} = this.state;
    return (
      <div style={{ background: '#fff', padding: 12}}>


        <EditForm visible={visible} item={item} handleSubmit={this.onSubmit} handleCancel={this.onCancel}></EditForm>

        <div style={{marginBottom: 12}}>
          <Button type="primary" disabled={selectedRows.length > 0 ? false : true} onClick={this.handleTablePushStorage}>
            进库
          </Button>
          <Button onClick={this.handleTableDelete} type="primary" disabled={selectedRows.length > 0 ? false : true} style={{marginLeft: '12px'}} >
            删除
          </Button>
        </div>
        <div className={styles.alertInfo}>
          <span><Icon style={{color: '#1890ff'}} theme='filled' type="exclamation-circle" /></span>
          <span style={{marginLeft: 10}}>已选择
            <a style={{margin: '0 5px'}}>{selectedRowKeys.length}</a>
            项</span>
          <a style={{marginLeft: 10}} onClick={() => {
            this.setState({
              selectedRows: [],
              selectedRowKeys: []
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
          columns={columns}
          dataSource={csvFileList.data}
          loading={tableLoadingShow} />

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
    csvFileList: state.captureFileListModel.data.csvFileList
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    queryCsvFile: (that) => {
      const action = {
        type: 'captureFileListModel/queryCsvFileAction',
        callback: async(res) => {
          console.log(res);
          message.destroy();
          that.setState({
            tableLoadingShow: false
          });
          if (res.status === 'success') {
            message.success(res.msg)
          } else {
            message.error(res.msg)
          }
        }
      };
      dispatch(action)
    },
    test: (form, that) => {
      const action = {
        type: 'captureFileListModel/queryCsvFileAction',
        payload: form,
        callback: async(res) => {
          console.log(res);
          await sleep(1800);
          message.destroy();
          if (res.status === 'success') {
            that.setState({
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

export default connect(mapStateToProps, mapDispatchToProps)(captureFileList)
