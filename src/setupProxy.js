const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  // app.use(
  //   createProxyMiddleware("/api", {
  //     // target: "http://192.168.1.61:10099/",
  //     target: "http://18.163.41.76:19094/",
  //     changeOrigin: true,
  //     pathRewrite: {
  //       "^/api": "/api",
  //     },
  //   })
  // );
};
