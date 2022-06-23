const {
  createProxyMiddleware
} = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(createProxyMiddleware(
      "/npics-nft", {
          target: "http://192.168.1.61:10099/",
          changeOrigin: true,
          pathRewrite: {
              "^/npics-nft": "/npics-nft"
          }
      }
  ));
};