import React from 'react';

import { Link } from '@reach/router';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
};

const ActionLinks = () => {
  return [
    <Link key="login" to="/login"><Button color="secondary">Login</Button></Link>,
    <Link key="signup" to="/signup"><Button color="secondary">Signup</Button></Link>
  ]
};

const NavBarImpl = (props) => {
  const { classes, user } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Toodle
          </Typography>
          {
            user
              ? null
              : <ActionLinks/>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export const NavBar = withStyles(styles)(NavBarImpl);
