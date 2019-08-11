import React from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import './header.styles.scss';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

const showSignOption = (theUser) => {
    //if not null and not undefined..
    if(theUser) {
        return(
            <div className="option" onClick={()=>auth.signOut()}>
                SIGN OUT
            </div>
        )
    }
    //if not connected
    return(
        <Link className="option" to="/signin">
                SIGN IN
        </Link>
    );
}

const Header = (props) => (
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className="logo"/>
        </Link>

        <div className="options">
            <Link className="option" to="/shop">
                SHOP
            </Link>

            <Link className="option" to="/shop">
                CONTACT
            </Link>

            {showSignOption(props.theUser)}

            <CartIcon/>
        </div>

        {props.cartHidden ? null : <CartDropdown/>}
    </div>
);

//map the state which in the rootReducer to the props, we actually return the
//props object which will be passed to the component, because
//here we have access to the rootRecucer.
const mapStateToProps = (rootReducer) => {
    return {        
        theUser: rootReducer.user.currentUser,
        cartHidden: rootReducer.cart.hidden
    };
};

//the connect function return a HOC that will wrap the header component.
const connector = connect(mapStateToProps);

export default connector(Header);