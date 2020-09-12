import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import logo from '../../../assets/Group1@2x@2x.png';
import logosm from '../../../assets/DHS_logo.svg';
import Authenticator from '../../authenticator/Authenticator';


const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: '100vh',
    backgroundColor: '#F0F7FF',
  },
  logo: {
    height: '90%',
  },
  homediv: {
    position: 'fixed',
    top: 20,
    left: 20,
  },
  logosm: {
    width: 60,
    height: 60,
  },
  logotext: {
    marginLeft: 10,
  },
  logincard: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
  },
}));

const HomePage = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const classes = useStyles();
  
  return (
    <div>
      <Grid
        container
        direction="row"
        className={classes.logincard}
        justify="center"
        alignItems="center">
        <Authenticator />
      </Grid>
      <Grid
        container
        direction="row"
        className={classes.homediv}
        alignItems="center">
        <img src={logosm} alt="DHS Logo" className={classes.logosm} />
        <Grid item>
          <Typography variant="body2" className={classes.logotext}>
            Homeland
          </Typography>
          <Typography variant="body2" className={classes.logotext}>
            Security
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        className={classes.mainContainer}
        justify="center"
        alignItems="center">
        <img src={logo} alt="DHS Logo" className={classes.logo} />
      </Grid>
    </div>
  );
};

export default HomePage;
