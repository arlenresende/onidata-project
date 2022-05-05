import React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { GlobalTheme } from './styles/global';
import CssBaseline from '@mui/material/CssBaseline';
import RouterMain from './routes';
import { LoginContextProvider } from './context/loginContext';
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={GlobalTheme}>
        <CssBaseline />
        <LoginContextProvider>
          <RouterMain />
        </LoginContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
