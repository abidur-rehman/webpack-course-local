const path = require("path")
const webpack = require("webpack")
var nodeExternals = require("webpack-node-externals")

module.exports = {
    name: 'server',
    target: "node",
    externals: nodeExternals(),
    entry: './src/server/render.js',
    mode: "development",
    output: {
        filename: "prod-server-bundle.js",
        path: path.resolve(__dirname, "../build"),
        libraryTarget: "commonjs2"
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
                use: [
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.(jpg|gif|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "images/[name].[ext]",
                            emitFile: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ]
}