import ShopActionTypes from './shop.types';


export const notifyFetchStart = () => {
    return {
        type: ShopActionTypes.ON_FETCH_COLLECTIONS_START
    }
}

export const notifyFetchSuccess = (result) => {
    return {
        type: ShopActionTypes.ON_FETCH_COLLECTIONS_SUCCESS,
        payload: result
    }
}

export const notifyFetchFailure = (errorMessage) => {
    return {
        type: ShopActionTypes.ON_FETCH_COLLECTIONS_FAILURE,
        payload: errorMessage
    }
}