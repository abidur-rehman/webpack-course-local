import express from 'express'
const expressStaticGzip = require('express-static-gzip')
import webpack from 'webpack';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

import configDevClient from '../../config/webpack.dev-client.js';
import configDevServer from '../../config/webpack.dev-server.js';
import configProdClient from '../../config/webpack.prod-client.js';
import configProdServer from '../../config/webpack.prod-server.js';
const server = express();

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd
if (isDev) {

    const compiler = webpack([configDevClient, configDevServer]);
    const clientCompiler = compiler.compilers[0];
    const serverCompiler = compiler.compilers[1];

    // require('webpack-mild-compile')(compiler)

    const webpackDevMiddleware = require('webpack-dev-middleware')(
        compiler,
        configDevClient.devServer
    );

    const webpackHotMiddleware = require('webpack-hot-middleware')(
        clientCompiler,
        configDevClient.devServer
    );

    // Oder of using middlewares is important
    // 1. To use webpack-dev-middleware
    server.use(webpackDevMiddleware);

    // 2. To use webpack-hot-middleware
    server.use(webpackHotMiddleware);
    server.use(webpackHotServerMiddleware(compiler));
    console.log('Middleware enabled')
} else {
    webpack([configProdClient, configProdServer]).run((err, stats) => {
        console.log(stats.toString({ colors: true }));  // Deactivate this when not needed
        const clientStats = stats.toJson().children[0];
        const render = require('../../build/prod-server-bundle.js').default;
        // 3. To use static middleware
        server.use(expressStaticGzip('dist', {
            enableBrotli: true
        }));
        server.use(render({ clientStats }));
    });
}


const PORT = process.env.PORT || 8080
const ENV = process.env.NODE_ENV || 'development'

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT} in ${ENV}`)
})
