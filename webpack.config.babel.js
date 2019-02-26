import path from 'path'
import webpack from 'webpack'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { getIfUtils, removeEmpty } from 'webpack-config-utils'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

export default (env, config) => {
  const { ifDevelopment, ifProduction } = getIfUtils(config.mode)

  return {
    entry: ifDevelopment(
      [
        'webpack-dev-server/client?http://localhost:3001',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        './src/client'
      ],
      './src/client'
    ),
    output: {
      filename: 'bundle.js',
      chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, 'build', 'assets'),
      publicPath: '/assets'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json']
    },
    ...{ optimization: removeEmpty({
      splitChunks: ifProduction({
        chunks: 'all'
      }),
      minimizer: ifProduction([
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        }),
        new OptimizeCSSAssetsPlugin({})
      ])
    }) },
    plugins: [
      ...ifDevelopment(
        [
          new webpack.HotModuleReplacementPlugin(),
          new FriendlyErrorsWebpackPlugin()
        ],
        [
          new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
          new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css'
          })
        ]
      )
    ],
    module: {
      rules: [
        {
          test: /\.(jsx?|tsx?)$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        // {
        //   test: /\.js$/,
        //   use: ['source-map-loader'],
        //   enforce: 'pre'
        // },
        {
          test: /\.styl$/,
          use: [
            ifDevelopment('style-loader', MiniCssExtractPlugin.loader),
            'css-loader',
            'postcss-loader',
            'stylus-loader'
          ],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            ifDevelopment('style-loader', MiniCssExtractPlugin.loader),
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg|otf)$/,
          use: 'file-loader'
        }
      ]
    },
    devtool: ifDevelopment(
      '#cheap-module-eval-source-map',
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
