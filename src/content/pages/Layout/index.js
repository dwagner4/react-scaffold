import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer"
import ParmAppBar from "./ParmAppBar";
import Sidebar from "./Sidebar";
import { GlobalContext } from '../../../contexts/GlobalContext';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawerHeader: {
    // ...theme.mixins.toolbar,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 128,
    // padding: theme.spacing(0, 1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2)
  },
  content: {
    // ..marginTop:
    flexGrow: 1,
    padding: theme.spacing(3, 0),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

export default function Layout({children}) {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(GlobalContext);

  const [acctOpen, setAcctOpen] = React.useState(false);
  const handleAccountClick = () => setAcctOpen(!acctOpen);

  const handleDrawerOpen = () => {
    dispatch({
      type: 'TOGGLE_SIDEBAR',
      payload: {
        showSidebar: true
      },
    });
  };

  const handleDrawerClose = () => {
    dispatch({
      type: 'TOGGLE_SIDEBAR',
      payload: {
        showSidebar: false
      },
    });
  };


  return (
    <div className={classes.root}>
      <ParmAppBar open={state.ui.showSidebar} openDrawer={handleDrawerOpen} handleAccountOpen={handleAccountClick} />
      <Sidebar open={state.ui.showSidebar} close={handleDrawerClose} handleAccountOpen={handleAccountClick} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: state.ui.showSidebar
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
      <Drawer
            anchor={'top'}
            open={acctOpen}
            onClose={() => setAcctOpen(false)}>
          </Drawer>
    </div>
  );
}
