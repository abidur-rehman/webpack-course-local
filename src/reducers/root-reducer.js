import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import article from './ArticleReducer';

const rootReducer = combineReducers({
    article,
    routing: routerReducer
});

export default rootReducer;