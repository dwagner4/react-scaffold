

### configure a user

in IAM make a user, grant programmatic access and "AdministratorAccess" for now.
Download the credentials.

Configure the AWS CLI with credentials.

```
deans-imac: dean$ aws configure
AWS Access Key ID [****************NGP3]: *****Etc...
AWS Secret Access Key [****************ynwI]: ******etc...
Default region name [us-east-1]:
Default output format [None]:
```

Functional react w/ hooks Material-ui, npm install @material-ui/core npm install
@material-ui/icons, https://github.com/fontsource, npm install fontsource-roboto
(is this a good idea?) GlobalstateContext Auth-dialogs/Cognito
amazon-cognito-identity-js Reponsive? progressive? typescript??

### create S3 bucket

Go to S3, hit create bucket, accept defaults except unselect "block all public
access', maybe add a tag for the "project", finally create the bucket. Click on
the newly created bucket name, in property tab make it a website. In the
permissions tab click on the bucket policy tab and paste with your bucket name

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowPublicReadAccess",
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::example-bucket/*"
      ]
    }
  ]
}
```

Save everything.

manually copy the files to the bucket (pretty easy) or [optionally] make a
deployment script in package.json

```
"deploy": "aws s3 sync build/ s3://<example-bucket>",
```

then

```
npm run-script build && npm run-script deploy
```

### Cloudfront

- From the Static website hosting dialog box, copy the Endpoint of your bucket without the leading http://. The format is similar to AWSDOC-EXAMPLE-BUCKET.s3-website-region.amazonaws.com. You need the endpoint in this format for a later step.
- Add a bucket policy that allows public read access to the bucket that you created.
- Create a CloudFront web distribution. In addition to the distribution settings that you need for your use case, enter the following:
For Origin Domain Name, enter the endpoint that you copied in step above.
- Select the Default CloudFront Certificate. 
- Choose Create Distribution.
- wait for the distribution to fully deploy ( a spinner in the status column )

### create a user pool in cognito

- name it, add an [optional] tag. 
- Hit "step through settings" because that's how we roll.
- check the login and required attributes, can't be changed later
   - select email, given name, and family name
   - add custom position, dhscomponent, access, role and sysAdmin 
- add custom attributes
- create an app client, uncheck "generate client secret",
- save the userpool ID and the app client ID
- set up the domain name, use the domain name they provide, add a subdomain prefix

### edit the useAccounts.js file
```
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: '....',
  ClientId: '....'
}
```

### create a AuthCreateAccountDialog.js file
```
import React, { useState } from 'react';
import UserPool from '../UserPool';

```

### in the app
```
import Signup from './somefolder/Signup';

```


### using the generated UI

this is needed in the future to use SAML or OAuth2 authentication. Go back to
the userpool and click on app client settings.

