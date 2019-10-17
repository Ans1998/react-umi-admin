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
