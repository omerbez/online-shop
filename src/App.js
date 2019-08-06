import React from 'react';
import { Switch, Route } from "react-router-dom";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndUp from "./pages/sign-in-up/sign-in-up.component";
import "./App.css";
import { auth, createUserIfNotExists } from './firebase/firebase.utils';

class App extends React.Component
{
   
    constructor() {
        super();
        this.state = {
            currentUser: null
        }
        
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
                    this.setState({ currentUser: {
                        id: snapshot.id,
                        ...snapshot.data()
                    }});
                })
            }
            else {
                //if sign-out..
                this.setState({ currentUser: null});
            }
        });
    }

    componentWillUnmount() {
        this.unsbscribeMethod();
    }

    render() {
        return (
            <div>
                <Header currentUser={this.state.currentUser}/>
                <Switch>
                    <Route exact path="/" component={Homepage}/>
                    <Route path="/shop" component={ShopPage}/>
                    <Route path="/signin" component={SignInAndUp}/>
                </Switch>
            </div>
        );
    }
}

export default App;