const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({
    target: 'http://localhost:8000',
    changeOrigin: true,
    onProxyRes(proxyRes) {
      proxyRes.headers['Access-Control-Expose-Headers'] = 'Content-Range';
    },
  }));
};