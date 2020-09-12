import React, { useState, useContext } from 'react';
import { logout } from '../useAccounts'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import success from '../../../assets/success_check.png';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '95%',
    },
    backgroundColor: '#ffffff',
  },
  fields: {
    width: '100%',
  },
  login: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  success: {
    marginLeft: 110,
  },
}));

/**
 * AuthPendingDialog is a simple dialog that informs the user that they still don't have permission
 * 
 * @component
 * @example
 * return (
 *   <AuthPendingDialog />
 * )
 */

const AuthPendingDialog = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <img
          src={success}
          alt="success checkmark"
          className={classes.success}
        />

        <Typography variant="body2" align="center" gutterBottom>
          You have successfully created your account
        </Typography>
        <hr />
        <Typography variant="body2" align="center" gutterBottom>
          In order to login you will need to{' '}
          <a href="mailto:dean.wagner@proveoautomation.com">contact</a> the
          System Administer to authorize access for the account.
        </Typography>
        <Button onClick={logout}>Logout</Button>
      </CardContent>
    </Card>
  );
};

export default AuthPendingDialog;
