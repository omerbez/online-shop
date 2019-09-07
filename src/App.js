import React, {lazy, Suspense} from 'react';
import { Switch, Route, Redirect} from "react-router-dom";
import Homepage from "./pages/homepage/homepage.component";
import Header from "./components/header/header.component";
import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';
import { GlobalStyles } from './global.styles';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';


const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));
const SignInAndUp = lazy(() => import("./pages/sign-in-up/sign-in-up.component"));


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
                    <ErrorBoundary>
                        <Suspense fallback={<Spinner/>}>
                            <Route exact path="/" component={Homepage}/>
                            <Route path="/shop" component={ShopPage}/>
                            <Route exact path="/checkout" component={CheckoutPage}/>
                            <Route exact path="/signin" render={this.handleSigninRoute}/>
                        </Suspense>
                    </ErrorBoundary>
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