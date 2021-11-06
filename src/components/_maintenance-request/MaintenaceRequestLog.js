import React from 'react';
import PorpTypes from 'prop-types';
// material
import { ListItem, ListItemAvatar, ListItemText, Divider, Avatar, Typography } from '@mui/material';
// apis
import { mainUrl } from '../../_apis_/axios';
// components

MaintenaceRequestLog.propTypes = {
  maintenaceRequestLog: PorpTypes.object
};

function MaintenaceRequestLog({ maintenaceRequestLog }) {
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar
            src={`${mainUrl}/${maintenaceRequestLog?.action_by_profile_pic}`}
            alt={`${maintenaceRequestLog?.action_by_name}`}
          />
        </ListItemAvatar>
        <ListItemText
          primary={`${maintenaceRequestLog?.action_by_name}`}
          secondary={<Typography variant="caption">{maintenaceRequestLog?.action} </Typography>}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}

export default MaintenaceRequestLog;
