import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../../actions';
import { withAuthentication } from '../../withAuthentication';

class TodoPage extends React.Component {

    render() {

        return (
            < div className="container" >
                TODO PAGE
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.signupReducer.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStore: (user) => dispatch(signup(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuthentication(TodoPage));
