import React, {Component} from 'react'
import { connect } from 'dva';
import { Popover, Icon, Badge, List } from 'antd';
import styles from './index.css';

class HeaderBadge extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      badgeVisible: false,
      loadingList: true,
      data: [

      ],
      current: 3
    };
  }
// 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loadingList: false
      })
    }, 1800)
  };
  onChange = page => {
    console.log('page', page);
    this.setState({
      current: page,
    });
  };
  // 组件卸载
  componentWillUnmount() {
  }
  badgePopoverRender = () => {
    return (
      <div className={styles.badgeContent}>
        <List
          itemLayout="horizontal"
          dataSource={this.state.data}
          loading={this.state.loadingList}
          // locale={{emptyText: '暂无数据'}}
          pagination={{
            defaultCurrent: 1,
            defaultPageSize: 5,
            hideOnSinglePage: true,
            current: this.state.current,
            onChange: this.onChange,
            total: 4
          }}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<a>{item.title}</a>}
                description="test description"
              />
              <Icon type="right"  style={{color: 'rgb(153, 153, 153)'}}/>
            </List.Item>
          )}
        />
      </div>
    )
  };
  handleBadgeVisibleChange = (e) => {
    console.log('handleBadgeVisibleChange', e);
    this.setState({
      badgeVisible: e
    });
  };
  render() {
    return (
      <Popover content={this.badgePopoverRender()}
               visible={this.state.badgeVisible}
               onVisibleChange={this.handleBadgeVisibleChange}
               trigger="click"
               style={{ padding: 0, margin: 0}}
      >
        <div className={styles.H_R_L_left}>
          <Badge count={this.state.data.length} >
            <Icon type="bell" className={styles.HeaderBellIcon}/>
          </Badge>
        </div>
      </Popover>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBadge)
