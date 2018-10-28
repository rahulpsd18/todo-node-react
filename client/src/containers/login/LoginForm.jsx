import React from 'react';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
}

class LoginForm extends React.Component {

    state = initialState;

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.loginUser(this.state);
    }

    handleClear = event => {
        event.preventDefault();
        this.setState(initialState);
    }

    render() {
        return (
            <form className="text-center border border-light p-5 mt-4">

                <p className="h4 mb-4">Login</p>

                <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control mb-4" placeholder="E-mail" required />

                <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control  mb-4" placeholder="Password" />


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

export default LoginForm;

