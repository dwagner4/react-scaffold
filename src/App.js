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
import UVIPage from './content/pages/uvipage/UVIPage';

const App = () => {
  const [state, dispatch] = React.useReducer(globalReducer, initialGlobalState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={theme}>
        { state.isLoggedIn && state.hasAccess ? (
          <BrowserRouter>
            <Layout>
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/uvi" component={UVIPage} />
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
