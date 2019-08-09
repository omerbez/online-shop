import React from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import './header.styles.scss';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';


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
        </div>
    </div>
);

const mapStateToProps = (rootReducer) => {
    return (
        //map the rootReducer to the props, we actually return the
        //props object which will be passed to the component.
        {theUser: rootReducer.user.currentUser}
    )
};

//the connect function return a HOC that will wrap the header component.
const connector = connect(mapStateToProps);

export default connector(Header);