import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Title = (props) => (
    <DialogTitle id="alert-dialog-title">{props.children}</DialogTitle>
);

const Content = (props) => (
    <DialogContent>
        <DialogContentText id="alert-dialog-description">
            {props.children}
        </DialogContentText>
    </DialogContent>
);

class AlertDialog extends React.Component {

    static Title = Title;
    static Content = Content;
    static Actions = DialogActions;

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {this.props.children}
            </Dialog>
        );
    }
}

export default AlertDialog;