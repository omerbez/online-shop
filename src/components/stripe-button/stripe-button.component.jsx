import React from 'react';
import StripeCheckout from 'react-stripe-checkout'


/*
    for all StripeCheckout component props:
    https://github.com/azmenak/react-stripe-checkout
*/

const StripeCheckoutButton = ({ price }) => {
    //stripe payment is at cents..
    const prineInCents = price * 100; 
    const publicKey = "pk_test_aCpdsIUcvz2vVeoFC7AwPILg00HmxNE2kA";

    return <StripeCheckout 
                name="My Online Shop"
                label="Pay Now"
                shippingAddress
                image="http://svgshare.com/i/CUz.svg"
                description={`Your total is $${price}`}
                amount={prineInCents}
                panelLabel="Panel Label"
                token={onToken}
                stripeKey={publicKey}/>
}

export default StripeCheckoutButton;

const onToken = (token) => {
    //the token should be sent to the backend in order
    //to make the payment with the privateKey..
    console.log(token);
    alert("Payment Successful");
}