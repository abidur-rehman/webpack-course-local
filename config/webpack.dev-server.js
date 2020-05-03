const path = require('path')
const webpack = require('webpack')
const externals = require('./node-externals')

module.exports = {
    name: 'server',
    target: 'node',
    externals,
    entry: './src/server/render.js',
    mode: 'development',
    output: {
        filename: 'dev-server-bundle.js',
        path: path.resolve(__dirname, '../build'),
        libraryTarget: 'commonjs2'
    },
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
                test: /\.css$/,
                use: { loader: 'css-loader' }
            },
            {
                test: /\.sass$/,
                use: [
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.(jpg|gif|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]',
                            emitFile: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ]
}