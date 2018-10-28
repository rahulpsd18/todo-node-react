import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from '@reach/router';;

export const withAuthentication = (WrappedComponent) => {
    class AuthenticationCheck extends React.Component {
        render() {
            if (!this.props.user) {
                return <Redirect noThrow to="/login" />
            }
            return <WrappedComponent {...this.props} />;
        }
    };

    const mapStateToProps = (state) => {
        return {
            user: state.loginReducer.user,
        }
    }

    return connect(mapStateToProps)(AuthenticationCheck);
};


