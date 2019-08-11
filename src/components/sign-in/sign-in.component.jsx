import React from 'react';
import CustomFormInput from '../custom-form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import "./sign-in.styles.scss";
import { SignInWithGoogle, auth } from '../../firebase/firebase.utils';

class SignIn extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        //pull out the email & password from the state..
        const {email, password} = this.state;
        try{
            //sign-in, this will call the observer in our App component..
            await auth.signInWithEmailAndPassword(email, password);
            //clear the form..
            this.setState({email:"", password:""});
        } catch(error) {
            alert(error.message);
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        return (
            <div className="sign-in">
                <h2 className="title">I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>

                    <CustomFormInput
                        name="email"
                        type="email"
                        label="Email:"
                        value={this.state.email}
                        onChange={this.handleChange} 
                        required={true} />

                    <CustomFormInput 
                        name="password"
                        type="password"
                        label="Password:"
                        value={this.state.password}
                        onChange={this.handleChange} 
                        required={true} />

                    <div className="buttons">
                        <CustomButton type="submit" > Sign In </CustomButton>
                        <CustomButton onClick={SignInWithGoogle} googleButton={true}>Sign In With Google</CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;