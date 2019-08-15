import { createSelector } from 'reselect';

const selectCart = (rootReducer) => rootReducer.cart;

//function that gets 2 parameters: one is array of selectors(pointer to function that return
// an object - what we select...), and the other is a function that get those objects
//as a parameters and return a cached selector(the value that we want to cache)..
export const selectCartItems = createSelector([selectCart], (cart) => cart.cartItems);

//again, we pass the cartItems selector, and a function that will get the
//function result(the cart items) and return the desired value + cache it!
export const selectCartItemsCount = createSelector([selectCartItems], (items) => {
    let counter = 0;
    for(let i=0; i<items.length; i++)
        counter += items[i].quantity;
    
    return counter;
});

export const selectCartTotalPrice = createSelector([selectCartItems], (items) => {
    let sum = 0;
    for(let i=0; i<items.length; i++)
        sum += items[i].quantity * items[i].price;
    
    return sum;
});

export const selectCartHidden = createSelector([selectCart], (cart) => cart.hidden);