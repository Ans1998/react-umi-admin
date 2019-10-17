import React, {Component} from 'react'
import { connect } from 'dva';
import { Popover, Icon, Badge, Avatar } from 'antd';
import styles from './index.css';

class HeaderLanguage extends  Component{
  // 构造函数
  constructor(props) {
    super(props);
    this.state = {
      languageVisible: false,
      languageList: [
        {
          img: '@/assets/img/4.png',
          name: '中文'
        },
        {
          img: '@/assets/img/4.png',
          name: '日语'
        },
        {
          img: '@/assets/img/4.png',
          name: '韩语'
        }
      ],
      showLanguage: {
        img: '@/assets/img/4.png',
        name: '中文'
      },
    };
  }
// 组件已经被渲染到 DOM 中后运行
  componentDidMount() {
  }
  // 组件卸载
  componentWillUnmount() {
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
                <Avatar src={require('@/assets/img/4.png')} size={35} icon="user" />
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
  render() {
    return (
      <Popover content={this.languagePopoverRender()}
               visible={this.state.languageVisible}
               onVisibleChange={this.handleLanguageVisibleChange}
               style={{ padding: 0, margin: 0}}
      >
        <div className={styles.H_R_L_middle}>
          <Avatar src={require("@/assets/img/4.png")} size={35} icon="user" />
          {/*<Avatar src={require(this.state.showLanguage.img)} size={35} icon="user" />*/}
          {/*{this.state.showLanguage.name}*/}
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLanguage)
