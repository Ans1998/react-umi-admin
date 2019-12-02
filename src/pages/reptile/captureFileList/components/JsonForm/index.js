import React, {Component} from 'react'

// import styles from './index.css';

import { Modal } from 'antd';

import ReactJson from 'react-json-view'

class PushStorageForm extends  Component {
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {};
  }
  // 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
  }

  // 组件卸载
  componentWillUnmount() {
  }

  render() {
    const { visible, handleCancel, item } = this.props;
    return (
      <div>
        <Modal
          visible={visible}
          title="查看内容"
          width="100"
          onCancel={handleCancel.bind(this)}
          onOk={handleCancel.bind(this)}
        >
          <ReactJson src={item} />
        </Modal>
      </div>
    );
  }
}
export default PushStorageForm
