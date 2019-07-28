import React from "react";
import "./menu-item.styles.scss";

const MenuItem = ({title, imageURL, size}) => {
    //create inline styling of react
    const inlineStyle = {
        backgroundImage: "url("+imageURL+")"
    }

    //the div className will be "large menu-item" if the size is defined..
    return  <div className={`${size} menu-item`}>
                <div className="background-image" style={inlineStyle} />
                <div className="content">
                    <h1 className="title">{title.toUpperCase()}</h1>
                    <span className="subtitle">Shop NOW!</span>
                </div>
            </div>
};

export default MenuItem;