import React from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import './header.styles.scss';
import { auth } from '../../firebase/firebase.utils';


const showSignOption = (currentUser) => {
    //if not null and not undefined..
    if(currentUser) {
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

            {showSignOption(props.currentUser)}
        </div>
    </div>
);

export default Header;