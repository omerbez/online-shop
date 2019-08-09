import { createStore, applyMiddleware} from 'redux';
import rootReducer from './root-reducer';
import logger from 'redux-logger';


//pointer to all our funcntions which will be invoked at the middleware
const middlewares = [logger]; 

//create the store
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;