import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '95%',
    },
  },
  fields: {
    width: '100%',
    margin: 10,
  },
  login: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const AuthForgotPasswordDialog = (props) => {
  const classes = useStyles();
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('New Account');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [code, setCode] = useState();
  const { state, dispatch } = useContext(GlobalContext);

  const handleInput = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    // console.log(value, name);
    switch (name) {
      case 'usernameInput':
        setusername(value);
        // console.log('in username', value, name);
        break;
      case 'passwordInput':
        setPassword(value);
        // console.log('in username', value, name);
        break;
      case 'codeInput':
        setCode(value);
        // console.log('in code', value, name);
        break;
      default:
        console.log('terrible problem is occuring!', value, name, username);
    }
  };

  const resetPassword = async () => {
    // try {
    //   setMessage('Sending a code to your email');
    //   const user = await Auth.forgotPassword(username);
    //   console.log({ user });
    //   setConfirmOpen(true);
    // } catch (error) {
    //   console.log('error reset password:', error);
    //   setMessage('Account Failure, ' + error.message);
    // }
  };

  const handleReset = async () => {
    // try {
    //   await Auth.forgotPasswordSubmit(username, code, password);
    //   alert('Password Reset');
    //   setConfirmOpen(false);
    //   dispatch({ type: 'SET_RESET_PASSWORD', payload: false });
    // } catch (error) {
    //   console.log('error confirming sign up', error);
    // }
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {message}
        </Typography>
        <div>
          <TextField
            required
            label="User Name"
            variant="filled"
            name="usernameInput"
            onInput={handleInput}
          />
        </div>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          className={classes.login}
          size="large"
          onClick={resetPassword}>
          Reset Password
        </Button>
      </CardActions>

      <Dialog open={confirmOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Confirm New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Check your email for the confirmation code
          </DialogContentText>
          <div className={classes.fields}>
            <TextField
              required
              label="Confirmation Code"
              variant="filled"
              name="codeInput"
              onInput={handleInput}
            />
          </div>
          <div className={classes.fields}>
            <TextField
              required
              label="New Password"
              type="password"
              variant="filled"
              name="passwordInput"
              onInput={handleInput}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button filled onClick={handleReset} color="primary">
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default AuthForgotPasswordDialog;
