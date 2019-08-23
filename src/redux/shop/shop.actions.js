import ShopActionTypes from './shop.types';


export const updateCollections = (collectionsMapData) => {
    return {
        type: ShopActionTypes.UPDATE_SHOP_COLLECTION,
        payload: collectionsMapData
    }
}