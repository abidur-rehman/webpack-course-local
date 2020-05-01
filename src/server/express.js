import express from 'express'
const server = express();

const isProd = process.env.NODE_ENV === "production"
if (!isProd) {
    const webpack = require('webpack');
    const config = require('../../config/webpack.dev.js');
    const compiler = webpack(config);

    const webpackDevMiddleware = require('webpack-dev-middleware')(
        compiler,
        config.devServer
    );

    const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);

    // Oder of using middlewares is important
    // 1. To use webpack-dev-middleware
    server.use(webpackDevMiddleware);

    // 2. To use webpack-hot-middleware
    server.use(webpackHotMiddleware);
}

// 3. To use static middleware
const expressStaticGzip = require('express-static-gzip')
server.use(expressStaticGzip("dist", {
    enableBrotli: true
}));

const PORT = process.env.PORT || 8080

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT} in ${process.env.NODE_ENV}`)
})
