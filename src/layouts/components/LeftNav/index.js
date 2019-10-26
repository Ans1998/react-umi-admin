import styles from './index.css';
import { Layout, Menu, Row, Col, Icon, Switch } from 'antd';
import React, {Component} from 'react'
import { connect } from 'dva';

import router from 'umi/router';

const { SubMenu } = Menu;
const { Sider } = Layout;

const menuSrc = [
  {
    key: '/',
    icon: 'pie-chart',
    title: '首页',
  },
  {
    key: '/test',
    icon: 'tags',
    title: '测试页'
  },
  {
    key: '/menu',
    icon: 'user',
    title: '菜单管理',
    children: [
      {
        key: '/menu/add',
        title: '添加菜单'
      },
      {
        key: '/menu/list',
        title: '菜单列表'
      }
    ]
  },
  {
    key: '/auth',
    icon: 'user',
    title: '权限管理',
    children: [
      {
        key: '/auth/role/list',
        title: '角色列表'
      },
      {
        key: '/auth/user/list',
        title: '用户列表'
      }
    ]
  },
  {
    key: '/user',
    icon: 'user',
    title: '用户管理',
    children: [
      {
        key: '/user/admin',
        title: '管理员列表'
      },
      {
        key: '/user/list',
        title: '用户列表'
      }
      ]
  },
  {
    key: '/form',
    icon: 'form',
    title: '表单页',
    children: [
      {
        key: '/form/basics-form',
        title: '基础表单'
      },
      {
        key: '/form/advanced-form',
        title: '高级表单'
      }
    ]
  },
  {
    key: '/list',
    icon: 'form',
    title: '列表页',
    children: [
      {
        key: '/list/basics-list',
        title: '基础列表'
      },
      {
        key: '/list/advanced-list',
        title: '高级列表'
      }
    ]
  },
  {
    key: '/details',
    icon: 'profile',
    title: '详情页',
    children: [
      {
        key: '/details/basics-details',
        title: '基础详情'
      },
      {
        key: '/details/advanced-details',
        title: '高级详情'
      }
    ]
  },
  {
    key: '/order',
    icon: 'shopping',
    title: '订单管理',
    children: [
      {
        key: '/order/list',
        title: '订单列表'
      },
      {
        key: '/order/add',
        title: '新增订单',
        children: [
          {
            key: '/order/add/shop',
            title: '商品订单'
          },
          {
            key: '/order/add/device',
            title: '设备订单'
          }
          ]
      }
      ]
  }
  ];

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
        return (<SubMenu key={menu.key}
          title={
          <span>
           {menu.icon ? <Icon type={menu.icon} /> : null}
          <span>{menu.title}</span>
          </span>
        }>
            {/*递归*/}
            {this.renderMenu(menu.children)}
          </SubMenu>)
      } else {
        return (<Menu.Item key={menu.key}>
          {menu.icon ? <Icon type={menu.icon} /> : null}
          <span>{menu.title}</span>
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
    const {collapsed} = this.props;
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
             this.renderMenu(menuSrc)
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

