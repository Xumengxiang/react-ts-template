const webpack = require('webpack');
const glob = require('glob');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { resolve } = require('path');

const { PROJECT_PATH } = require('../constants');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'none',
  plugins: [
    new CleanWebpackPlugin(),
    new PurgeCSSPlugin({
      paths: glob.sync(`${resolve(PROJECT_PATH, './src')}/**/*.{tsx,scss,less,css}`, { nodir: true }),
      whitelist: ['html', 'body'],
    }),
    new webpack.BannerPlugin({
      raw: true,
      banner: '/** @preserve Powered by react-ts-template (https://github.com/xumengxiang/react-ts-template) */',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: '8888',
    }),
  ],
});
