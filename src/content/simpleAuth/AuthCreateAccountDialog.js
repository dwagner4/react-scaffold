import React, { useState, useContext } from 'react';
import { signUp } from '../useAccounts'
import Form from "@rjsf/core";

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
import Autocomplete from '@material-ui/lab/Autocomplete';

//import { postUserInfoFunc } from '../global/authRulesEngine';

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

/**
 * AuthCreateAccountDialog is form dialog that is usually exposed
 * when a login dialog has fired a "create new user" event.  It
 * will call the signUp() function from useAccount.js likely starting
 * a Cognito request.  Normally a Confirm dialog would then be 
 * displayed.
 * 
 * @component
 * @example
 * return (
 *   <AuthPendingDialog />
 * )
 */
const AuthCreateAccountDialog = () => {
  const classes = useStyles();
  const [username, setusername] = React.useState('');
  const [userId, setUserId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [componentObj, setComponentObj] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [position, setPosition] = React.useState('');
  const [message, setMessage] = React.useState('New Account');
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [code, setCode] = React.useState();
  const dhsComponents = [
    { abbr: 'ICE', name: 'U.S. Customs and Immigration Enforcement' },
    { abbr: 'USCG', name: 'U.S. Coast Guard' },
    { abbr: 'TSA', name: 'Transportation Security Administration' },
    { abbr: 'PARM', name: ' Accountability and Risk Management' },
    { abbr: 'FEMA', name: 'Federal Emergency Management Agency' },
  ];

  const schema = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
      title: {type: "string", title: "Title", default: "A new task"},
      done: {type: "boolean", title: "Done?", default: false}
    }
  };
  

  const handleInput = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    // console.log(value, name);
    switch (name) {
      case 'usernameInput':
        setusername(value);
        console.log('in username', value, name);
        break;
      case 'passwordInput':
        setPassword(value);
        // console.log('in username', value, name);
        break;
      case 'emailInput':
        setEmail(value);
        // console.log('in username', value, name);
        break;
      case 'codeInput':
        setCode(value);
        // console.log('in code', value, name);
        break;
      case 'firstNameInput':
        setFirstName(value);
        break;
      case 'lastNameInput':
        setLastName(value);
        break;
      case 'positionInput':
        setPosition(value);
        break;
      default:
        console.log('terrible problem is occuring!', value, name, username);
    }
  };

  // to handle the selector element instead of the text fields
  const handleComponentSelector = (e, v) => {
    e.preventDefault();
    setComponentObj(v);
    console.log(componentObj);
  };


  /**
 * This is a function that calls signUp from useAccounts.js
 * form data is collected from useState variables.
 * 
 * @function createAccount
 */
  const createAccount = async () => {
    let attributes = [];
    
    attributes.push({Name: 'email', Value: email});
    attributes.push({Name: 'family_name', Value: lastName});
    attributes.push({Name: 'given_name', Value: firstName});
    attributes.push({Name: 'custom:position', Value: position});
    signUp(username, email, password, attributes);
  };

  const handleConfirm = async () => {
    // try {
    //   await Auth.confirmSignUp(username, code).then((r) => {
    //     console.log(r);
    //   });
    //   console.log('DEAN, I AM IN the HanldeConfirm!!!!');
    //   const userinfoObj = {
    //     id: userId,
    //     username: username,
    //     email: email,
    //     firstName: firstName,
    //     lastName: lastName,
    //     position: position,
    //     dhsComponent: componentObj.name,
    //     abbr: componentObj.abbr,
    //     access: 'pending',
    //     role: 'clear',
    //     isSysAdmin: false,
    //   };
    //   console.log(userinfoObj);
    //   postUserInfo(userinfoObj);
    //   setConfirmOpen(false);
    //   alert('New Account Created');
    //   dispatch({ type: 'SET_CREATE_ACCOUNT', payload: false });
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
            label="First Name"
            variant="filled"
            name="firstNameInput"
            onInput={handleInput}
          />
        </div>
        <div>
          <TextField
            required
            label="Last Name"
            variant="filled"
            name="lastNameInput"
            onInput={handleInput}
          />
        </div>
        <div>
          <TextField
            required
            label="Title/position"
            variant="filled"
            name="positionInput"
            onInput={handleInput}
          />
        </div>
        <div>
          <Autocomplete
            id="combo-box-demo"
            options={dhsComponents}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            onChange={handleComponentSelector}
            renderInput={(params) => (
              <TextField {...params} label="DHS Component" variant="outlined" />
            )}
          />
        </div>
        <div>
          <TextField
            required
            label="User Name"
            variant="filled"
            name="usernameInput"
            onInput={handleInput}
          />
        </div>
        <div className={classes.fields}>
          <TextField
            required
            label="Password"
            type="password"
            variant="filled"
            name="passwordInput"
            onInput={handleInput}
          />
        </div>
        <div>
          <TextField
            required
            label="Email"
            variant="filled"
            name="emailInput"
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
          onClick={createAccount}>
          Create Account
        </Button>
        <Form schema={schema}
        onChange={console.log("changed")}
        onSubmit={console.log("submitted")}
        onError={console.log("errors")} />
      </CardActions>

      <Dialog open={confirmOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Confirm New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Check your email for the confirmation code
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="code"
            name="codeInput"
            label="Confirmation Code"
            fullWidth
            onInput={handleInput}
            onKeyPress={handleConfirm}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default AuthCreateAccountDialog;
