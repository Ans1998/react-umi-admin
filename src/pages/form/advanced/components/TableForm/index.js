import React, {Component} from 'react'

import styles from './index.css';
import { connect } from 'dva';

import { Form, Input, Button, Checkbox, Icon,
  Radio,DatePicker, InputNumber, Cascader,Switch,
  Select, Rate, Card, Row, Col, Table, Popconfirm
} from 'antd';


const EditableContext = React.createContext();

// 新建文本框
class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `请输入 ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

// 表格
class TableForm extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
        key: '0',
        warehouseAdministrator: 'An',
        warehouseName: '广州仓库',
        warehouseAddress: '广州市市桥',
        },
        {
          key: '1',
          warehouseAdministrator: '海蓝',
          warehouseName: '海蓝仓库',
          warehouseAddress: '海蓝市郊区',
        }
      ],
      editingKey: '', // 编辑文本框
    };
    this.columns = [
      {
        title: '仓库管理员',
        dataIndex: 'warehouseAdministrator',
        width: '15%',
        editable: true,
      },
      {
        title: '仓库名称',
        dataIndex: 'warehouseName',
        width: '25%',
        editable: true,
      },
      {
        title: '仓库地址',
        dataIndex: 'warehouseAddress',
        width: '40%',
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            // 编辑之后的按钮
            <span>
              <EditableContext.Consumer>
                {form => (
                  <Popconfirm title={"确定修改" + record.warehouseAdministrator + "这条数据?"} onConfirm={() => this.save(form, record.key)}>
                  <a style={{ marginRight: 8 }}>保存</a>
                  </Popconfirm>
                )}
              </EditableContext.Consumer>
              {
                record.warehouseAdministrator ? (
                  <a onClick={() => this.cancel(record)}>取消</a>
                ) : (
                  <Popconfirm title={"没有数据将不保存当前数据"} onConfirm={() => this.cancel(record)}>
                    <a style={{ marginRight: 8 }}>取消</a>
                  </Popconfirm>
                )
              }

            </span>
          ) : (
            <span>
              <a disabled={editingKey !== ''} onClick={() => this.edit(record.key, record)}>
                编辑
              </a>
               <Popconfirm title={"确定删除" + record.warehouseAdministrator + "这条数据?"} onConfirm={() => this.cancel(record.key)}>
                <a style={{marginLeft: 10}} >删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];
  }

  // 变成文本框修改状态
  isEditing = record => record.key === this.state.editingKey;
  // 编辑按钮操作
  edit(key, record) {
    console.log(key);
    console.log(record);
    this.setState({ editingKey: key });
  }
  // 取消按钮操作
  cancel = (record) => {
    console.log('cancel', record);
    if (!record.warehouseAdministrator) {
      let data = this.state.data;
      let res = data.filter((item, key) => {
        // console.log(item)
        if (item.key !== record.key) {
          // 把数据合格的返回到 res 变量
          return true
        }
      });
      this.setState({
        data: res
      })
    }
    this.setState({ editingKey: '' });
  };
  // 保存按钮操作
  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }
  // 新增文本框
  addInput = (e) => {
    const { form } = this.props;
    console.log(form);
    let res = this.state.data;
    res.push({
      key: this.state.data.length.toString(),
      warehouseAdministrator: null,
      warehouseName: null,
      warehouseAddress: null
    });
    // console.log(res);
    // console.log((res.length-1).toString());
    this.setState({
      data: res,
      editingKey: (res.length-1).toString()
    });
    // console.log(this.state)
  };
  // 提交按钮
  handleSubmit = (e) => {
  };

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    return (
      <div>
        <Row>
          <Col>
            <EditableContext.Provider value={this.props.form}>
              <Table
                components={components}
                bordered
                dataSource={this.state.data}
                columns={columns}
                rowClassName="editable-row"
                pagination={{
                  onChange: this.cancel,
                }}
              />
            </EditableContext.Provider>
          </Col>
        </Row>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col span={24}>
              <Form.Item wrapperCol={{span: 24}}>
                <Button type="dashed" onClick={this.addInput} style={{width: '100%'}}>
                  <Icon type="plus" /> 添加
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }

  test = () => {
    console.log(this.props);

    // mapDispatchToProps 把dispatch 赋值一个变量为 dispatch
    // this.props.dispatch({
    //   type: 'index/save',
    //   payload: {age: '14'},
    // });
    this.props.onClickSave({age: '14'});
  };
}

const mapStateToProps = (state, props) => {
  return {
    indexData: state.index
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onClickSave: (form) => {
      const action = {
        type: 'formAdvanced/save',
        payload: form,
      };
      dispatch(action);
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'tableForm' })(TableForm))
