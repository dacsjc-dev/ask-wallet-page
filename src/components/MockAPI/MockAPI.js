import React, { useEffect, useState } from 'react';
import { getUsers } from '../../services/mockAPI';
import { Button } from '@mui/material';

const MockAPI = () => {
  const [result, setResult] = useState([]);
  console.log('before: ', result);

  const loadAPI = async () => {
      const newResult = await getUsers();
      setResult(newResult);
      console.log(newResult)
  }

  return (
    <div>
      <h1>Hello! Kindly click this button to test out API! 
        <Button onClick={loadAPI}> Press me!</Button>
        Then check the console towards your Google DevTools</h1>
    </div>
  );
};

export default MockAPI;
