import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    button: {
        background: 'linear-gradient(45deg, var(--background-start) 30%, var(--background-end) 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px var(--box-shadow)',
    },
};

function NavBarImpl(props) {
    const { classes, user } = props;

    return (
        <div className={classes.root}>
            <AppBar position="static" color="white">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="secondary" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        ToodleDo
                    </Typography>
                    <Button color="secondary" variant="outlined">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export const NavBar = withStyles(styles)(NavBarImpl);
