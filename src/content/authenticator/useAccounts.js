/** @module useAccounts */

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

/**
 * @function signUp - requests the creation of a new user account in a userPool 
 * specified in the "Pool" variable.  
 *
 * @param {string} username - propsed username
 * @param {string} email - typically used to send a confirmation code
 * @param {string} password - propsed password
 * @param {object[]} attributes - all user attributes expressed as {"Name": value, "Value": value} custom variable should be "custom:name"
 * @return {Promise<object>} either err or results 
 */
export const signUp = (username, password, attributes) => {
    Pool.signUp( username, password, attributes, null, (err, data) => {
        if (err) console.log(err)
        console.log(data)
    })
}

/**
 * @function getUserAttributes - uses the Cognito "Pool" object to return an array of user attributes
 *
 * @return {Promise<object>} either err or array of attribute objects 
 */
export const getUserAttributes = () => {
    const user = Pool.getCurrentUser();
    console.log(user)
    let attrObj = "What?"
    if (user) {
        user.getUserAttributes((err, attributes) =>{
            if (err) {
                attrObj = err
            } else {
                attrObj = attributes;
            }
        });
    }
    
    return attrObj;
}

/**
 * @function getSession - uses the Cognito "Pool" object to return an array osession and attributes for current user session
 *
 * @return {Promise<object>} either err or array of attribute objects 
 */
export const getSession = () => {
        let results = {}
        const user = Pool.getCurrentUser();
        if (user) {
            user.getSession( (err, session)  => {
                if (err) {
                    console.log("WTF 2")
                } else {
                    // let attrObj = {}
                    // user.getUserAttributes((err, attributes) =>{
                    //     for ( let attribute of attributes) {
                    //         const { Name, Value } = attribute;
                    //         attrObj[Name] = Value;
                    //     }
                    //     console.log(attrObj)
                    // });
                    // results = {...session, ...attrObj};
                    // console.log(results)
                    console.log(session);
                }
            });
        } else {
            console.log("more stuff")
        }
        return results
};

/** 
 * @function authenticate - login to a user pool and begin a session
 * 
 * @param { string } Username 
 * @param { string } Password
 * @return {Promise<object>} err or user object, also establishes session in browser
 */
export const authenticate = async (Username, Password) => {
    await new Promise((resolve, reject) => {
        const user = new CognitoUser({Username, Pool});
        const authDetails = new AuthenticationDetails({Username, Password});

        user.authenticateUser(authDetails, {
            onSuccess: result => {
                
            /**************************  experiments   */   
                user.getUserAttributes(function(err, result) {
                    if (err) {
                        alert(err.message || JSON.stringify(err));
                        return;
                    }
                    for ( let i = 0; i < result.length; i++) {
                        console.log(result)
                        console.log(
                            'attribute ' + result[i].getName() + ' has value ' + result[i].getValue()
                        );
                    }
                });

                console.log("WTF!!!")

                
                const username = user.getUsername()
                console.log(username)

                user.getUserData(function(err, result) {
                    console.log(result)
                    resolve("result");
                });

        /* *******************  end experiments    */
                
                // console.log('onSuccess:', result);
                // resolve(result);
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


/**
 * @function logout - uses the Cognito "Pool" to end browser session
 *
 * @return {Promise<object>} either err or array of attribute objects 
 */
export const logout = () => {
    const user = Pool.getCurrentUser();
    if (user){
        user.signOut();
        console.log('signout the user')
    } else {
        console.log('no user to signout')
    }
}



