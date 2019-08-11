import React from 'react';
import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

const CartIcon = (props) => (
    <div className="cart-icon" onClick={props.toggleCart}>
        <ShoppingIcon className="shopping-icon"/>
        <span className="item-count">0</span>
    </div>
);

//map dispach-functions(value) to props names(key)
const mapDispatchToPrps = (dispatch) => {
    return {
        toggleCart: ()=>{dispatch(toggleCartHidden())}
    };
}

export default connect(null, mapDispatchToPrps)(CartIcon);