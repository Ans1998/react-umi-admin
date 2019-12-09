// import styles from './index.css'
import React, {Component} from 'react'

import { connect } from 'dva';
import { Card,  Form, Input, InputNumber  } from 'antd';
import QRCode  from 'qrcode.react'
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
class QrCodeCreate extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      value: 'http://facebook.github.io/react/',
      size: 128
    };
  }
  // 组件渲染之前
  componentWillMount() {
    // this.props.getUserInfo()
  }
  // 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
  }
  // 组件卸载
  componentWillUnmount() {
  }
  render() {
    const {value, size} = this.state;
    return (
      <div style={{ background: '#fff'}}>
        <Card title="二维码配置" bordered={false}>
          <Form>
            <Form.Item label="二维码生成内容">
              <Input placeholder="请输入二维码生成内容" onChange={(e) => {
                this.setState({
                  value: e.target.value
                });
              }}/>
            </Form.Item>
            <Form.Item label="二维码生成图片大小">
              <InputNumber style={{width: 200}} placeholder="请输入二维码生成图片大小" onChange={(value) => {
                console.log(value);
                this.setState({
                  size: value
                });
              }}/>
            </Form.Item>
          </Form>
        </Card>

        <div style={{height: 24, backgroundColor: '#EEF0F3'}}></div>

        <Card title="二维码生成" bordered={false}>
          <QRCode value={value} size={size}/>
        </Card>
      </div>
    );
  };
}
export default QrCodeCreate
