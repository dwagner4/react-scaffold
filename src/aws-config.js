

import { CognitoUserPool } from 'amazon-cognito-identity-js'

const poolData = {
    UserPoolId: 'us-east-1_H4Tw6pWLY', // Your user pool id here
    ClientId: '28igbb1n7umbovqrpno4ml9h6', // Your client id here
};
export const Pool = new CognitoUserPool(poolData);