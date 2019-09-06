import React from 'react';
import { Switch, Route, Redirect} from "react-router-dom";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndUp from "./pages/sign-in-up/sign-in-up.component";
import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';
import { GlobalStyles } from './global.styles';


class App extends React.Component
{
   
    componentDidMount() {
        this.props.checkLoginSession();
    }

    handleSigninRoute = () => {
        if(this.props.user) {
            return <Redirect to="/"/>;
        } else {
            return <SignInAndUp/>;
        }
    }

    render() {
        return (
            <div>
                <GlobalStyles/>
                <Header/>
                <Switch>
                    <Route exact path="/" component={Homepage}/>
                    <Route path="/shop" component={ShopPage}/>
                    <Route exact path="/checkout" component={CheckoutPage}/>
                    <Route exact path="/signin" render={this.handleSigninRoute}/>
                </Switch>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkLoginSession: () => dispatch(checkUserSession())
    }
}

//bring the user state into the component as a prop to check if user is sign-in already
const mapStateToProps = (rootReducer) => {
    return {
        user: selectCurrentUser(rootReducer)
    };
}

//HOC pattern, return a "Super App Object" that contains our actions
//at the props property, so we will invoke them by: this.props.setUserAction
export default connect(mapStateToProps, mapDispatchToProps)(App);