import React, { Component } from 'react';
import { Router } from '@reach/router'
import { connect } from 'react-redux';
import { NavBar } from './components/NavBar';
import SignupPage from './containers/signup/SignupPage';
import LoginPage from './containers/login/LoginPage';
import TodoPage from './containers/todo/TodoPage';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavBar user={this.props.user} />
                <Router>
                    <SignupPage path="signup" />
                    <LoginPage path="login" />
                    <TodoPage path="/" />
                </Router>
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
