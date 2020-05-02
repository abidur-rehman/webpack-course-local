const path = require("path")
const webpack = require("webpack")
var nodeExternals = require("webpack-node-externals")

module.exports = env => {
    return {
        target: "node",
        externals: nodeExternals(),
        entry: {
            server: ['./src/server/main.js']
        },
        mode: "development",
        output: {
            filename: "[name]-bundle.js",
            path: path.resolve(__dirname, "../build")
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
                    NODE_ENV: JSON.stringify(env.NODE_ENV)
                }
            })
        ]
    }
}