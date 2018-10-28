import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
    typography: {
        margin: theme.spacing.unit * 2,
    },
});

class PopoverImpl extends React.Component {
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

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                <IconButton aria-owns={open ? 'toodle-popper' : null}
                    aria-haspopup="true"
                    variant="contained"
                    onClick={this.handleClick}>
                    <MoreIcon />
                </IconButton>
                <Popover
                    id="toodle-popper"
                    open={open}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    {this.props.children}
                </Popover>
            </div>
        );
    }
}

export default withStyles(styles)(PopoverImpl);
