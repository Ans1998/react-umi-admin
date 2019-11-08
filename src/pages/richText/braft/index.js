import styles from './index.css'
import React, {Component} from 'react'

import { connect } from 'dva';
import { Card } from 'antd';

// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

import { sleep } from '@utils/sleep'
const mapStateToProps = (state, props) => {
  return {
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
  }
};

@connect(mapStateToProps, mapDispatchToProps)
class RichTextBraft extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      // 创建一个空的editorState作为初始值
      editorState: BraftEditor.createEditorState(null)
    };
  }
  // 组件渲染之前
  componentWillMount() {
    // this.props.getUserInfo()
  }
  // 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
    // 假设此处从服务端获取html格式的编辑器内容
    // const htmlContent = await fetchEditorContent();
    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
    // this.setState({
    //   editorState: BraftEditor.createEditorState(htmlContent)
    // })
  }
  // 组件卸载
  componentWillUnmount() {
  }
  submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = this.state.editorState.toHTML();
    console.log(htmlContent);
    // const result = await saveEditorContent(htmlContent)
  };
  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  };
  render() {
    const { editorState } = this.state;
    return (
      <div style={{ background: '#fff'}}>
        <Card title="富文本编辑器" bordered={false}>
          <BraftEditor
            value={editorState}
            onChange={this.handleEditorChange}
            onSave={this.submitContent}
          />
        </Card>
      </div>
    );
  };
}
export default RichTextBraft
