import React, {Component} from 'react'

import styles from './index.css';
import { connect } from 'dva';

import { Form, Input, Button, Checkbox, Icon,
  Radio,DatePicker, InputNumber, Cascader,Switch,
  Select, Rate, Card, Row, Col, Table, Popconfirm
} from 'antd';

const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
const EditableContext = React.createContext();

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
                  message: `Please Input ${title}!`,
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
class TableForm extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      data,
      editingKey: ''
    };
    this.columns = [
      {
        title: 'name',
        dataIndex: 'name',
        width: '25%',
        editable: true,
      },
      {
        title: 'age',
        dataIndex: 'age',
        width: '15%',
        editable: true,
      },
      {
        title: 'address',
        dataIndex: 'address',
        width: '40%',
        editable: true,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <span>
              <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                编辑
              </a>
               <Popconfirm title="确定删除?" onConfirm={() => this.cancel(record.key)}>
                <a style={{marginLeft: 10}} >删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];
  }
  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

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

  edit(key) {
    this.setState({ editingKey: key });
  }

  addInput = (e) => {
    const { form } = this.props;
    console.log(form)
    let res = this.state.data;
    res.push({
      key: '111',
      name: `Edrward ${111}`,
      age: '32',
      address: `London Park no. ${111}`,
    });
    this.setState({
     data: res
    });
  };
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
