import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import { CircularProgress, withStyles, Snackbar } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';
import LoginForm from './LoginForm';
import { login } from '../../actions';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

class LoginPage extends React.Component {

    componentDidUpdate() {
        if (this.props.user) {
            navigate('/');
        }
    }

    render() {
        const { updateStore, classes, loading, error } = this.props;

        if (loading) {
            return <CircularProgress className={classes.progress} style={{ color: purple[500] }} thickness={7} />;
        }

        return (
            < div className="container" >
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-8">
                        <LoginForm loginUser={updateStore} />
                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={error}
                    autoHideDuration={1}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{error}</span>}
                />;
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
        updateStore: (user) => dispatch(login(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPage));

