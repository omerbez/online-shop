import React from 'react';
import Spinner from '../spinner/spinner.component';

const WithSpinner = (WrappedComponent) => {
    //return the Spinner component or the wrappedComponent
    const spinner = ({isFetching, ...otherProps}) => {
        return isFetching ? <Spinner/> : <WrappedComponent {...otherProps}/>;
    }

    return spinner;
}

export default WithSpinner;