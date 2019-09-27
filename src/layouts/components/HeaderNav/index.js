import styles from './index.css';
import { Layout, Icon, Popover, Badge, Avatar, Menu } from 'antd';
import React, {Component} from 'react'
import { connect } from 'dva';
const { Header } = Layout;


class HeaderNav extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      languageVisible: false,
      languageList: [
        {
          img: 'src/assets/img/4.png',
          name: '中文'
        },
        {
          img: 'src/assets/img/4.png',
          name: '日语'
        },
        {
          img: './../../../assets/img/4.png',
          name: '韩语'
        }
      ],
      showLanguage: {
        img: './../../../assets/img/4.png',
        name: '中文'
      },
      userInfoVisible: false
    };
  }
  // 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
    // console.log(document.body.clientWidth);
    // console.log(document.body.clientHeight);
  }

  languagePopoverRender = () => {
    return (
      <div className={styles.languageContent}>
        {
          this.state.languageList.map((item, index) => {
            return (
              <div className={this.state.showLanguage.name === item.name ? `${styles.L_C_L_selected} ${styles.L_C_list}` : styles.L_C_list}
                key={index}
                onClick={this.handleLanguageClick.bind(this, item)}>
                {/*<Avatar src={require(item.img)} size={35} icon="user" />*/}
                <Avatar src={require('./../../../assets/img/4.png')} size={35} icon="user" />
                <span className={styles.L_C_L_title}>{item.name}</span>
              </div>
            )
          })
        }
      </div>
    )
  };
  handleLanguageClick = (item) => {
    console.log('handlePopoverClick', item);
    this.setState({
      showLanguage: item,
      languageVisible: false
    });
  };
  handleLanguageVisibleChange = (e) => {
    this.setState({
      languageVisible: e
    });
    console.log('handleLanguageVisibleChange', e)
  };

  userInfoPopoverRender = () => {
    return (
      <div className={styles.userInfoContent}>
        <div className={styles.U_C_list} onClick={this.handleLogOut}>
          <span>退出登录</span>
        </div>
      </div>
    )
  };
  handleUserInfoVisibleChange= (e) => {
    this.setState({
      userInfoVisible: e
    });
    console.log('handleUserInfoVisibleChange', e)
  };
  handleLogOut = () => {
    this.setState({
      userInfoVisible: false
    });
    console.log('退出登录')
  };
  render() {
    const {collapsed} = this.props;
    return (
      <Header style={{ background: '#fff', height: '75px', padding: 0, boxShadow: '4px 4px 40px 0 rgba(0,0,0,.05)' }}>
        <div className={styles.HeaderContent}>
          <div className={styles.HeaderLeft} onClick={this.props.onClickTest.bind(this, collapsed)}>
            <Icon
              className={styles.HeaderMenuIcon}
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
            />
          </div>
          <div className={styles.HeaderRight}>
            <div className={styles.H_R_list}>
              <div className={styles.H_R_L_left}>
                <Badge count={5}>
                  <Icon type="bell" className={styles.HeaderBellIcon}/>
                </Badge>
              </div>
              <Popover content={this.languagePopoverRender()}
                       visible={this.state.languageVisible}
                       onVisibleChange={this.handleLanguageVisibleChange}
                       style={{ padding: 0, margin: 0}}
              >
                <div className={styles.H_R_L_middle}>
                    <Avatar src={require("./../../../assets/img/4.png")} size={35} icon="user" />
                    {/*<Avatar src={require(this.state.showLanguage.img)} size={35} icon="user" />*/}
                    {/*{this.state.showLanguage.name}*/}
                </div>
              </Popover>
              <Popover content={this.userInfoPopoverRender()}
                       visible={this.state.userInfoVisible}
                       onVisibleChange={this.handleUserInfoVisibleChange}
                       style={{ padding: 0, margin: 0}}
              >
                <div className={styles.H_R_L_right}>
                    <span className={styles.H_R_L_R_hint}>Hi,</span>
                    <span className={styles.H_R_L_R_userName}>root</span>
                    <Avatar src="https://image.zuiidea.com/photo-1525879000488-bff3b1c387cf.jpeg?imageView2/1/w/200/h/200/format/webp/q/75|imageslim" size={40} icon="user" />
                </div>
              </Popover>
            </div>
          </div>
        </div>
      </Header>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav)

