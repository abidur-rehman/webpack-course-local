const path = require("path")
const webpack = require("webpack")
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
//removes duplicate css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = env => {
    return {
        entry: {
            main: './src/main.js'
        },
        mode: "production",
        output: {
            filename: "[name]-bundle.js",
            path: path.resolve(__dirname, "../dist"),
            publicPath: "/"
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
                    use: [
                        { loader: MiniCSSExtractPlugin.loader },
                        { loader: 'css-loader' }
                    ]
                },
                {
                    test: /\.sass$/,
                    use: [
                        { loader: MiniCSSExtractPlugin.loader },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: "[name]--[local]",
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
            new OptimizeCSSAssetsPlugin(),
            new MiniCSSExtractPlugin({
                filename: "[name]-[contenthash].css"
            }),
            new HTMLWebpackPlugin({
                template: './src/index.html'
            }),
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify(env.NODE_ENV)
                }
            }),
            new MinifyPlugin(),
            new CompressionPlugin({
                algorithm: "gzip"
            }),
            new BrotliPlugin()
        ]
    }
}