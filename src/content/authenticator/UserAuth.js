
import React, { useState, useContext, useEffect } from 'react';
import Form from "@rjsf/material-ui";
import { GlobalContext } from '../../contexts/GlobalContext';
import { loginSchema, newAccountSchema, forgotSchema } from './schemas'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    AuthenticationDetails,
} from 'amazon-cognito-identity-js';

import { Pool } from '../../aws-config'
  
// const poolData = {
//     UserPoolId: 'us-east-1_IQvSBb8la', // Your user pool id here
//     ClientId: '6r52qalanmti6ejbkuek71n4q1', // Your client id here
// };
// const Pool = new CognitoUserPool(poolData);

const useStyles = makeStyles((theme) => ({
    card: {
        width: 400,
      backgroundColor: "white",
      padding: 10
    },
    login: {
        margin: 10,
        marginTop:30
    },
  }));

const UserAuth = () => {
    const { state, dispatch } = useContext(GlobalContext);
    const classes = useStyles();
    const [ createAccount, setCreateAccount ] = useState( false );
    const [ forgotPassword, setForgotPassword ] = useState( false );
    const [ errorMsg, setErrorMsg ] = useState();
    const [ open, setOpen ] = useState( false );
    const [ openConfirm, setOpenConfirm ] = useState(false);
    const [ code, setCode ] = useState();
    const [ confirmName, setConfirmName ] = useState();



    const loginSubmit = ({formData}, e) => {
        setOpen(false)
        const Username = formData.email;
        const Password = formData.password;
        setErrorMsg(null);
        
        const user = new CognitoUser({Username, Pool});
        const authDetails = new AuthenticationDetails({Username, Password});

        user.authenticateUser(authDetails, {
            onSuccess: result => {
                console.log('onSuccess:', result);
                dispatch({
                    type: 'SET_USERINFO',
                    payload: {
                      name: "Dean"
                    },
                  });
            },
            onFailure: err => {
                console.log('onFailure:', err.code);
                console.log(err)
                setErrorMsg(err.message)
                setOpen(true)
            },
            onPasswordRequired: result => {
                console.log('onPasswordRequired:', result);
            },
            mfaRequired: function(codeDeliveryDetails) {
                // var verificationCode = prompt('Please input verification code' ,'');
                // user.sendMFACode(verificationCode, this);
            }
        })
        
    }
    
    const forgotSubmit =  ({formData}, e) => console.log("Forgot data submitted: ",  formData)
    
    const newAccountSubmit = ({formData}, e) => {
        setOpen(false)
        console.log("Data submitted: ",  formData);
        const { email, firstName, lastName, position, dhsComponent, password } = formData;

        let attributes = [];
        attributes.push({Name: 'email', Value: email});
        
        Pool.signUp( email, password, attributes, null, (err, data) => {
            if (err) {
                console.log(err);
                setErrorMsg(err.message)
                setOpen(true)
            }
            else {
                console.log(data)
                const newUser = (data.user);
                console.log('user name is ' + newUser.getUsername());
                setConfirmName(newUser.getUsername());
                setOpenConfirm(true);
            }
        })
    }

    const confirmUser = () => {
        setOpen(false)
        console.log(code)
        console.log(confirmName)
        const Username = confirmName;
        const newUser = new CognitoUser({Username, Pool});
        newUser.confirmRegistration(code, true, function(err, result) {
            if (err) {
                alert(err);
                setErrorMsg(err.message)
                setOpen(true)
            } else {
                console.log('call result: ' + result);
                setOpenConfirm(false)
                setCreateAccount(false);
            }
        });
    }

    let formconfig = loginSchema;
    let onsubmit = loginSubmit;
    if (createAccount) { formconfig = newAccountSchema; onsubmit = newAccountSubmit; }
    if (forgotPassword) { formconfig = forgotSchema; onsubmit = forgotSubmit; } 

    return (
        <div className={classes.card}>
            <Collapse in={open}>
                <Alert variant="filled" severity="error"
                action={
                    <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}>
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                >
                {errorMsg}
                </Alert>
            </Collapse>
        { !state.userinfo ? 
            (<Form 
                schema={formconfig.schema}
                onSubmit={onsubmit}
                uiSchema={formconfig.uiSchema}
                onError={(type) => console.log("changed", type)} />
                
        ) : null }
        { createAccount || forgotPassword ? 
            (
                <Button
                    color="primary"
                    className={classes.login}
                    size="small"
                    onClick={() => {setCreateAccount(false);setForgotPassword(false);setOpen(false)}}>
                    Log In
                </Button>
            ) : (
                <div>
                <Button
                        color="primary"
                        className={classes.login}
                        size="small"
                        onClick={() => {setCreateAccount(!createAccount);setOpen(false)}}>
                    new account
                </Button>
                <Button
                        color="primary"
                        className={classes.login}
                        size="small"
                        onClick={() => {setForgotPassword(!forgotPassword);setOpen(false)}}>
                    forgot Password
                </Button>
                </div>
            ) 
        }
            <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Enter Confirmation Code</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        A code has been sent to your email account.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="code"
                        label="code"
                        fullWidth
                        onChange={(e) => setCode(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={confirmUser} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UserAuth
