import React from 'react';
import { connect } from 'react-redux';
import { selectCartItems, selectCartTotalPrice } from '../../redux/cart/cart.selectors';
import "./checkout.styles.scss";
import CheckoutItem from '../../components/checkout-item/checkout-item.component';


const CheckoutPage = (props) => (
    <div className="checkout-page">
        <div className="checkout-header">
            <div className="header-block">
                <span>Product</span>
            </div>
            <div className="header-block">
                <span>Description</span>
            </div>
            <div className="header-block">
                <span>Quantity</span>
            </div>
            <div className="header-block">
                <span>Price</span>
            </div>
            <div className="header-block">
                <span>Remove</span>
            </div>
        </div>

        {props.cartItems.map((cartItem) => <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)}

        <div className="total">
            <span>Total: ${props.cartTotalPrice}</span>
        </div>
    </div>
);


const mapStateToProps = (rootReducer) => {
    return {
        cartItems: selectCartItems(rootReducer),
        cartTotalPrice: selectCartTotalPrice(rootReducer)
    }
}

export default connect(mapStateToProps)(CheckoutPage);