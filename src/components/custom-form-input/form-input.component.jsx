import React from 'react';
import "./form-input.styles.scss";


const handleLabel = (label, inputValue) => {
    if(label === undefined || label === null)
        return null;
    
    const cn = (inputValue.length > 0 ? "shrink " : "") + "form-input-label";
    return(
        <label className={cn}>
            {label}
        </label>
    );
}

//destruction + spread..
const CustomFormInput = ({label, value, ...otherProps}) => (
    <div className="group">
        <input className="form-input" value={value} {...otherProps}/>
        {handleLabel(label, value)}
    </div>
)

export default CustomFormInput;