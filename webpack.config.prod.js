// Configuración pensada para usar junto con GH-Pages
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');

const DIST_FOLDER = 'docs';

const entryNames = (() => {
  const files = glob.sync('./src/js/*.js');
  const entries = files.reduce((acc, filepath) => {
    const fileName = filepath.slice(filepath.lastIndexOf('/') + 1).split('.')[0];
    return { ...acc,  [fileName]: filepath }
  }, {});
  return entries;
})();

const htmlEntries = Object.keys(entryNames).map((key) => {
  return new HtmlWebpackPlugin({
      inject: true,
      template: `./src/${key}.html`,
      filename: `./${key}.html`,
      scriptLoading: 'defer',
      dependsOn: 'shared',
  })
})

module.exports = {
  entry: {
    shared: './shared.js',
    ...entryNames
  },
  output: {
    path: path.resolve(__dirname, DIST_FOLDER),
    filename: './js/[name].[contenthash].js',
    assetModuleFilename: 'assets/images/[hash][ext][query]',
  },
  mode: 'production',
  resolve: {
    extensions: ['.js'],
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/scss/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
            name: '[name].[contentHash].[ext]',
            outputPath: './assets/fonts',
            publicPath: '../assets/fonts',
            esModule: false,
          }
        }
      },
    ],
  },
  plugins: [
    ...htmlEntries,
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'assets/img'),
          to: 'assets/img',
        }
      ]
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ]
  }
}