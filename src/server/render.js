import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router"
import Routes from "../components/Routes"

export default () => (req, res) => {
    res.send(`
          <html>
            <head>
              <title>My page!</title>
              <link rel="stylesheet" href="/main.css"/>
            </head>
            <body>
              <div id="react-root">${renderToString(
                <StaticRouter location={req.originalUrl} context={{}}>
                    <Routes />
                </StaticRouter>
              )}</div>
              <script src='main-bundle.js'></script>
            </body>
          </html>
       `)
}