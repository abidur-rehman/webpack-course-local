const path = require('path')
const webpack = require('webpack')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')

module.exports = {
    name: 'client',
    entry: {
        main: [
            'react-hot-loader/patch',
            'babel-runtime/regenerator',
            '@babel/register',
            'webpack-hot-middleware/client?reload=true',
            './src/main.js'
        ]
    },
    mode: 'development',
    output: {
        filename: '[name]-bundle.js',
        chunkFilename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    devServer : {
      contentBase: 'dist',
      overlay: true,
      hot: true
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
                    {
                        loader: ExtractCssChunks.loader,
                        options: {
                            hot: true,
                            reloadAll: true
                        }
                    },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    {
                        loader: ExtractCssChunks.loader,
                        options: {
                            hot: true,
                            reloadAll: true
                        }
                    },
                    { loader: 'css-loader' },
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
        new ExtractCssChunks({ hot: true }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                WEBPACK: true
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}