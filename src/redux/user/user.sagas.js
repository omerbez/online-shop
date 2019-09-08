import { takeLatest, put, all } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { googleProvider, auth, createUserIfNotExists, getCurrentUser } from '../../firebase/firebase.utils';

import { signInSuccess, signInFaild, signOutSuccess, signOutFaild } from './user.actions';


function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* signInWithGoogle() {
    try {
        //split out the "user" property that inside the object we will get from the api call
        const{ user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch(exception) {
        yield put(signInFaild(exception));
    }
}

function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

//The whole action object is passed as a parameter!
//so we distruct the payload which contains our email and pass
function* signInWithEmail({payload}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(payload.email, payload.pass);
        yield getSnapshotFromUserAuth(user);
    } catch(exception) {
        yield put(signInFaild(exception));
    }
}

function* getSnapshotFromUserAuth(userAuth) {
    try {
        const userRef = yield createUserIfNotExists(userAuth);
        const snapshot = yield userRef.get();
        yield put(signInSuccess({id:snapshot.id, ...snapshot.data()}));
    } catch(exception) {
        yield put(signInFaild(exception));
    }
}

function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if(userAuth)
            yield getSnapshotFromUserAuth(userAuth);
    } catch(exception) {
        yield put(signInFaild(exception));
    }
}

function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch(exception) {
        yield put(signOutFaild());
    }
}



export function* userSagas() {
    yield all([onGoogleSignInStart(), onEmailSignInStart(), onCheckUserSession(), onSignOutStart()])
}

