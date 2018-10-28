import React, { Component } from 'react';
import { Router } from '@reach/router'
import { Provider } from 'react-redux';
import { NavBar } from './components/NavBar';
import SignupPage from './containers/signup/SignupPage';
import LoginPage from './containers/login/LoginPage';
import { store } from './store';
import './App.css';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <NavBar />
                    <Router>
                        <SignupPage path="signup" />
                        <LoginPage path="login" />
                    </Router>
                </div>
            </Provider>
        );
    }
}

export default App;
