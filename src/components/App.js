import React from 'react';
import { ThemeProvider } from 'styled-components';
import { CssBaseline, Grid } from '@material-ui/core';
import { ReactQueryDevtools } from 'react-query-devtools'

import { Header } from '../shared';
import Routes, { RenderRoutes } from '../shared/navigation/Routes';
import { RateLimitContextProvider } from '../contexts/RateLimit'
import theme from '../shared/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ReactQueryDevtools initialIsOpen={false} />
      <RateLimitContextProvider>
        <Grid container direction="column">
          <Header />
          <RenderRoutes routes={Routes} />
        </Grid>
      </RateLimitContextProvider>
    </ThemeProvider>
  );
}

export default App;
