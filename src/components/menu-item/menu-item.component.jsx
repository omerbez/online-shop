import React from "react";
import {withRouter} from 'react-router-dom';
import "./menu-item.styles.scss";

const MenuItem = ({title, imageURL, size, linkUrl, match,  history}) => {
    //create inline styling of react
    const inlineStyle = {
        backgroundImage: "url("+imageURL+")"
    }

    //the div className will be "large menu-item" if the size is defined..
    return  <div 
                className={`${size} menu-item`}
                onClick={() => history.push(match.url+""+linkUrl)}>
                <div className="background-image" style={inlineStyle} />
                <div className="content">
                    <h1 className="title">{title.toUpperCase()}</h1>
                    <span className="subtitle">Shop NOW!</span>
                </div>
            </div>
};

//HOC withRouter - gives us Route props..
export default withRouter(MenuItem);