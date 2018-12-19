const path = require('path')
const webpack = require('webpack')
const devMode = process.env.NODE_ENV !== 'production'
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
var webpackConfig = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'app.[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'css-loader'
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app.[contenthash].css',
      disable: process.env.NODE_ENV === 'development'
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'static'),
        to: path.resolve(__dirname, 'dist'),
        ignore: ['.*']
      }
    ])
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        parallel: 4,
        uglifyOptions: {
          warnings: false,
          compress: {
            warnings: false
          },
        },
      })
    ]
  }
}


if (process.env.NODE_ENV === 'production') {
  webpackConfig.plugins = (webpackConfig.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}

module.exports = webpackConfig
