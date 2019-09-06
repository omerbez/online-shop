import React from 'react';
import CustomFormInput from '../custom-form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import "./sign-in.styles.scss";
import { googleSignInStart, startEmailSignIn } from '../../redux/user/user.actions'
import { connect } from 'react-redux';



class SignIn extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {email, password} = this.state;
        this.props.startEmailSignIn(email, password);
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
                        <CustomButton type="button" onClick={this.props.startGoogleSignIn} googleButton={true}>Sign In With Google</CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startGoogleSignIn: () => dispatch(googleSignInStart()),
        startEmailSignIn: (email, pass) => dispatch(startEmailSignIn({email, pass}))
    }
}
export default connect(null,mapDispatchToProps)(SignIn);