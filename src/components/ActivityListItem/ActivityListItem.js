import React from 'react';
import {
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

import { ACTIVITY_TYPE } from '../../constants/activityTypes';

const findActivityTypeColor = (activity_type) => {
  return (
    ACTIVITY_TYPE.find(
      ({ activity, color }) => activity === activity_type && color
    ) || '#000000'
  );
};

const ActivityListItem = ({ id, title, price, type }) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={
            <Typography sx={{ color: findActivityTypeColor(type) }}>
              {price === '$ 0' ? 'Free' : price}
            </Typography>
          }
          secondary={
            <Typography sx={{ color: findActivityTypeColor(type) }}>
              {title}
            </Typography>
          }
        />
      </ListItem>
    </>
  );
};

export default ActivityListItem;
