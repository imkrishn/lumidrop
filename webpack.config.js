const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const prod = argv.mode === 'production';

  return {
    entry: './src/main.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: prod ? '[name].[contenthash:8].js' : '[name].js',
      clean: true
    },
    devtool: prod ? false : 'eval-source-map',
  }
}
