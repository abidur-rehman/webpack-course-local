import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from "react-hot-loader";
import AppRoot from "./components/AppRoot";
import Data from '../data/bio'

function render(Component) {
    ReactDOM.render(
        <AppContainer>
            <Component heading={Data.heading} content={Data.bioText}/>
        </AppContainer>,
        document.getElementById("react-root")
    )
}

render(AppRoot);

if(module.hot) {
    module.hot.accept("./components/AppRoot.js", () => {
        const NextApp = require('./components/AppRoot').default;
        render(NextApp);
    })
}