const path = require("path")
const webpack = require("webpack")
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const HTMLWebpackPlugin = require("html-webpack-plugin");

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
    mode: "development",
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/"
    },
    devServer : {
      contentBase: "dist",
      overlay: true,
      hot: true
    },
    devtool: "source-map",
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
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: {
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    }
                })
            },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ["img:src"]
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
                            name: "[name].[ext]",
                            outputPath: 'images/',
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development"),
                WEBPACK: true
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        // new HTMLWebpackPlugin({
        //     template: './src/index.html'
        // })
    ]
}