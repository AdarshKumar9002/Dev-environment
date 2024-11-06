const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BabelLoader = require('babel-loader'); 

module.exports = {
  mode: 'production',
  entry: {
    home: ['core-js/stable', 'regenerator-runtime/runtime', './src/assets/script/pages/home.js'],  // Polyfills and script entry
  },
  output: {
    filename: 'assets/script/bundle-[fullhash].min.js',  
    path: path.resolve(__dirname, 'dist'),
    sourceMapFilename: 'assets/script/[file].map', 
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'entry', 
                  corejs: 3,  
                  targets: '> 0.25%, not dead',  
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[hash][ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),  
    new MiniCssExtractPlugin({
      filename: 'assets/style/bundle-[fullhash].min.css',  
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html', 
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),  
    ],
  },
  devtool: 'source-map', 
  resolve: {
    extensions: ['.js', '.json'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
};
