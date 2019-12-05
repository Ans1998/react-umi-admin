import styles from './index.css'
import React, {Component} from 'react'
import { connect } from 'dva';
import {
  Spin, Icon, Button, message, Tree, notification
} from 'antd';
import { sleep } from '@utils/sleep'

import JsonForm from './components/JsonForm';

const { TreeNode } = Tree;

class captureFileList extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      loading: false, // 加载
      expandedKeys: [], // （受控）展开指定的树节点
      autoExpandParent: true, // 是否自动展开父节点
      checkedKeys: [], // 默认选中
      // 文件
      jsonFormVisible: false,
      jsonFormItem: {},
      // 进库（可以选择表以及字段但是因为任务太多我就没有往下做后期优化）
    };
  }
// 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
    this.setState({
      loading: true
    });
    this.props.queryCsvFile(this)
  }
  // 组件卸载
  componentWillUnmount() {
  }
  // 查看按钮
  showEditProductModal = (record) => {
    console.log('showEditProductModal', record);
  };
  // 文件数据处理
  dataFiltration = () => {
    let form = [];
    this.state.checkedKeys.forEach((checkedItem) => {
      // 处理没有父id
      if (checkedItem.indexOf('-') !== -1) {
        let fId = checkedItem.substring(0, 1);
        if (this.state.checkedKeys.indexOf(fId) !== -1) {
          // console.log('有父ID')
        } else {
          this.state.checkedKeys.push(fId);
          // console.log('没有父Id')
        }
      }
    });
    this.state.checkedKeys.forEach((checkedItem) => {
      if (checkedItem.indexOf('-') !== -1) {
        // console.log('文件')
      } else {
        // console.log('目录');
        this.props.csvFileList.data.forEach((csvFileItem) => {
          if (checkedItem === csvFileItem.key.toString()) {
            let catalogueObj = {
              name: csvFileItem.name,
              file: []
            };
            form.push(catalogueObj);
          }
        })
      }
    });
    this.state.checkedKeys.forEach((checkedItem) => {
      if (checkedItem.indexOf('-') !== -1) {
        // console.log('文件');
        this.props.csvFileList.data.forEach((csvFileItem) => {
          csvFileItem.children.forEach((childrenItem) => {
            // console.log(childrenItem);
            if (childrenItem.key === checkedItem) {
              let fileObj = {
                name: childrenItem.name
              };
              form.forEach((formItem) => {
                if (formItem.name === csvFileItem.name) {
                  formItem.file.push(fileObj)
                }
              })
              // form.file.push(fileObj)
            }
          })
        })
      } else {
        // console.log('目录');
      }
    });
    // console.log(form);
    return form;
  };
  // 删除按钮
  handleTableDelete = () => {
    console.log(this.state.checkedKeys);
    console.log(this.props.csvFileList.data);
    let res = this.dataFiltration();
    this.setState({
      loading: true
    });
    let obj = {
      form: res
    };
    console.log(obj);
    this.props.deleteCsvFile(obj, this)
  };
  // 进库按钮
  handleTablePushStorage = () => {
    console.log(this.state.checkedKeys);
    console.log(this.props.csvFileList.data);
    this.setState({
      loading: true
    });
    let res = this.dataFiltration();
    let obj = {
      form: res
    };
    console.log(obj);
    this.props.pushStorageCsvFile(obj, this);
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {

        return (
          <TreeNode title={item.name} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (<TreeNode title={item.name} key={item.key} dataRef={item}></TreeNode>);
    });
  render() {

    const {csvFileList} = this.props;
    // console.log('csvFileList----', csvFileList);
    const {
      jsonFormVisible, jsonFormItem,
      loading,
      checkedKeys, expandedKeys, autoExpandParent} = this.state;
    return (
      <Spin spinning={loading}>
        <div style={{ background: '#fff', padding: 12}}>

          <div style={{marginBottom: 12}}>
            <Button type="primary" disabled={checkedKeys.length > 0 ? false : true}  onClick={this.handleTablePushStorage}>
              进库
            </Button>
            <Button onClick={this.handleTableDelete} disabled={checkedKeys.length > 0 ? false : true} type="primary"  style={{marginLeft: '12px'}} >
              删除
            </Button>
          </div>

          <div className={styles.alertInfo}>
            <span><Icon style={{color: '#1890ff'}} theme='filled' type="exclamation-circle" /></span>
            <span style={{marginLeft: 10}}>已选择
              <a style={{margin: '0 5px'}}>{checkedKeys.length}</a>
              项</span>
            {/*<a style={{marginLeft: 10}} onClick={() => {*/}
              {/*this.setState({*/}
                {/*checkedKeys: [],*/}
              {/*})*/}
            {/*}}>清空</a>*/}
          </div>

          <Tree
            checkable
            onExpand={this.onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={(checkedKeys) => {
              this.setState({
                checkedKeys: checkedKeys
              });
              // console.log('onCheck---', checkedKeys);
            }}
            onSelect={(selectedKeys) => {
              this.treeSelect(selectedKeys)
            }}
          >
            {this.renderTreeNodes(csvFileList.data)}
          </Tree>

          <JsonForm
          handleCancel={this.onCancel}
          visible={jsonFormVisible}
          item={jsonFormItem}
          ></JsonForm>
        </div>
      </Spin>
    );
  };
  onCancel = () => {
    this.setState({
      jsonFormVisible: false,
      pushStorageFormVisible: false
    })
  };
  treeSelect = (selectedKeys) => {
    console.log('selectedKeys--', selectedKeys);
    if (selectedKeys[0] && selectedKeys[0].indexOf('-') !== -1) {
      this.setState({
        jsonFormVisible: true,
      });
      let catalogueName = null;
      let fileName = null;
      let id = selectedKeys[0].split("-");
      // console.log(id);
      let fId = id[0];
      this.props.csvFileList.data.forEach((csvFileItem) => {
        if (csvFileItem.key.toString() === fId) {
          catalogueName = csvFileItem.name;
        }
        csvFileItem.children.forEach((childrenItem) => {
          // console.log(childrenItem);
          if (childrenItem.key === selectedKeys[0]) {
            fileName = childrenItem.name
          }
        })
      });
      console.log(catalogueName);
      console.log(fileName);
      let form = {
        catalogueName,
        fileName
      };
      console.log(form);
      this.props.queryLookCsvFile(form, this)
    } else {
      console.log('目录')
    }

  };
  onExpand = expandedKeys => {
    console.log('---onExpand--', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
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
            loading: false
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
    queryLookCsvFile: (form, that) => {
      const action = {
        type: 'captureFileListModel/queryLookCsvFileAction',
        payload: form,
        callback: async(res) => {
          console.log(res);
          // await sleep(1800);
          message.destroy();
          if (res.status === 'success') {
            that.setState({
              jsonFormItem: res.data
            });
            // message.success(res.msg);
          } else {
            // message.error(res.msg)
          }
        }
      };
      dispatch(action)
    },
    deleteCsvFile: (form, that) => {
      const action = {
        type: 'captureFileListModel/deleteCsvFileAction',
        payload: form,
        callback: async(res) => {
          console.log(res);
          await sleep(1800);
          message.destroy();
          that.setState({
            loading: false
          });
          if (res.status === 'success') {
            message.success(res.msg);
            that.props.queryCsvFile(that)
          } else {
            message.error(res.msg)
          }
        }
      };
      dispatch(action)
    },
    pushStorageCsvFile: (form, that) => {
      const action = {
        type: 'captureFileListModel/pushStorageCsvFileAction',
        payload: form,
        callback: async(res) => {
          console.log(res);
          await sleep(1800);
          message.destroy();
          that.setState({
            loading: false
          });
          if (res.status === 'success') {
            message.success(res.msg);
            // notification.info({
            //   message: res.msg,
            //   description: res.data.content,
            //   duration: 4.5
            // });
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
