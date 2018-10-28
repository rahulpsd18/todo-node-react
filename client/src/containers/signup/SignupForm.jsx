import React from 'react';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
}

class SignupForm extends React.Component {

    state = initialState;

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.signupUser(this.state);
    }

    handleClear = event => {
        event.preventDefault();
        this.setState(initialState);
    }

    render() {
        return (
            <form className="text-center border border-light p-5 mt-4">

                <p className="h4 mb-4">Sign up</p>

                <div className="form-row mb-4">
                    <div className="col">
                        <input value={this.state.firstName} onChange={this.handleChange} type="text" name="firstName" className="form-control" placeholder="First name" />
                    </div>
                    <div className="col">
                        <input value={this.state.lastName} onChange={this.handleChange} type="text" name="lastName" className="form-control" placeholder="Last name" />
                    </div>
                </div>

                <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control mb-4" placeholder="E-mail" required />

                <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control  mb-4" placeholder="Password" />

                <input value={this.state.passwordConfirmation} onChange={this.handleChange} type="password" name="passwordConfirmation" className="form-control" placeholder="Confirm Password" aria-describedby="PasswordConfirmationHelpBlock" />
                <small id="PasswordConfirmationHelpBlock" className="form-text text-muted mb-4">
                At least 8 characters and 1 digit.
                </small>

                <div className="form-row mb-4">
                    <div className="col">
                        <button className="btn btn-outline-primary waves-effect my-4 btn-block" type="submit" onClick={this.handleClear}>Clear</button>
                    </div>
                    <div className="col">
                        <button className="btn btn-outline-primary waves-effect my-4 btn-block" type="submit" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default SignupForm;

