import React from 'react';
import './checkout-item.styles.scss';
import {connect} from 'react-redux';
import {removeItemFromCart, increaseItemQuantity, decreaseItemQuantity} from '../../redux/cart/cart.actions';

const CheckoutItem = (props) => (
    <div className="checkout-item">
        <div className="image-container">
            <img alt="item" src={props.cartItem.imageUrl}/>
        </div>

        <span className="name">{props.cartItem.name}</span>

        <span className="quantity">
            <div className="arrow" onClick={()=>props.decreaseQuantity(props.cartItem)}>&#10094;</div>
            <span className="value">{props.cartItem.quantity}</span>
            <div className="arrow" onClick={()=>props.increaseQuantity(props.cartItem)}>&#10095;</div>
        </span>

        <span className="price">{props.cartItem.price}</span>

        <div 
            className="remove-button"
            onClick={()=>props.removeItem(props.cartItem)}>
                &#10005;
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (item) => dispatch(removeItemFromCart(item)),
        increaseQuantity: (item) => dispatch(increaseItemQuantity(item)),
        decreaseQuantity: (item) => dispatch(decreaseItemQuantity(item))
    }
}

export default connect(null, mapDispatchToProps)(CheckoutItem);