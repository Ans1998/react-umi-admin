import React, {Component} from 'react'

// import styles from './index.css';
import { connect } from 'dva';
import { Tree, Modal } from 'antd';

const { TreeNode } = Tree;

class ConfigAuthModal extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: [], // （受控）展开指定的树节点
      autoExpandParent: true, // 是否自动展开父节点
      checkedKeys: [], // 默认选中
    };
  }
  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.key} dataRef={item}>
            {/*<TreeNode title={item.add} key={'add' + '-'+ item.key}></TreeNode>*/}
            {/*<TreeNode title={item.delete}  key={'delete' + '-'+ item.key}></TreeNode>*/}
            {/*<TreeNode title={item.editor}  key={'editor' + '-'+ item.key}></TreeNode>*/}
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (<TreeNode title={item.name} key={item.key} dataRef={item}>
        {/*<TreeNode title={item.add} key={'add' + '-'+ item.key}></TreeNode>*/}
        {/*<TreeNode title={item.delete}  key={'delete' + '-'+ item.key}></TreeNode>*/}
        {/*<TreeNode title={item.editor}  key={'editor' + '-'+ item.key}></TreeNode>*/}
      </TreeNode>);
    });
  render() {
    const {visible, menuList, confirmLoading, handleCancel, roleItem, handleCheck} = this.props;
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
            onCheck={(checkedKeys) => {
              handleCheck(checkedKeys)
            }}
            checkedKeys={roleItem}
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
  handleSubmit = () => {
    // console.log(this.state.checkedKeys)
    this.props.handleOk()
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
