import React, {Component} from 'react'

import { connect } from 'dva';
import { Form, Input, Button, Checkbox, Icon,
  Radio,DatePicker, InputNumber, Cascader,Switch,
  Select, Rate
} from 'antd';
import moment from 'moment';

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const provinceData = [{name: '广东省', key: 'gd'}, {name: '广西', key: 'gx'},{name: '东北省', key: 'db'}];
const cityData = {
  gd: [{name: '广州市', key: 'gz'}, {name: '中山市', key: 'zs'}],
  gx: [{name: '贵港市', key: 'gg'}, {name: '百色市', key: 'bs'}, {name: '柳州市', key: 'lz'}],
  db: [{name: '吉林市', key: 'jl'}],
};

class AdvancedForm extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      cascaderOptions: [
        {
          value: 'shoes',
          label: '鞋子',
          children: [
            {
              value: 'nike',
              label: '耐克',
              children: [
                {
                  value: '3006',
                  label: '3006',
                },
              ],
            },
          ],
        },
        {
          value: 'pants',
          label: '裤子',
          children: [
            {
              value: 'haiLan',
              label: '海蓝之家',
              children: [
                {
                  value: '003',
                  label: '新品上市003',
                },
              ],
            },
          ],
        },
      ],
      checkboxGroupOptions: ['老年', '青年', '儿童'],
      checkedList: null,
      groupValue: 1,
      rate: 0,
      secondCity: cityData[provinceData[0].key][0],
      cities: cityData[provinceData[0].key]
    };
  }
