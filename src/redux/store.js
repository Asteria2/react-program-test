import {
  createStore,
  applyMiddleware
} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import {
  composeWithDevTools
} from 'redux-devtools-extension';
const middleware = process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
export default createStore(reducers, middleware);