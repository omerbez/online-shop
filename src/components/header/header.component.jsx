import React from 'react';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'

import {HeaderDivContainer, LogoLinkContainer, 
    OptionsDivContainer, OptionLink, OptionDiv} from './header.styles';

import { signOutStart } from '../../redux/user/user.actions'


const Header = (props) => (
    <HeaderDivContainer>
        <LogoLinkContainer to="/">
            <Logo className="logo"/>
        </LogoLinkContainer>

        <OptionsDivContainer>
            <OptionLink to="/shop">
                SHOP
            </OptionLink>

            <OptionLink to="/shop">
                CONTACT
            </OptionLink>

            {showSignOption(props)}

            <CartIcon/>
        </OptionsDivContainer>

        {props.cartHidden ? null : <CartDropdown/>}
    </HeaderDivContainer>
);

const showSignOption = (props) => {
    //if not null and not undefined..
    if(props.theUser) {
        return(
            <OptionDiv onClick={props.startSignOut}>
                SIGN OUT
            </OptionDiv>
        )
    }
    //if not connected
    return(
        <OptionLink to="/signin">
                SIGN IN
        </OptionLink>
    );
}


//map the state which in the rootReducer to the props, we actually return the
//props object which will be passed to the component, because
//here we have access to the rootRecucer.
const mapStateToProps = (rootReducer) => {
    return {        
        theUser: selectCurrentUser(rootReducer),
        cartHidden: selectCartHidden(rootReducer)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startSignOut: () => dispatch(signOutStart())
    }
}

//the connect function return a HOC that will wrap the header component.
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Header);