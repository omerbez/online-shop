import { createSelector } from 'reselect';

const selectShop = (rootReducer) => rootReducer.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    (shop) => shop.collections
);


//Note that the function return a selector! The selector is a function too! it gets
//the rootReducer as a parameter!
export const selectCollection = (collectionUrlParam) => {
    return createSelector(
                [selectShopCollections],
                //DATA NORMALIZATION - find with O(1) time
                (allColections) => allColections ? allColections[collectionUrlParam] : null 
            );
}

//parse the collections from object to array
export const selectCollectionsForPreview = createSelector(
    [selectShopCollections],
    (collections) => (collections ? Object.values(collections) : [])
);

export const selectIsFetching = createSelector(
    [selectShop],
    (shop) => shop.collections ? false : true
)
