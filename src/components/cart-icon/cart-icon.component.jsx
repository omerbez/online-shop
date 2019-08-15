import React from 'react';
import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';


const CartIcon = (props) => (
    <div className="cart-icon" onClick={props.toggleCart}>
        <ShoppingIcon className="shopping-icon"/>
        <span className="item-count">{props.itemCount}</span>
    </div>
);

//map dispach-functions(value) to props names(key)
const mapDispatchToPrps = (dispatch) => {
    return {
        toggleCart: ()=>{return dispatch(toggleCartHidden())}
    };
}

const mapStateToProps = (rootReducer) => {
    // let counter = 0;
    // for(let i=0; i<rootReducer.cart.cartItems.length; i++)
    //     counter += rootReducer.cart.cartItems[i].quantity;

    return {
        itemCount: selectCartItemsCount(rootReducer)
    }
}

export default connect(mapStateToProps, mapDispatchToPrps)(CartIcon);