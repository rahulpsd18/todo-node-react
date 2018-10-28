import React from 'react';
import { connect } from 'react-redux';
import { CircularProgress, withStyles, Snackbar } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';
import SignupForm from './SignupForm';
import { signup } from '../../actions';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

class SignupPage extends React.Component {

    render() {
        const { updateStore, classes, loading, error } = this.props;

        if (loading) {
            return <CircularProgress className={classes.progress} style={{ color: purple[500] }} thickness={7} />;
        }

        return (
            < div className="container" >
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-8">
                        <SignupForm signupUser={updateStore} />
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
        loading: state.signupReducer.loading,
        error: state.signupReducer.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStore: (user) => dispatch(signup(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignupPage));

