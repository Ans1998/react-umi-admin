/*
运行时配置文件，可以在这里扩展运行时的能力，比如修改路由、修改 render 方法等
 */
export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  }
};
// // 用于运行时修改路由。
// export function patchRoutes(routes) {
//   console.log(routes)
// }
// // 用于改写把整个应用 render 到 dom 树里的方法。
// export function render(oldRender) {
//   setTimeout(oldRender, 1000);
// }
//
// // 用于在初始加载和路由切换时做一些事情
// export function onRouteChange({ location, routes, action }) {
// }
//
// // 用于封装 root container，可以取一部分，或者外面套一层，等等
// export function rootContainer(container) {
// }
//
// // 修改传给路由组件的 props。
// export function modifyRouteProps(props, { route }) {
// }
