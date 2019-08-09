import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';

//pass the root object to the combineReducers function 
//in order to create the rootReducer.
//the rootReducer will be an object wich contain OBJECTS 
//(every property will be an object created by the function that we pass)
export default combineReducers({
    user: userReducer
})