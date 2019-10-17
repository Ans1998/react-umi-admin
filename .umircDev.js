// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  history: 'hash',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      title: 'umi',
      dll: false,
      routes: { // 排除不是路由的文件
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /pages\.(j|t)sx?$/,
          /models\//,
          /components\//,
          /services\//,
          /pages\//,
        ]
      },
    }],
  ],
  routes: [
    {
      path: '/',
      component: './../layouts/',
      routes: [
        { path: '/form/basics-form', component: './form/basics/index/',
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
          authority: ['admin', 'user'],
          breadcrumbArr: [
          {
              path: '',
              breadcrumbName: '首页',
          }
          ]
        },
        // { path: '/order', component: './order/pages/orders/', Routes: ['./src/routes/authRoute/index.js'] , breadcrumbArr: [
        //     {
        //       path: '',
        //       breadcrumbName: '订单管理',
        //     },
        //   ]
        // },
        { path: '/user/admin', component: './user/pages/admin',
          Routes: ['./src/routes/authRoute/index.js'],
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
          Routes: ['./src/routes/authRoute/index.js'],
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
          Routes: ['./src/routes/authRoute/index.js'] ,
          authority: ['admin', 'user'],
          breadcrumbArr: [
            {
              path: '',
              breadcrumbName: '测试页',
            },
          ]
        },
      ],
    },
    { path: '/login', component: './login/index/index/' },
  ],
}
