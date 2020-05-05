import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/root-reducer';
import thunk from 'redux-thunk'

const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose

const enhancer = composeEnhancers(applyMiddleware(thunk))

export default initialState => {
    const store = createStore(rootReducer, initialState, enhancer)
    if (module.hot) {
        module.hot.accept("../reducers/root-reducer", () => {
                const nextRootReducer = require('../reducers/root-reducer');
                store.replaceReducer(require(nextRootReducer));
            }
        )
    }

    return store
}