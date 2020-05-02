import React from 'react';
import express from 'express'
const expressStaticGzip = require("express-static-gzip")
import { renderToString } from 'react-dom/server';
const server = express();

const isProd = process.env.NODE_ENV === "production"
const isDev = !isProd
if (isDev) {
    const webpack = require('webpack');
    const config = require('../../config/webpack.dev.js');
    const compiler = webpack(config);
    require("webpack-mild-compile")(compiler)

    const webpackDevMiddleware = require('webpack-dev-middleware')(
        compiler,
        config.devServer
    );

    const webpackHotMiddleware = require('webpack-hot-middleware')(
        compiler,
        config.devServer
    );

    // Oder of using middlewares is important
    // 1. To use webpack-dev-middleware
    server.use(webpackDevMiddleware);

    // 2. To use webpack-hot-middleware
    server.use(webpackHotMiddleware);
    console.log("Middleware enabled")
} else {
    const AppRoot = require("../components/AppRoot").default
    // 3. To use static middleware
    server.use(expressStaticGzip("dist", {
        enableBrotli: true
    }));

    server.get("*", (req, res) => {
      res.send(`
          <html>
            <head>
              <title>My Page!</title>
              <link rel="stylesheet" href="/main.css"/>
            </head>
            <body>
              <div id="react-root">
                ${renderToString(<AppRoot/>)}
              </div>
              <script src='main-bundle.js'></script>
            </body>
          </html>
       `);
    });
}


const PORT = process.env.PORT || 8080
const ENV = process.env.NODE_ENV || 'development'

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT} in ${ENV}`)
})
