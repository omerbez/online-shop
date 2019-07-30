import React from 'react';
import {Switch, Route} from "react-router-dom";
import Homepage from "./pages/homepage/homepage.component"
import "./App.css";

function App() {

    const HatsPage = () => {
        return <div>
            <h1>Hats Page</h1>
        </div>
    };

    return (
        <div>
            <Switch>
                <Route exact path="/" component={Homepage}/>
                <Route path="/shop/hats" component={HatsPage}/>
            </Switch>
        </div>
    );
}

export default App;