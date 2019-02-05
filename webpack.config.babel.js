import path from 'path'
import webpack from 'webpack'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { getIfUtils } from 'webpack-config-utils'

export default (env, config) => {
  const { ifDevelopment } = getIfUtils(config.mode)

  return {
    entry: ifDevelopment(
      [
        'webpack-dev-server/client?http://localhost:3001',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        './src/client'
      ],
      // ifProduction
      './src/client'
    ),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist', 'assets'),
      publicPath: '/assets'
    },
    plugins: [
      ...ifDevelopment(
        [
          new webpack.HotModuleReplacementPlugin(),
          new FriendlyErrorsWebpackPlugin()
        ],
        // ifProduction
        [
          new BundleAnalyzerPlugin()
        ]
      )
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.styl$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'stylus-loader'
          ],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader'
          ]
        }
      ]
    },
    devtool: ifDevelopment(
      '#cheap-module-eval-source-map',
      // ifProduction
      '#source-map'
    ),
    devServer: {
      publicPath: '/assets',
      port: 3001,
      hot: true,
      quiet: true,
      proxy: {
        '*': 'http://localhost:3000'
      }
    }
  }
}
