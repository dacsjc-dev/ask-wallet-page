import React from 'react';
import AskWallet from '../../components/AskWallet';
import {
  Container,
  Box,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    titlePrimary: {
      main: '#000000'
    },
    titleSecondary: {
      main: '#5B5B5B'
    },
  },
  shadows: Array(25).fill('none')
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" disableGutters="true">
        <Box>
          {/* Remove the Mock API if it's working! */}
          <AskWallet />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
