import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: '5em',
    height: 500,
    [theme.breakpoints.down('md')]: {
      marginTop: '3em',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '2em',
    },
  },
  subtitle: {
    marginTop: '2em',
  },
}));

const SysadminPage = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      className={classes.mainContainer}
      alignItems="center">
      <Typography variant="h4">
        User MAnagement
      </Typography>
    </Grid>
  );
};

export default SysadminPage;
