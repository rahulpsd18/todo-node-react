import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { navigate } from '@reach/router';
import { withStyles } from '@material-ui/core';

import LoginForm from './LoginForm';
import { login } from '../../actions';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

class LoginPage extends React.Component {

    componentDidUpdate() {
        this.props.user && navigate('/');
        this.props.error && this.notify(this.props.error);
    }

    notify = (message) => toast.error(message, {
        position: toast.POSITION.TOP_RIGHT
    });

    render() {
        console.log(this.props);
        const { loginUser, loading } = this.props;

        return (
            < div className="container" >
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-8">
                        <LoginForm loading={loading} loginUser={loginUser} />
                    </div>
                </div>
                <ToastContainer />
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loginReducer.loading,
        error: state.loginReducer.error,
        user: state.loginReducer.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (user) => dispatch(login(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPage));

