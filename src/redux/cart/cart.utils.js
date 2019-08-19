export const addItemToCart = (item, cartItems) => {
    const exists = cartItems.find(i => i.id === item.id);
    if(exists) 
        //map the cart items to the same but increase the quantity of the exists item
        return cartItems.map(i => i.id === item.id ? {...i, quantity: i.quantity+1} : i);
    
    //else, return copy of the cart + new object which represent the item with
    //quantity of 1
    return [...cartItems, {...item, quantity:1}];
}

export const decreaseOrRemoveCartItem = (item, cartItems) => {
    if(item.quantity > 1)
        return cartItems.map((ci) => ci.id===item.id ? {...ci, quantity:ci.quantity-1} 
                                    : ci);
    
    return removeCartItem(item, cartItems);
}

export const removeCartItem = (item, cartItems) => {
    return cartItems.filter((ci) => ci.id!==item.id);
}