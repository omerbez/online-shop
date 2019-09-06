import UserActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    error: null
}

//each action will have type and payload attributes.
//the reducer returns the new props object
const userReducer = (state=INITIAL_STATE, action) => {
    //actions from the actions file..
    switch(action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            };

        case UserActionTypes.SIGN_IN_FAILD:
        case UserActionTypes.SIGN_OUT_FAILD:
            return {
                ...state,
                error: action.payload
            }

        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            }
        
        default: 
            return state;
    }
}

export default userReducer;