
import React, { useState, useContext, useEffect } from 'react';
import Form from "@rjsf/material-ui";
import { GlobalContext } from '../../contexts/GlobalContext';
import { loginSchema, newAccountSchema, forgotSchema } from './schemas'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
    let formconfig = loginSchema;
    if (createAccount) { formconfig = newAccountSchema }
    if (forgotPassword) { formconfig = forgotSchema } 
    return (
        <div className={classes.card}>
        { !state.userinfo ? 
            (<Form 
                schema={formconfig.schema}
                onChange={(type) => console.log("changed", type.formData)}
                onSubmit={formconfig.onSubmit}
                uiSchema={formconfig.uiSchema}
                onError={(type) => console.log("changed", type)} />
                
        ) : null }
        { createAccount || forgotPassword ? 
            (
                <Button
                    color="primary"
                    className={classes.login}
                    size="small"
                    onClick={() => {setCreateAccount(false);setForgotPassword(false);}}>
                    Log In
                </Button>
            ) : (
                <div>
                <Button
                        color="primary"
                        className={classes.login}
                        size="small"
                        onClick={() => setCreateAccount(!createAccount)}>
                    new account
                </Button>
                <Button
                        color="primary"
                        className={classes.login}
                        size="small"
                        onClick={() => setForgotPassword(!forgotPassword)}>
                    forgot Password
                </Button>
                </div>
            ) 
        }
        </div>
    )
}

export default UserAuth
