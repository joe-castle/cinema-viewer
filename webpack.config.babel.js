import path from 'path'
import webpack from 'webpack'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { getIfUtils, removeEmpty } from 'webpack-config-utils'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import LoadablePlugin from '@loadable/webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'

export default (env, config) => {
  const { ifDevelopment, ifProduction } = getIfUtils(config.mode)

  return {
    entry: ifDevelopment(
      [
        'webpack-dev-server/client?http://localhost:3001',
        // 'webpack/hot/only-dev-server',
        // 'react-hot-loader/patch',
        './src/client'
      ],
      {
        main: './src/client',
        Navigation: './src/components/Navigation',
        App: './src/components/App',
        ScrollToTop: './src/components/utils/ScrollToTop'
      }
    ),
    output: {
      filename: ifDevelopment(
        '[name].bundle.js',
        '[name].[contenthash].bundle.js'
      ),
      path: path.resolve(__dirname, 'build', 'assets'),
      publicPath: '/assets/'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json']
    },
    optimization: removeEmpty({
      runtimeChunk: ifProduction('single'),
      splitChunks: ifProduction({
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name (module) {
              try {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]

                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`
              } catch (err) { /* Picking up non node_modules stuff for some reason */ }
            }
          }
        }
      }),
      minimizer: ifProduction([
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        }),
        new OptimizeCSSAssetsPlugin({})
      ])
    }),
    plugins: [
      new LoadablePlugin(),
      ...ifDevelopment(
        [
          new webpack.HotModuleReplacementPlugin(),
          new FriendlyErrorsWebpackPlugin()
        ],
        [
          new webpack.HashedModuleIdsPlugin(),
          new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
          new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css'
          }),
          new CompressionPlugin({
            test: /\.js$|\.css$|\.html$/,
            threshold: 0,
            minRatio: 1
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
      },
      writeToDisk (filePath) {
        return /loadable-stats/.test(filePath)
      }
    }
  }
}
