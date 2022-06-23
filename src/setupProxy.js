const {
  createProxyMiddleware
} = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(createProxyMiddleware(
      "/api", {
          target: "http://16.162.44.108:18094/",
          changeOrigin: true,
          pathRewrite: {
              "^/api": "/api"
          }
      }
  ));
};