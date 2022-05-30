const path = require('path');
const _externals = require('externals-dependencies');
const webpack = require('webpack');
 
module.exports = {
  entry: {
    app: [
      // 如果polyfill放在这里，打包的时候将不会被external,必须在js里require才能有效external
      // 'babel-polyfill',
      './src/index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'server'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".js"]
  },
  optimization: {
    nodeEnv: false
  },
  target: 'node',
  externals: _externals(),
  context: __dirname,
  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
  ]
}