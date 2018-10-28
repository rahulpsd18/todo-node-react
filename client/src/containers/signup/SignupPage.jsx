import React from 'react';
import { navigate } from '@reach/router';
import { ToastContainer, toast } from 'react-toastify';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

import { signup } from '../../actions';
import SignupForm from './SignupForm';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

class SignupPage extends React.Component {

    componentDidUpdate() {
        this.props.error && this.notify(this.props.error, 'error');
        if (this.props.message) {
            this.notify(this.props.message, 'success');
            navigate('/login');
        }
    }

    notify = (message, type) => toast(message, {
        position: toast.POSITION.TOP_RIGHT,
        type
    });

    handleSignup = (data) => {
        this.props.signupUser(data);
    }

    render() {
        const { loading } = this.props;

        return (
            < div className="container" >
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-8">
                        <SignupForm loading={loading} signupUser={this.handleSignup} />
                    </div>
                </div>
                <ToastContainer />
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.signupReducer.loading,
        error: state.signupReducer.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signupUser: (user) => dispatch(signup(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignupPage));

