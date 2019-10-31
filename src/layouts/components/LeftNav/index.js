import styles from './index.css';
import { Layout, Menu, Row, Col, Icon, Switch } from 'antd';
import React, {Component} from 'react'
import { connect } from 'dva';

import router from 'umi/router';

const { SubMenu } = Menu;
const { Sider } = Layout;

class LeftNav extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      menuSelectKey: [props.data.location.pathname],
      theme: 'light',
      isMobile: true,
    };
  }
  // 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
    // console.log('data', this.props.data);
    // console.log('menuSelectKey', this.state.menuSelectKey);
  }
  // 组件卸载
  componentWillUnmount() {
  }
  // item菜单点击
  handleMenuItemClick = (item) => {
    // console.log('handleMenuClick', item);
    let url = item.key;
    router.push(url);
  };
  // Sub菜单切换
  handleMenuSubChange = (item) => {
    // console.log('handleMenuChange', item);
  };
  // 菜单循环
  renderMenu(menuData){
    return menuData.map((menu) => {
      if (menu.children) {
        return (<SubMenu key={menu.url}
          title={
          <span>
           {menu.icon ? <Icon type={menu.icon} /> : null}
          <span>{menu.name}</span>
          </span>
        }>
            {/*递归*/}
            {this.renderMenu(menu.children)}
          </SubMenu>)
      } else {
        return (<Menu.Item key={menu.url}>
          {menu.icon ? <Icon type={menu.icon} /> : null}
          <span>{menu.name}</span>
        </Menu.Item>)
      }
    })
  };
  // 切换主题
  onThemeChange = value => {
      console.log(value);
      this.setState({
        theme: value === 'dark' ? 'dark' : 'light',
      });
  };
  // 手机导航栏
  onCollapseChange = () => {
    // console.log('手机模式')
  };
  themeChangeRender = () => {
    return (
      <Row type="flex" className={styles.themeChangeContent}>
        <Col>
          <span
            style={ this.state.theme === 'dark' ? {color: 'rgba(255, 255, 255, 0.65)' } : {}}
          >
            <Icon type="bulb"/>
            <span
              style={{paddingLeft: '5px' }}
            >切换主题</span>
         </span>
        </Col>
        <Col push={20} className={ this.props.collapsed ? null : styles.T_C_C_switch}>
          <Switch
            onChange={this.onThemeChange.bind(
              this,
              this.state.theme === 'dark' ? 'light' : 'dark'
            )}
          />
        </Col>
      </Row>
    )
  };
  render() {
    const {collapsed, userMenuList} = this.props;
    return (
        <Sider trigger={null}
               collapsible
               collapsed={collapsed}
               width={256}
               collapsedWidth="80"
               theme={this.state.theme}
               breakpoint="lg"
               onBreakpoint={this.state.isMobile ? this.onCollapseChange : null}
        >
          <Row className={styles.LeftNavLogo} >
            <Col>
              <img style={{width: '36px', marginRight: '8px'}}
                   src={require("./../../../assets/img/4.png")} alt=""/>
              <h1 style={{fontSize: '16px',
                textTransform: 'uppercase',
                display: 'inline-block',
                fontWeight: 700,
                color: '#1890ff'}}>管理后台</h1>
            </Col>
          </Row>

          <Menu
            style={{padding: '24px  0'}}
            defaultSelectedKeys={this.state.menuSelectKey}
            mode="inline"
            theme={this.state.theme}
            onClick={this.handleMenuItemClick}
            onOpenChange={this.handleMenuSubChange}
          >
            {
             this.renderMenu(userMenuList)
            }
          </Menu>
          {
            collapsed ? null : this.themeChangeRender()
          }
        </Sider>
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

export default connect(mapStateToProps, mapDispatchToProps)(LeftNav)

