module.exports = [
  { path: '/login', component: './login/index/index/' },
  {
    path: '/',
    component: './../layouts/',
    Routes: ['./src/routes/token/index.js'],
    routes: [
      { path: '/reptile/file/list', component: './reptile/captureFileList/index/',
        Routes: ['./src/routes/auth/index.js'],
        authority: ['admin', 'user'],
        breadcrumbArr: [
          {
            path: '/',
            breadcrumbName: '首页',
          },
          {
            path: '',
            breadcrumbName: '爬虫管理',
          },
          {
            path: '',
            breadcrumbName: '文件列表',
          }
        ]
      },
      { path: '/reptile/capture/data', component: './reptile/captureData/index/',
        Routes: ['./src/routes/auth/index.js'],
        authority: ['admin', 'user'],
        breadcrumbArr: [
          {
            path: '/',
            breadcrumbName: '首页',
          },
          {
            path: '',
            breadcrumbName: '爬虫管理',
          },
          {
            path: '',
            breadcrumbName: '抓取数据',
          }
        ]
      },
      { path: '/richText/braft', component: './richText/braft/index/',
        Routes: ['./src/routes/auth/index.js'],
        authority: ['admin', 'user'],
        breadcrumbArr: [
          {
            path: '/',
            breadcrumbName: '首页',
          },
          {
            path: '',
            breadcrumbName: '富文本',
          },
          {
            path: '',
            breadcrumbName: 'braft编辑器',
          }
        ]
      },
      { path: '/qrCode/create', component: './qrCode/create/index/',
        Routes: ['./src/routes/auth/index.js'],
        authority: ['admin', 'user'],
        breadcrumbArr: [
          {
            path: '/',
            breadcrumbName: '首页',
          },
          {
            path: '',
            breadcrumbName: '二维码管理',
          },
          {
            path: '',
            breadcrumbName: '二维码生成',
          }
        ]
      },
      { path: '/auth/role/list', component: './auth/role/index/',
        Routes: ['./src/routes/auth/index.js'],
        authority: ['admin', 'user'],
        breadcrumbArr: [
          {
            path: '/',
            breadcrumbName: '首页',
          },
          {
            path: '',
            breadcrumbName: '菜单管理',
          },
          {
            path: '',
            breadcrumbName: '权限列表',
          }
        ]
      },
      { path: '/auth/user/list', component: './auth/user/index/',
        Routes: ['./src/routes/auth/index.js'],
        authority: ['admin', 'user'],
        breadcrumbArr: [
          {
            path: '/',
            breadcrumbName: '首页',
          },
          {
            path: '',
            breadcrumbName: '菜单管理',
          },
          {
            path: '',
            breadcrumbName: '用户列表',
          }
        ]
      },
      { path: '/menu/add', component: './menu/add/index/',
        Routes: ['./src/routes/auth/index.js'],
        authority: ['admin', 'user'],
        breadcrumbArr: [
          {
            path: '/',
            breadcrumbName: '首页',
          },
          {
            path: '',
            breadcrumbName: '菜单管理',
          },
          {
            path: '',
            breadcrumbName: '添加菜单',
          }
        ]
      },
      { path: '/menu/list', component: './menu/list/index/',
        Routes: ['./src/routes/auth/index.js'],
        authority: ['admin', 'user'],
        breadcrumbArr: [
          {
            path: '/',
            breadcrumbName: '首页',
          },
          {
            path: '',
            breadcrumbName: '菜单管理',
          },
          {
            path: '',
            breadcrumbName: '菜单列表',
          }
        ]
      },
      { path: '/form/basics-form', component: './form/basics/index/',
        Routes: ['./src/routes/auth/index.js'],
        authority: ['admin', 'user'],
        breadcrumbArr: [
          {
            path: '/',
            breadcrumbName: '首页',
          },
          {
            path: '',
            breadcrumbName: '表单页',
          },
          {
            path: '',
            breadcrumbName: '基础表单',
          }
        ]
      },
      { path: '/form/advanced-form', component: './form/advanced/index/',
        Routes: ['./src/routes/auth/index.js'],
        authority: ['admin', 'user'],
        breadcrumbArr: [
          {
            path: '/',
            breadcrumbName: '首页',
          },
          {
            path: '',
            breadcrumbName: '表单页',
          },
          {
            path: '',
            breadcrumbName: '高级表单',
          }
        ]
      },
      { path: '/list/advanced-list', component: './list/advanced/index/',
        Routes: ['./src/routes/auth/index.js'],
        authority: ['admin', 'user'],
        breadcrumbArr: [
          {
            path: '/',
            breadcrumbName: '首页',
          },
          {
            path: '',
            breadcrumbName: '列表页',
          },
          {
            path: '',
            breadcrumbName: '高级列表',
          }
        ]
      },
      { path: '/list/basics-list', component: './list/basics/index/',
        Routes: ['./src/routes/auth/index.js'],
        authority: ['admin', 'user'],
        breadcrumbArr: [
          {
            path: '/',
            breadcrumbName: '首页',
          },
          {
            path: '',
            breadcrumbName: '列表页',
          },
          {
            path: '',
            breadcrumbName: '基础列表',
          }
        ]
      },
      { path: '/details/basics-details', component: './details/basics/index/',
        Routes: ['./src/routes/auth/index.js'],
        authority: ['admin', 'user'],
        breadcrumbArr: [
          {
            path: '/',
            breadcrumbName: '首页',
          },
          {
            path: '',
            breadcrumbName: '详情页',
          },
          {
            path: '',
            breadcrumbName: '基础详情',
          }
        ]
      },
      { path: '/details/advanced-details', component: './details/advanced/index/',
        Routes: ['./src/routes/auth/index.js'],
        authority: ['admin', 'user'],
        breadcrumbArr: [
          {
            path: '/',
            breadcrumbName: '首页',
          },
          {
            path: '',
            breadcrumbName: '详情页',
          },
          {
            path: '',
            breadcrumbName: '高级详情',
          }
        ]
      },
      { path: '/', component: './home/index/index/',
        Routes: ['./src/routes/auth/index.js'],
        authority: ['admin', 'user'],
        breadcrumbArr: [
          // {
          //   path: '',
          //   breadcrumbName: '首页',
          // }
        ]
      },
      // { path: '/order', component: './order/pages/orders/', Routes: ['./src/routes/auth/index.js'] , breadcrumbArr: [
      //     {
      //       path: '',
      //       breadcrumbName: '订单管理',
      //     },
      //   ]
      // },
      { path: '/user/admin', component: './user/pages/admin',
        Routes: ['./src/routes/auth/index.js'],
        authority: ['admin', 'user'],
        breadcrumbArr: [
          {
            path: '/user/admin',
            breadcrumbName: '用户管理',
          },
          {
            breadcrumbName: '管理员用户',
          },
        ]
      },
      { path: '/user/list', component: './user/pages/list',
        Routes: ['./src/routes/auth/index.js'],
        authority: ['admin', 'user'],
        breadcrumbArr: [
          {
            breadcrumbName: '用户管理',
          },
          {
            breadcrumbName: '用户列表',
          },
        ]
      },
      { path: '/test', component: './test2/pages/index/',
        Routes: ['./src/routes/auth/index.js'] ,
        authority: ['admin', 'user'],
        breadcrumbArr: [
          {
            path: '/',
            breadcrumbName: '首页',
          },
          {
            path: '',
            breadcrumbName: '测试页',
          },
        ]
      },
    ],
  }
];
