import express from 'express'

const webpack = require('webpack');
const config = require('../../config/webpack.dev.js');
const compiler = webpack(config);

const app = express();

const webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler,
    config.devServer
);

const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);

// Oder of using middlewares is important
// 1. To use webpack-dev-middleware
app.use(webpackDevMiddleware);

// 2. To use webpack-hot-middleware
app.use(webpackHotMiddleware);

// 3. To use static middleware
const staticMiddleware = express.static("dist");

app.use(staticMiddleware);

app.listen(8080, () => {
    console.log("Server is listening");
})
