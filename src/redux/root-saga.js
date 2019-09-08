import { all } from 'redux-saga/effects';
import { listenerToCollectionsFetch } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';
import { cartSagas } from './cart/cart.sagas';

export default function* rootSaga() {
    yield all([listenerToCollectionsFetch(), userSagas(), cartSagas()]);
}