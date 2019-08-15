import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import "./cart-dropdown.styles.scss";
import CartItem from '../cart-item/cart-item.component';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import {toggleCartHidden} from '../../redux/cart/cart.actions';

const CartDropdown = (props) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {   
                props.cartItems.length > 0 
                ?
                props.cartItems.map(item => <CartItem key={item.id} item={item}/>)
                :
                <span className="empty-message">Your cart is empty</span>
            }
        </div>
        <CustomButton 
            onClick={ () => {
                props.history.push("/checkout");
                props.dispatch(toggleCartHidden());}}>
                    GO TO CHECKOUT
        </CustomButton>
    </div>
);


const mapStateToProps = (rootReducer) => {
    return{
        //cartItems: rootReducer.cart.cartItems
        cartItems: selectCartItems(rootReducer)
    };
}

//if we dont pass the second argument (mapDispatchToProps) to the connect
//function, it will pass to us the dispatch function in the props!!
export default withRouter(connect(mapStateToProps)(CartDropdown));