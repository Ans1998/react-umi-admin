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
        { path: '/', component: './index/pages/index/',
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
          breadcrumbArr: [
            {
              path: 'admin',
              breadcrumbName: '用户管理',
            },
            {
              breadcrumbName: '管理员用户',
            },
          ]
        },
        { path: '/user/list', component: './user/pages/list',
          Routes: ['./src/routes/authRoute/index.js'],
          breadcrumbArr: [
            {
              breadcrumbName: '用户管理',
            },
            {
              breadcrumbName: '用户列表',
            },
          ]
        },
        { path: '/test', component: './test/pages/index/',
          Routes: ['./src/routes/authRoute/index.js'] ,
          breadcrumbArr: [
            {
              path: '',
              breadcrumbName: '测试页',
            },
          ]
        },
      ],
    },
    { path: '/login', component: './login/pages/index/' },
  ],
}
