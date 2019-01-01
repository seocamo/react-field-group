'use strict'
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'production',
  devtool: 'cheap-source-map',
  target: 'web',
  entry: {
    app: [
      `${__dirname}/src/index.ts`
    ],
    vendor: ['react', 'react-dom']
  },
  resolve: {
    modules: [__dirname, 'src', 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    enforceExtension: false
  },
  output: {
    path: `${__dirname}/public`,
    chunkFilename: 'chunk.[name]-[hash].js',
    filename: 'index.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        include: path.join(__dirname, 'src')
      }
    ]
  },
  optimization: {
    runtimeChunk: true,
    noEmitOnErrors: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      cutCode: JSON.stringify(true),
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      hash: true,
    })
  ]
}
