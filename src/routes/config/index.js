module.exports = [
  { path: '/login', component: './login/index/index/' },
  {
    path: '/',
    component: './../layouts/',
    Routes: ['./src/routes/token/index.js'],
    routes: [
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
          {
            path: '',
            breadcrumbName: '首页',
          }
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
            path: '',
            breadcrumbName: '测试页',
          },
        ]
      },
    ],
  }
];
