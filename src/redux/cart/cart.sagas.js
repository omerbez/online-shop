import { all, takeLatest, put, select } from 'redux-saga/effects';

import { getUserCartRef } from '../../firebase/firebase.utils';
import UserActionTypes from '../user/user.types';
import { selectCurrentUser } from '../user/user.selectors';
import { clearCart, setCartFromFirebase } from './cart.actions';
import { selectCartItems } from './cart.selectors';
import CartActionTypes from './cart.types';


function* clearCartOnSignOut() {
  yield put(clearCart());
}

function* updateCartInFirebase() {
  const currentUser = yield select(selectCurrentUser);
  if (currentUser) {
    try {
      const cartRef = yield getUserCartRef(currentUser.id);
      const cartItems = yield select(selectCartItems);
      yield cartRef.update({ cartItems });
    } catch (error) {
      console.log(error);
    }
  }
}

function* checkCartFromFirebase({ payload: user }) {
  const cartRef = yield getUserCartRef(user.id);
  const cartSnapshot = yield cartRef.get();
  yield put(setCartFromFirebase(cartSnapshot.data().cartItems));
}

function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

function* onUserSignIn() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, checkCartFromFirebase);
}

function* onCartChange() {
  yield takeLatest(
    [
      CartActionTypes.ADD_ITEM,
      CartActionTypes.REMOVE_CART_ITEM,
      CartActionTypes.CLEAR_CART
    ],
    updateCartInFirebase
  );
}

export function* cartSagas() {
  yield all([onSignOutSuccess(), onCartChange(), onUserSignIn()]);
}