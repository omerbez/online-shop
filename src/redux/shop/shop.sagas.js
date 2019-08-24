import { takeEvery, call, put } from 'redux-saga/effects';
import { firestore,  parseShopCollectionSnapshot} from '../../firebase/firebase.utils';
import { notifyFetchSuccess, notifyFetchFailure } from './shop.actions';


import ShopActionTypes from './shop.types';



export function* fetchCollectionsData() {
    try {
        const collectionRef = firestore.collection("collections");
        
        //wait for the asynchronized fetching to finish..
        const snapshot = yield collectionRef.get();

        //call the function, accept a ref to the function to call and it's parameters
        const collectionMap = yield call(parseShopCollectionSnapshot, snapshot);

        //put = dispach in redux-sage
        yield put(notifyFetchSuccess(collectionMap));
    } 
    catch(error) {
        yield put(notifyFetchFailure(error.message));
    }
}


export function* listenerToCollectionsFetch() {
    yield takeEvery(ShopActionTypes.ON_FETCH_COLLECTIONS_START,  fetchCollectionsData);
}