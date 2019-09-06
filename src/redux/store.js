import { createStore, applyMiddleware} from 'redux';
import rootReducer from './root-reducer';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';

import createReduxSagaMiddleware from 'redux-saga';
import rootSage from './root-saga';

const sageMiddleware = createReduxSagaMiddleware();

//pointer to all our funcntions which will be invoked at the middleware
const middlewares = [sageMiddleware]; 

if(process.env.NODE_ENV === "development") {
    //apply the logger only during development
    middlewares.push(logger);
}

//create the store
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sageMiddleware.run(rootSage);

//create the store persistor
export const persistor = persistStore(store);
