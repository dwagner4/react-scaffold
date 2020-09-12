import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../../../assets/Group1@2x@2x.png';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { GlobalContext } from '../../../contexts/GlobalContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 128,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  toolbarLeft: {
    display: 'flex',
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  hide: {
    display: 'none',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    maxHeight: 128
  }
}));

export default function ParmAppBar({ open, openDrawer, handleAccountOpen }) {
  const classes = useStyles();
  const { state } = React.useContext(GlobalContext);

  return (
    <AppBar
      position="absolute"
      color="transparent"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.toolbarLeft}>
        <div className={classes.drawerHeader}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={openDrawer}
            edge="start"
            className={clsx(open && classes.hide)}>
            <MenuIcon />
          </IconButton>
          {!open && (
            <IconButton
              edge=""
              color="primary"
              aria-label="account"
              onClick={handleAccountOpen}>
              <AccountCircleIcon fontSize="large" />
            </IconButton>
          )}
        </div>
        <Typography variant="h5">{state.ui.pageTitle}</Typography>
        </div>
        <img src={logo} alt="DHS Logo" className={classes.logo}/>
      </Toolbar>
    </AppBar>
  );
}
