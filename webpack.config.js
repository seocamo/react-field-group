'use strict'
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  target: 'web',
  entry: {
    app: [
      'webpack-dev-server/client?http://127.0.0.1:8888',
      'webpack/hot/only-dev-server',
      `${__dirname}/src/Example.tsx`
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
    filename: 'app.[name]-[hash].js',
    publicPath: '/'
  },
  devServer: {
    host: '127.0.0.1',
    port: '8888',
    contentBase: './public',
    inline: true,
    stats: 'minimal',
    historyApiFallback: {
      disableDotRule: true
    },
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          tsConfigFile: 'tsconfig.json',
          errorsAsWarnings: true
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        options: {
          configFileName: 'tsconfig.json',
          errorsAsWarnings: true
        }
      }
    ]
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      hash: true,
    })
  ]
}
