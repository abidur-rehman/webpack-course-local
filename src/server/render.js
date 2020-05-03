import React from "react";
import { renderToString } from "react-dom/server";
import Data from '../../data/bio'
const AppRoot = require("../components/AppRoot").default

export default () => (req, res) => {
    res.send(`
          <html>
            <head>
              <title>My page!</title>
              <link rel="stylesheet" href="/main.css"/>
            </head>
            <body>
              <div id="react-root">${renderToString(<AppRoot heading={Data.heading} content={Data.bioText}/>)}</div>
              <script src='main-bundle.js'></script>
            </body>
          </html>
       `)
}