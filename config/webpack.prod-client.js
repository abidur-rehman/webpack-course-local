const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin');
//removes duplicate css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')

module.exports = {
    name: 'client',
    entry: {
        main: './src/main.js'
    },
    mode: 'production',
    output: {
        filename: '[name]-bundle.js',
        chunkFilename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'react-hot-loader/webpack'
                    }
                ],
                include: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    { loader: ExtractCssChunks.loader },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    { loader: ExtractCssChunks.loader },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]',
                            }
                        }
                    },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src']
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|gif|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new OptimizeCSSAssetsPlugin(),
        new ExtractCssChunks(),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new MinifyPlugin(),
        new CompressionPlugin({
            algorithm: 'gzip'
        }),
        new BrotliPlugin()
    ]
}