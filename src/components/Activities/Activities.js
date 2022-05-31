import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Typography,
  CircularProgress,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { useCookies } from 'react-cookie';
import { getActivities } from '../../services/boredAPI';

import ActivityListItem from '../ActivityListItem';


const Activities = () => {
  const [cookies, setCookies] = useCookies(['activities']);
  const addCookies = !!cookies?.activities ? cookies.activities : [];
  const [activities, setActivities] = useState(addCookies);
  const [isLoading, setLoading] = useState(false);

  const handleCookies = (results) => {
    const cookiesOption = {
      path: '/',
      maxAge: 300,
    };

    setCookies('activities', JSON.stringify(results), cookiesOption);
  };

  const handleActivities = async () => {
    try {
      setLoading(true);

      const results = await getActivities();
      console.log(results);
      const getDate = new Date();

      const newActivities = [...activities, { ...results, date: getDate }].sort(
        (activity1, activity2) =>
          new Date(activity2.date) - new Date(activity1.date)
      );

      setActivities(newActivities);

      handleCookies(newActivities);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const Item = styled(Card)(({ theme }) => ({
    backgroundColor: '#1A2027',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const ActivityGetter = styled(Card)(({ theme }) => ({
    backgroundColor: '#1A2027',
    ...theme.typography.body2,
    padding: theme.spacing(1),

    color: '#000000',
  }));

  return (
    <Grid container spacing={2}>
      <Grid item md={5} >
        <ActivityGetter className="MockAPIContainer" variant="outlined">
          <CardContent>
            <Typography variant="h5" sx={{ color: 'white' }} >Nothing to do?
            </Typography>
            <Typography sx={{ color: 'white' }} >
              Press the button to find an activity!
            </Typography>
          </CardContent>
          <Divider />
          <CardActions>
            <Button onClick={handleActivities} variant="contained" sx={{ minWidth: '120px' }} color="primary" disabled={isLoading}> {isLoading ? (<CircularProgress size='1.55rem' color='inherit' />) : 'Press me!'} </Button>
          </CardActions>
        </ActivityGetter>
      </Grid>
      {
        !!activities.length && (
          <Grid item md={7} >
            <ActivityGetter sx={{ flexGrow: 1 }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 1.5, color: '#FFFFFF' }} >List of Activities
                </Typography>
              </CardContent>
              <Divider />
              <Item>
                {activities.map(({ key, price, type, activity }, index) =>
                  index + 1 !== activities.length ? (
                    <React.Fragment key={key}>
                      <ActivityListItem
                        id={key}
                        price={`$ ${price}`}
                        type={type}
                        title={activity}
                      />
                      <Divider />
                    </React.Fragment>
                  ) : (
                    <React.Fragment key={key}>
                      <ActivityListItem
                        id={key}
                        price={`$ ${price}`}
                        type={type}
                        title={activity}
                      />
                    </React.Fragment>
                  )
                )}{' '}
              </Item>
            </ActivityGetter>
          </Grid>
        )}
    </Grid>
  )
};

export default Activities;
