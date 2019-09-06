import UserActionTypes from './user.types';


export const googleSignInStart = () => {
    return {
        type: UserActionTypes.GOOGLE_SIGN_IN_START
    }
}

export const signInSuccess = (user) => {
    return {
        type: UserActionTypes.SIGN_IN_SUCCESS,
        payload: user
    }
}

export const signInFaild = (errorMessage) => {
    return {
        type: UserActionTypes.SIGN_IN_FAILD,
        payload: errorMessage
    }
}

export const startEmailSignIn = (emailAndPass) => {
    return {
        type: UserActionTypes.EMAIL_SIGN_IN_START,
        payload: emailAndPass
    }
}

export const checkUserSession = () => {
    return {
        type: UserActionTypes.CHECK_USER_SESSION
    }
}

export const signOutStart = () => {
    return {
        type: UserActionTypes.SIGN_OUT_START
    }
}

export const signOutSuccess = () => {
    return {
        type: UserActionTypes.SIGN_OUT_SUCCESS
    }
}

export const signOutFaild = (error) => {
    return {
        type: UserActionTypes.SIGN_OUT_FAILD,
        payload: error
    }
}