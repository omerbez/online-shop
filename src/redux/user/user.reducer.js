const INITIAL_STATE = {
    currentUser: null
}

//each action will have type and payload attributes.
//the reducer returns the new props object
const userReducer = (state=INITIAL_STATE, action) => {
    //actions from the actions file..
    switch(action.type) {
        case "SET_CURRENT_USER":
            return {
                ...state,
                currentUser: action.payload
            };

        default: 
            return state;
    }
}

export default userReducer;