// 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
    console.log('this.state.cities', this.state.cities);
    console.log('this.state.secondCity', this.state.secondCity);
    console.log('advanced', this.props);
    console.log(moment().get('year')); // 年
    console.log(moment().get('month')+1);  // 月 从 0 to 11 所以需要自己加1
    console.log(moment().get('date')); // 日
    console.log(moment().get('hour')); // 时
    console.log(moment().get('minute')); // 分
    console.log(moment().get('second')); // 秒
    console.log(moment().get('millisecond')); // 毫秒
    console.log(moment().subtract(1, "days")); // 前一天全部的日期
    console.log(this.range(0, moment().get('minute')));

  }
  // 组件卸载
  componentWillUnmount() {
  }
  // 表单提交
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('advanced', this.props);
        console.log('handleSubmit form: ', values);
      }
    });
  };
  range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    // console.log('range', result);
    return result;
  };
  disabledDate = (current) => {
    if(!current){
      return false
    }else{

      // 大于当前日期不能选 current > moment()
      // 小于当前日期不能选 current < moment().subtract(1, "days")
      // 只能选前7天后7天 current < moment().subtract(7, "days") || current > moment().add(7, 'd')

      // 前一天后日期不可选
      return current < moment().subtract(1, "days")
    }
  };
  disabledRangeTime = (dates, type) => {
    // console.log('disabledRangeTime');
    // console.log(type);
    // 开始 start
    if (type === 'start') {
      if (dates && dates.length >= 1) {
        console.log(dates[0].get('hour'));
        console.log(moment().get('hour'));
        if (dates[0].get('hour') === moment().get('hour')) {
          // console.log('----相同的时间----');
          return {
            // 传过去的数据是不显示的
            disabledHours: () => this.range(1, moment().get('hour')),
            disabledMinutes: () => this.range(0, moment().get('minute')),
            disabledSeconds: () => this.range(0, moment().get('second'))
          };
        }
      }
      return {
        // 传过去的数据是不显示的
        disabledHours: () => this.range(1, moment().get('hour'))
      };
    }
    // 结束 end
    // return {
    //   disabledHours: () => this.range(0, 60).splice(20, 4),
    //   disabledMinutes: () => this.range(0, 31),
    //   disabledSeconds: () => [55, 56],
    // };
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemPublicLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
    };
    return (
      <div>
        <Form {...formItemPublicLayout} onSubmit={this.handleSubmit} style={{margin: '0 auto'}}>
          <Form.Item label="商品名称">
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入商品名称"
              />,
            )}
          </Form.Item>
          <Form.Item label="商品价格">
            <InputNumber
              defaultValue={0}
              placeholder="请输入商品金额"
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              onChange={this.handleShopSumChange}
            ></InputNumber>
          </Form.Item>
          <Form.Item label="商品分类">
            <Cascader
              placeholder="请输入商品分类"
              defaultValue={['shoes', 'nike', '3006']}
              options={this.state.cascaderOptions}
              onChange={this.handleCascaderChange}
            />
          </Form.Item>
          <Form.Item label="商品人群">
            <CheckboxGroup
              options={this.state.checkboxGroupOptions}
              value={this.state.checkedList}
              onChange={this.handleCheckboxGroupChange}
            />
          </Form.Item>
          <Form.Item label="商品秒杀">
            <Radio.Group onChange={this.handleGroupChange} value={this.state.groupValue}>
              <Radio value={1}>开启</Radio>
              <Radio value={2}>不开启</Radio>
            </Radio.Group>
          </Form.Item>
          {
            this.state.groupValue === 1 ? (
              <Form.Item label="商品秒杀时间">
                <RangePicker
                  disabledDate={this.disabledDate}
                  disabledTime={this.disabledRangeTime}
                  onChange={this.handleShopCreateChange}
                  onOk={this.handleShopCreateOk}
                  showTime={{
                    hideDisabledOptions: true,
                    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                  }}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </Form.Item>
            ) : null
          }
          <Form.Item label="商品状态">
            <Switch onChange={this.handleSwitchChange}  checkedChildren="开" unCheckedChildren="关" defaultChecked />
          </Form.Item>
          <Form.Item label="商品标签">
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="请填写商品标签"
              defaultValue={['a10', 'c12']}
              onChange={this.handleSelectHandleChange}
            >
              {children}
            </Select>
          </Form.Item>
          <Form.Item label="商品描述" wrapperCol={{span: 10}} >
            <TextArea rows={8} placeholder="请填写商品描述" />
          </Form.Item>
          <Form.Item label="商品推荐力度">
            <Rate onChange={this.handleRateChange} allowHalf defaultValue={this.state.rate} />
          </Form.Item>
          <Form.Item label="商品发货地">
            <Select
              defaultValue={provinceData[0].name}
              style={{ width: 120 }}
              onChange={this.handleProvinceChange}
            >
              {provinceData.map(province => (
                <Option key={province.key}>{province.name}</Option>
              ))}
            </Select>
            <Select
              style={{ width: 120, marginLeft: 5}}
              value={this.state.secondCity.key}
              onChange={this.onSecondCityChange}
            >
              {this.state.cities.map(city => (
                <Option key={city.key}>{city.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item  wrapperCol={{push: 11}}>
            <Button type="primary" htmlType="submit">提交</Button>
            <Button style={{marginLeft: 10}}>重置</Button>
          </Form.Item>

        </Form>
      </div>
    );
  }
  handleShopCreateChange = (dates, dateString) => {
    // console.log('handleShopCreateChange');
    // console.log(dates);
    // console.log(dateString);
  };
  handleShopCreateOk = (e) => {
    console.log('handleOrderCreateOk', e)
  };
  handleShopSumChange = (value) => {
    console.log('handleShopSumChange', value);
  };
  handleCascaderChange = (value) => {
    console.log('handleCascaderChange', value);
  };
  handleCheckboxGroupChange = (value) => {
    // let data = [];
    // data.push(value);
    this.setState({
      checkedList: value
    });
    console.log('handleCheckboxGroupChange', value)
  };
  handleGroupChange = (e) => {
    this.setState({
      groupValue: e.target.value
    });
    console.log('handleGroupChange', e.target.value);
  };
  handleSwitchChange = (value) => {
    console.log('handleSwitchChange', value);
  };
  handleSelectHandleChange(value) {
    console.log(`selected ${value}`);
  };
  handleRateChange = (value) => {
    console.log('handleRateChange', value);
    this.setState({
      rate: value
    })
  };
  handleProvinceChange = value => {
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0],
    });
  };
  onSecondCityChange = value => {
    this.setState({
      secondCity: value,
    });
  };
}

const mapStateToProps = (state, props) => {
  return {
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'advancedForm' })(AdvancedForm))
