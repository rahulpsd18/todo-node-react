import React, { Component } from 'react';
import { Router, createHistory, LocationProvider } from '@reach/router'
import { connect } from 'react-redux';
import { NavBar } from './components/NavBar';
import SignupPage from './containers/signup/SignupPage';
import LoginPage from './containers/login/LoginPage';
import TodoPage from './containers/todo/TodoPage';
import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';

// const history = createHistory(window);

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavBar user={this.props.user} />
                {/* <LocationProvider history={history}> */}
                    <Router>
                        <SignupPage exact path="signup" />
                        <LoginPage exact path="login" />
                        <TodoPage path="/" />
                    </Router>
                {/* </LocationProvider> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.loginReducer.user,
    }
}

export default App = connect(mapStateToProps)(App);
