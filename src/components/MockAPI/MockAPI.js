import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from '@mui/material';
import { getUsers } from '../../services/mockAPI';
import './MockAPI.scss';

const MockAPI = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const columns = [
    'id',
    'name',
    'createdAt',
  ];

  const loadAPI = async () => {
    try {
      setLoading(true);

      const newResults = await getUsers();
      console.log(newResults);

      setResults(newResults.slice(0, 10));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formatRow = (row, key) => {
    return (<TableRow key={`formatRows${key}`}>
      {
        columns.map((column, index) => (<TableCell key={`formatRows${key}_${index}`}>{row[column]}</TableCell>))
      }
    </TableRow>
    )
  }

  return (
    <Grid container spacing={2}>
      <Grid item md={5} >
        <Card className="MockAPIContainer" variant="outlined">
          <CardContent>
            <Typography variant="h5" sx={{ mb: 1.5 }} >Hello, click the button to test out our Mock API!
            </Typography>
            <Typography> Then check the console towards your Google DevTools
            </Typography>
          </CardContent>
          <Divider />
          <CardActions>
            <Button onClick={loadAPI} variant="contained" sx={{ minWidth: '110px' }} color="primary" disabled={isLoading}> {isLoading ? (<CircularProgress size='1.55rem' color='inherit' />) : 'Press me!'} </Button>
          </CardActions>
        </Card>
      </Grid>
      {
        !!results.length && (<Grid item md={7} >
          <Card className="MockAPIContainer" variant="outlined">
            <CardHeader title="Result" />
            <Divider />
            <CardContent>
              <TableContainer sx={{ width: '100%' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {
                        columns.map((column, index) => (<TableCell key={index}>{column}</TableCell>))
                      }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {results.map((result, index) => formatRow(result, index))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>)
      }

    </Grid>
  );
};

export default MockAPI;
