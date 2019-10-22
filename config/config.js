/*
编译时配置文件
 */
const path = require('path');
// ref: https://umijs.org/config/
const routeConfig = require('./../src/routes/config/index');
export default {
  treeShaking: true,
  history: 'hash',
  alias: {
    '@utils': path.resolve(__dirname, '../utils'),
  },
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
  routes: routeConfig,
}
