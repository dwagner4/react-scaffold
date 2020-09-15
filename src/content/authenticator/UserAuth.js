
import React, { useState, useContext, useEffect } from 'react';
import Form from "@rjsf/material-ui";
import { GlobalContext } from '../../contexts/GlobalContext';
import { loginSchema, newAccountSchema, forgotSchema } from './schemas'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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

    

    const loginSubmit = async ({formData}, e) => {
        const Username = formData.email;
        const Password = formData.password;
        await new Promise((resolve, reject) => {
            const user = new CognitoUser({Username, Pool});
            const authDetails = new AuthenticationDetails({Username, Password});
    
            user.authenticateUser(authDetails, {
                onSuccess: result => {
                    console.log('onSuccess:', result);
                    resolve(result);
                },
                onFailure: err => {
                    console.log('onFailure:', err.code);
                    reject(err.message);
                },
                onPasswordRequired: result => {
                    console.log('onPasswordRequired:', result);
                    resolve(result);
                },
            })
        })
    }
    
    const forgotSubmit =  ({formData}, e) => console.log("Forgot data submitted: ",  formData)
    
    const newAccountSubmit = ({formData}, e) => {
        console.log("Data submitted: ",  formData);
        const { email, firstName, lastName, position, dhsComponent, password } = formData;

        let attributes = [];
        attributes.push({Name: 'email', Value: email});
        // attributes.push({Name: 'family_name', Value: lastName});
        // attributes.push({Name: 'given_name', Value: firstName});
        // attributes.push({Name: 'custom:position', Value: position});
        Pool.signUp( email, password, attributes, null, (err, data) => {
            if (err) console.log(err)
            console.log(data)
        })
    }

    let formconfig = loginSchema;
    let onsubmit = loginSubmit;
    if (createAccount) { formconfig = newAccountSchema; onsubmit = newAccountSubmit; }
    if (forgotPassword) { formconfig = forgotSchema; onsubmit = forgotSubmit; } 

    return (
        <div className={classes.card}>
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
