import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import "./cart-dropdown.styles.scss";
import CartItem from '../cart-item/cart-item.component';
import { connect } from 'react-redux';


const CartDropdown = (props) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                props.cartItems.map(item => <CartItem key={item.id} item={item}/>)
            }
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
);


const mapStateToProps = (rootReducer) => {
    return{
        cartItems: rootReducer.cart.cartItems
    };
}

export default connect(mapStateToProps)(CartDropdown);