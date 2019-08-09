import React from 'react';
import { Switch, Route } from "react-router-dom";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndUp from "./pages/sign-in-up/sign-in-up.component";
import "./App.css";
import { auth, createUserIfNotExists } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component
{
   
    constructor() {
        super();

        //method which we get from the auth.onAuthStateChanged() function
        //So we can unsbscribe when component destroyed..
        this.unsbscribeMethod = null;
    }

    componentDidMount() {
        //will be called when sign-in & sign-out
        this.unsbscribeMethod = auth.onAuthStateChanged(async (user) => {
            
            if(user) {
                //create user profile if not exists and get user doc ref.
                const userRef = await createUserIfNotExists(user);
                userRef.onSnapshot((snapshot) => {
                    this.props.setUserAction({
                        id: snapshot.id,
                        ...snapshot.data()
                    });
                })
            }
            else {
                //if sign-out..
                this.props.setUserAction(null);
            }
        });
    }

    componentWillUnmount() {
        this.unsbscribeMethod();
    }

    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/" component={Homepage}/>
                    <Route path="/shop" component={ShopPage}/>
                    <Route path="/signin" component={SignInAndUp}/>
                </Switch>
            </div>
        );
    }
}

//map between our action name(that we choose) to the real action function.
//instead of setState we will call this action name and pass the user data
//that we want to update the component with.
const mapDispatchToProps = (dispatch) => {
    return ({
        setUserAction: (user) => {return dispatch(setCurrentUser(user))}
    });
}

//HOC pattern, return a "Super App Object" that contains our actions
//at the props property, so we will invoke them by: this.props.setUserAction
export default connect(null, mapDispatchToProps)(App);