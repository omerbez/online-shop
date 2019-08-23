import { createStore, applyMiddleware} from 'redux';
import rootReducer from './root-reducer';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';

//pointer to all our funcntions which will be invoked at the middleware
const middlewares = []; 
if(process.env.NODE_ENV === "development") {
    //apply the logger only during development
    middlewares.push(logger);
}

//create the store
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

//create the store persistor
export const persistor = persistStore(store);
