import React from 'react';
import Activities from '../../components/Activities';
import {
  Container,
  Box,
} from '@mui/material';

const App = () => {
  return (
    <Container maxWidth="xl">
      <Box>
        <Activities />
      </Box>
    </Container>
  );
};

export default App;
