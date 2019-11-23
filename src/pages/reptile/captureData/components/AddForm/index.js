import React, {Component} from 'react'

// import styles from './index.css';
import { connect } from 'dva';
import { Button, Form, Input, Modal } from 'antd';
const InputGroup = Input.Group;
class AddForm extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      scope: {
        'start': '0',
        'end': '0'
      }
    };
  }
  // filterMenu(data) {
  //   data.map((item) => {
  //     item.label = item.name;
  //     item.value = item.id;
  //     if ('children' in item) {
  //       this.filterMenu(item.children)
  //     }
  //   })
  // };
  // 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
  }
  // 组件卸载
  componentWillUnmount(){
  }
  render() {
    const {scope} = this.state;
    const {visible, loading, handleCancel } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemPublicLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
    };
    return (
      <div>
        <Form {...formItemPublicLayout} onSubmit={this.handleSubmit.bind(this)} style={{margin: '0 auto'}}>
          <Modal
            visible={visible}
            title="抓取微博数据"
            onCancel={handleCancel.bind(this)}
            footer={[
              <Button key="back" onClick={handleCancel.bind(this)}>取消</Button>,
              <Button onClick={this.handleSubmit.bind(this)} type="primary" htmlType="submit" loading={loading}>确定</Button>,
            ]}
          >
            <Form.Item label="抓取微博网址" style={{paddingTop: 24}}>
              {
                getFieldDecorator('url', {
                  initialValue: 'https://m.weibo.cn/api/container/getIndex?containerid=231051_-_fans_-_',
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请输入抓取微博的网址!'
                    }
                  ],
                })(
                  <Input placeholder="请输入抓取微博的网址" />
                )
              }
            </Form.Item>
            <Form.Item label="微博用户前缀">
              {
                getFieldDecorator('userIdPrefix', {
                  initialValue: '318078864',
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请输入微博用户前缀!'
                    }
                  ],
                })(
                  <Input placeholder="请输入微博用户前缀" />
                )
              }
            </Form.Item>
            <Form.Item label="用户ID范围">
              {
                getFieldDecorator('scope', {
                  initialValue: scope,
                  rules: [
                    {
                      type: 'object',
                      required: true,
                      whitespace: true,
                      message: '请输入用户ID范围!'
                    }
                  ],
                })(
                  <InputGroup compact>
                    <Input onChange={this.handleStartInputChange} value={scope.start} style={{ width: '45%'}} placeholder="开始ID范围" />
                    <div style={{margin: '0 5px' }}>~</div>
                    <Input onChange={this.handleEndInputChange} value={scope.end} style={{ width: '45%' }} placeholder="结束ID范围" />
                  </InputGroup>
                )
              }
            </Form.Item>
          </Modal>
        </Form>
      </div>
    );
  }
  handleStartInputChange = (e) => {
    console.log(e.target.value);
    this.state.scope.start = e.target.value;
    this.setState({
      scope: this.state.scope
    })
  };
  handleEndInputChange = (e) => {
    console.log(e.target.value);
    this.state.scope.end = e.target.value;
    this.setState({
      scope: this.state.scope
    })
  };
  // 表单提交
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      // console.log(values);
      this.props.handleSubmit(values, this.props.form);
    });
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'CaptureDataAddForm' })(AddForm))
