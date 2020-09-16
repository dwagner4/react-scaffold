import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import BarChartIcon from '@material-ui/icons/BarChart';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import HelpIcon from '@material-ui/icons/Help';
import FunctionsIcon from '@material-ui/icons/Functions';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory, NavLink } from 'react-router-dom';
import { GlobalContext } from '../../../contexts/GlobalContext';
import WorkIcon from '@material-ui/icons/Work';
import logosm from '../../../assets/DHS_logo.svg';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
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
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerAppBar: {
    // ...theme.mixins.toolbar,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 128,
    padding: theme.spacing(0, 2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    alignItems: 'center',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  activeLink: {
    background: '#B6E0FC',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  linkText: {
    fontWeight: 'inherit',
  },
  logosm: {
    width: 48,
    height: 48,
    marginTop: 5
  },
}));

export default function Sidebar({ open, close, handleAccountOpen }) {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(GlobalContext);
  const history = useHistory();
  const [portfolio, setPortfolio] = React.useState(false);
  const [sys, setSys] = React.useState(false);

  React.useEffect(() => {
    console.log(state.userinfo.isSysAdmin, state.userinfo.access);
    setPortfolio(state.userinfo && state.userinfo.access === 'all');

    setSys(state.userinfo && state.userinfo.isSysAdmin);
  }, [state.userinfo]);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}>
      <div className={classes.drawerAppBar}>
        <div className={classes.drawerHeader}>
          <IconButton edge="start" onClick={close}>
            <ChevronLeftIcon />
          </IconButton>
          <img src={logosm} alt="DHS Logo" className={classes.logosm} />
        </div>
        <div>
          <Typography variant="h6">{state.userinfo.firstName} {state.userinfo.lastName}</Typography>
        </div>
      </div>
      <Divider />
      <List>
        <ListItem
          button
          component={NavLink}
          exact
          to="/"
          activeClassName={classes.activeLink}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ className: classes.linkText }}
            primary="Home"
          />
        </ListItem>

        {portfolio ? (
          <ListItem
            button
            component={NavLink}
            exact
            to="/portfolio"
            activeClassName={classes.activeLink}>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ className: classes.linkText }}
              primary="Portfolio"
            />
          </ListItem>
        ) : null}

        <ListItem
          button
          component={NavLink}
          exact
          to="/dataportal"
          activeClassName={classes.activeLink}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ className: classes.linkText }}
            primary="Dashboard"
          />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          exact
          to="/calendar"
          activeClassName={classes.activeLink}>
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ className: classes.linkText }}
            primary="Calendar"
          />
        </ListItem>
        {sys ? (
          <ListItem
            button
            component={NavLink}
            exact
            to="/sysadmin"
            activeClassName={classes.activeLink}>
            <ListItemIcon>
              <SystemUpdateAltIcon />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ className: classes.linkText }}
              primary="SysAdmin"
            />
          </ListItem>
        ) : null}
      </List>
    </Drawer>
  );
}
