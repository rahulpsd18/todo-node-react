import React from 'react';
import purple from '@material-ui/core/colors/purple';
import { navigate } from '@reach/router';
import { ToastContainer, toast } from 'react-toastify';
import { CircularProgress, withStyles, Snackbar } from '@material-ui/core';
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
        this.props.user && navigate('/');
        this.props.error && this.notify(this.props.error);
    }

    notify = (message) => toast.error(message, {
        position: toast.POSITION.TOP_RIGHT
    });

    render() {
        const { signupUser, classes, loading, error } = this.props;

        return (
            < div className="container" >
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-8">
                        <SignupForm loading={loading} signupUser={signupUser} />
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

