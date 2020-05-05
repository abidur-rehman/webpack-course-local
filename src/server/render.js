import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import configureStore from '../store';
import { Provider } from 'react-redux';
import Routes from '../components/Routes';
import { fetchArticle } from '../actions/ArticleActions'

import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'

export default ({ clientStats }) => (req, res) => {
    const context = {}
    const store = configureStore();

    const loadArticle = () => {
        return store.dispatch(fetchArticle())
    }

    const app = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.originalUrl} context={context}>
                <Routes />
            </StaticRouter>
        </Provider>
    )

    const template = () => {
        const { js, styles, cssHash } = flushChunks(clientStats, {
            chunkNames: flushChunkNames()
        })

    return `
      <html>
        <head>
          ${styles}
        </head>
        <body>
          <div id="react-root">${app}</div>
          ${js}
          <script>
            window.INITIAL_STATE = ${JSON.stringify(store.getState())}
          </script>
          ${cssHash}
        </body>
      </html>
    `
    }

    if (req.path === '/article') {
        const promise = loadArticle()
        promise.then(_ => {
            res.send(template())
        })
    } else {
        res.send(template())
    }
}