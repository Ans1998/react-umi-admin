import React, {Component} from 'react'

// import styles from './index.css';
import { connect } from 'dva';
import { Tree, Modal } from 'antd';

const { TreeNode } = Tree;
const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];
class ConfigAuthModal extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: [], // （受控）展开指定的树节点
      autoExpandParent: true, // 是否自动展开父节点
      checkedKeys: ['1', '2'], // 默认选中
    };
  }
  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.name} key={item.key} dataRef={item} />;
    });
  render() {
    const {visible, menuList, confirmLoading, handleCancel} = this.props;
    return (
      <div>
        <Modal
          title="权限配置"
          visible={visible}
          onOk={this.handleSubmit}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Tree
            checkable
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
          >
            {this.renderTreeNodes(menuList)}
          </Tree>
        </Modal>
      </div>
    );
  }
  onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };
  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };
  handleSubmit = () => {
    console.log(this.state.checkedKeys)
    // this.props.handleOk()
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

export default connect(mapStateToProps, mapDispatchToProps)(ConfigAuthModal)
