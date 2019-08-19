import { combineReducers } from 'redux';
import {persistReducer} from 'redux-persist';

//for local storge (session storge is in other path)
import storage from 'redux-persist/lib/storage'; 

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';


const persistConfig = {
    key: "root",
    storage,
    whitelist: ["cart"] //strings of the reducers name that we want to persist
}

//pass the root object to the combineReducers function 
//in order to create the rootReducer.
//the rootReducer will be an object wich contain OBJECTS 
//(every property will be an object created by the function that we pass)
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);