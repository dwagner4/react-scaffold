import React, { useState, useContext, useEffect } from 'react';
import { authenticate, getSession, getUserAttributes } from '../useAccounts'

import { GlobalContext } from '../../../contexts/GlobalContext';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

 

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
  },
  login: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const SignUp = (props) => {
  const { state, dispatch } = useContext(GlobalContext);
  const classes = useStyles();
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('Log In');

  const SignIn = () => {
    setMessage("Checking User")
    authenticate( username, password)
      .then(result => {
        
        console.log('Logged in', result);
        dispatch({ type: 'SET_IS_LOGGED_IN', payload: true });
        // dispatch({ type: 'SET_HAS_ACCESS', payload: confirmed });
        // const attrs = getUserAttributes()
        // console.log(attrs)
        
      })
      .catch( err => {
        console.error('Failed to login', err)
        dispatch({ type: 'SET_IS_LOGGED_IN', payload: false });
        setMessage(err)
      })
  };

  const createAccount = () =>
    dispatch({ type: 'SET_CREATE_ACCOUNT', payload: true });

  const forgotPassword = () =>
    dispatch({ type: 'SET_FORGOT_PASSWORD', payload: true });

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      SignIn();
    }
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
            label="username"
            variant="filled"
            name="usernameInput"
            onInput={e => setusername(e.target.value)}
            onKeyPress={handleEnter}
          />
        </div>
        <div className={classes.fields}>
          <TextField
            required
            label="password"
            type="password"
            variant="filled"
            name="passwordInput"
            onInput={e => setPassword(e.target.value)}
            onKeyPress={handleEnter}
          />
        </div>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          className={classes.login}
          size="large"
          onClick={SignIn}>
          Log In
        </Button>
      </CardActions>
      <hr />
      <CardContent>
        <Typography variant="body2" component="span">
          Don't have an account?
        </Typography>
        <Button color="secondary" size="small" onClick={createAccount}>
          create account
        </Button>
        <br />
        <Typography variant="body2" component="span">
          Forgot your Password?
        </Typography>
        <Button color="secondary" size="small" onClick={forgotPassword}>
          New Password
        </Button>
      </CardContent>
    </Card>
  );
};

export default SignUp;
