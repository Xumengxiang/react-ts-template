const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { SERVER_HOST, SERVER_PORT } = require('../constants');

module.exports = merge(common, {
  mode: 'development',
  devtool: '#eval-source-map',
  devServer: {
    host: SERVER_HOST,
    port: SERVER_PORT,
    stats: 'errors-only',
    clientLogLevel: 'silent',
    compress: true,
    open: true,
    hot: true,
    proxy: {
      // 接口代理1
      '/api/': {
        target: 'http://198.168.111.111:3001',
        changeOrigin: true,
      },
      // 接口代理2
      '/api-2/': {
        target: 'http://198.168.111.111:3002',
        changeOrigin: true,
        pathRewrite: {
          '^/api-2': '',
        },
      },
      // .....
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
