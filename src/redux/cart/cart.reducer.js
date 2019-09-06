import CartActionTypes from './cart.types';
import { addItemToCart, decreaseOrRemoveCartItem, removeCartItem} from './cart.utils';

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
};

const cartReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state, 
                hidden: !state.hidden
            };
        
        case CartActionTypes.ADD_ITEM:
            return {
                ...state, 
                cartItems: addItemToCart(action.payload, state.cartItems)
            };

        case CartActionTypes.REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: removeCartItem(action.payload, state.cartItems)
            }

        case CartActionTypes.INCREASE_ITEM_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map((item) => {
                    return item.id === action.payload.id ? 
                            {...item, quantity:item.quantity+1} : item;
                })
            }

        case CartActionTypes.DECREASE_ITEM_QUANTITY:
            return { 
                ...state,
                cartItems: decreaseOrRemoveCartItem(action.payload, state.cartItems)
            }

        case CartActionTypes.CLEAR_CART:
            return {
                ...state,
                cartItems: []
            }

        default:
            return state;
    }
}

export default cartReducer;