import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store';
import { AppContainer } from 'react-hot-loader';
import AppRoot from './components/AppRoot';

const store = configureStore(window.INITIAL_STATE);

function render(Component) {
    // renderMethod fixes console issue 'Warning: Expected server HTML to contain a matching node'
    const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
    renderMethod(
        <Provider store={store}>
            <AppContainer>
                <Component />
            </AppContainer>
        </Provider>,
        document.getElementById('react-root')
    )
}

render(AppRoot);

if(module.hot) {
    module.hot.accept('./components/AppRoot.js', () => {
        const NextApp = require('./components/AppRoot').default;
        render(NextApp);
    })
}