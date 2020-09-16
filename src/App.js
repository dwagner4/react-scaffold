import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import {
  GlobalContext,
  globalReducer,
  initialGlobalState,
} from './contexts/GlobalContext';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './content/pages/Layout';
import HomePage from './content/pages/homepage/HomePage';
import LandingPage from './content/pages/landingpage/LandingPage';
import PortfolioPage from './content/pages/portfoliopage/PortfolioPage';
import ProgramPage from './content/pages/programpage/ProgramPage';
import APBEditorPage from './content/pages/apbeditorpage/APBEditorPage';
import UVIPage from './content/pages/uvipage/UVIPage';
import CalendarPage from './content/pages/calendarpage/CalendarPage';
import DashBoardPage from './content/pages/dashboardpage/DashBoardPage';
import SysadminPage from './content/pages/sysadminpage/SysadminPage';
import ProgramStepperPage from './content/pages/programstepperpage/ProgramStepperPage';

const App = () => {
  const [state, dispatch] = React.useReducer(globalReducer, initialGlobalState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={theme}>
        { state.userinfo  ? (
          <BrowserRouter>
            <Layout>
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/portfolio" component={PortfolioPage} />
                <Route exact path="/apbedit" component={APBEditorPage} />
                <Route exact path="/program" component={ProgramPage} />
                <Route exact path="/dataportal" component={DashBoardPage} />
                <Route exact path="/progstep" component={ProgramStepperPage} />
                <Route exact path="/calendar" component={CalendarPage} />
                <Route exact path="/uvi" component={UVIPage} />
                {state.userinfo.isSysAdmin ? (
                  <Route exact path="/sysadmin" component={SysadminPage} />
                ) : null}
              </Switch>
            </Layout>
          </BrowserRouter>
        )
          : <HomePage />
        }
        
      </ThemeProvider>
    </GlobalContext.Provider>
  );
};

export default App;
