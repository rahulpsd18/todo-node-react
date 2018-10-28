import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        position: 'fixed',
        right: theme.spacing.unit * 5,
        bottom: theme.spacing.unit * 5
    },
    dialog: {
        minWidth: 1600
    }
});

const initialState = {
    open: false,
    isActive: true,
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0]
};

class TodoFormImpl extends React.Component {
    state = initialState;

    componentWillReceiveProps(props) {
        console.log('New props received', props);
        this.setState({ ...props });
    }

    toggleModal = () => {
        this.setState({ open: !this.state.open });
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit = () => {
        this.props.onSubmit(this.state);
        this.setState({ open: false });
    };

    render() {
        const { classes, isEditMode } = this.props;

        return (
            <div>
                {
                    !isEditMode && <Button variant="fab" color="primary" aria-label="Add" className={classes.button} onClick={this.toggleModal}>
                        <AddIcon />
                    </Button>
                }
                <Dialog
                    open={this.state.open}
                    onClose={this.toggleModal}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle>
                        {isEditMode ? 'Edit the agenda' : 'Add an agenda'}
                    </DialogTitle>
                    <DialogContent>
                        <form className={classes.form}>
                            <FormControl margin="normal" fullWidth required>
                                <InputLabel htmlFor="title">Title</InputLabel>
                                <Input value={this.state.title} id="title" name="title" onChange={this.handleChange} autoFocus />
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <TextField
                                    id="description"
                                    name="description"
                                    label="Description"
                                    multiline
                                    rowsMax="4"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    margin="normal"
                                />
                                <Grid container spacing={16} style={{ marginTop: 10 }}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="dueDate"
                                            name="dueDate"
                                            label="Due Date"
                                            type="date"
                                            value={this.state.dueDate}
                                            onChange={this.handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={this.state.isActive}
                                                    onChange={() => this.setState({ isActive: !this.state.isActive })}
                                                    value={this.state.isActive}
                                                />
                                            }
                                            label={this.state.isActive ? "Active" : "Completed"}
                                            labelPlacement="start"
                                        />
                                    </Grid>
                                </Grid>

                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.toggleModal} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.setState({ ...initialState, open: true })} color="primary">
                            Clear
                        </Button>
                        <Button type="submit" onClick={this.handleSubmit} color="primary">
                            {isEditMode ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export const TodoForm = withStyles(styles)(TodoFormImpl);