import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import CustomFormInput from '../custom-form-input/form-input.component';
import { auth, createUserIfNotExists } from '../../firebase/firebase.utils';
import './sign-up.styles.scss';



class SignUp extends React.Component
{
    constructor() {
        super();
        this.state = { 
            displayName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    }

    /* Should be handled in own SAGA.. better for reuse concept */
    handleSubmit = async (event) => {
        //async function because we connect to firebase..
        event.preventDefault();
        const{displayName, email, password, confirmPassword} = this.state;
        if(password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        try{
            //create firebase auth user(Authentication tab) and get it
            //all the data is inside "user" property so we destructure it from the 
            //object which gain from the method.
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            //store the user also in out database in firestore
            //pass the display name because we auth with email and password only,
            //so the auth object doesn't contain displayName
            await createUserIfNotExists(user, {displayName});

            //clear the fields and app state..
            this.setState({ 
                displayName: "",
                email: "",
                password: "",
                confirmPassword: ""
            });
        } catch(ex) {
            alert(ex.message);
        }
    }

    handleChange = (event) => {
        const fieldName = event.target.name;
        //[name] because we want the value of the variable and not a property with
        //"fieldName" name..
        this.setState({[fieldName]: event.target.value});
    }

    render() {
        return(
            <div class-name="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign-up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <CustomFormInput
                            name="displayName"
                            type="text"
                            label="Display Name"
                            value={this.state.displayName}
                            onChange={this.handleChange} 
                            required={true} />
                    
                    <CustomFormInput
                            name="email"
                            type="email"
                            label="Email"
                            value={this.state.email}
                            onChange={this.handleChange} 
                            required={true} />

                    <CustomFormInput
                            name="password"
                            type="password"
                            label="Password"
                            value={this.state.password}
                            onChange={this.handleChange} 
                            required={true} />

                    <CustomFormInput
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange} 
                            required={true} />

                    <CustomButton type="submit">Sign Up</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;