import React, { Component } from 'react';
import { NavBar } from './components/NavBar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

import './App.css';

const theme = createMuiTheme({
    palette: {
         primary: {
            light: '#B3E5FC',
            main: '#FFFFFF',
            dark: '#0288D1',
         },
         secondary: {
            light: '#757575',
            main: '#FF4081',
         },
       }
     });


class App extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={theme}>
                <div className="App">
                    <NavBar />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
