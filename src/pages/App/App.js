import React from 'react';
import MockAPI from '../../components/MockAPI';
import {
  Container,
  Box,
} from '@mui/material';

const App = () => {
  return (
    <Container maxWidth="xl">
      <Box>
        {/* Remove the Mock API if it's working! */}
        <MockAPI />
      </Box>
    </Container>
  );
};

export default App;
