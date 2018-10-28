import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import Popover from './Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const styles = theme => ({
    typography: {
        margin: theme.spacing.unit * 2,
    },
});
class ProfilePopover extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    logOut = () => {
        localStorage.clear();
        this.handleClose();
        window.location.reload();
    }

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                <Popover>
                    <List component="nav">
                        <ListItem button onClick={this.logOut}>
                            <ListItemIcon>
                                <LockIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Popover>
            </div>
        );
    }
}

export default withStyles(styles)(ProfilePopover);
