import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import green from '@material-ui/core/colors/green';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { navigate } from '@reach/router';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
}


const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});

class SignupForm extends React.Component {

    state = initialState;

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.signupUser(this.state);
    }

    handleClear = event => {
        event.preventDefault();
        this.setState(initialState);
    }

    render() {
        const { classes } = this.props;
        return (
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form}>
                        <Grid container spacing={16}>
                            <Grid item xs={12} sm={6}>
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel htmlFor="firstName">First Name</InputLabel>
                                    <Input value={this.state.firstName} id="firstName" name="firstName" autoComplete="firstName" onChange={this.handleChange} autoFocus />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                                    <Input value={this.state.lastName} id="lastName" name="lastName" autoComplete="lastName" onChange={this.handleChange} />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input value={this.state.email} id="email" name="email" autoComplete="email" onChange={this.handleChange} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                autoComplete="current-password"
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="passwordConfirmation">Confirm Password</InputLabel>
                            <Input
                                name="passwordConfirmation"
                                type="password"
                                id="passwordConfirmation"
                                value={this.state.passwordConfirmation}
                                onChange={this.handleChange}
                            />
                        </FormControl>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={this.props.loading}
                            onClick={this.handleSubmit}
                        >
                            Sign Up
                                </Button>
                        {this.props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        <Button
                            type="submit"
                            fullWidth
                            variant="text"
                            color="primary"
                            className={classes.submit}
                            onClick={() => navigate('/login')}
                        >
                            Already have an account? Sign In
                        </Button>
                    </form>
                </Paper>
            </main>
        )
    }
}

export default SignupForm = withStyles(styles)(SignupForm);;
