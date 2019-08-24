import React from 'react';
import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';


const WithSpinner = (WrappedComponent) => {
    //return the Spinner component or the wrappedComponent
    const spinner = ({isFetching, ...otherProps}) => {
        if(isFetching) {
            return(
                <SpinnerOverlay>
                    <SpinnerContainer/>
                </SpinnerOverlay>
            );
        }
        return <WrappedComponent {...otherProps}/>;
    }

    return spinner;
}

export default WithSpinner;