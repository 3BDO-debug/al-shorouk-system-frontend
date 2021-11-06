import React from 'react';
import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';
// components
import MaintenanceEngineer from './MaintenanceEngineer';
import StoreKeeper from './StoreKeeper';

Timeline.propTypes = {
  user: PropTypes.object
};

function Timeline({ user }) {
  const userView = () => {
    let view;
    if (['maintenance-manager', 'maintenance-engineer'].includes(user?.role)) {
      view = <MaintenanceEngineer user={user} />;
    } else if (user?.role === 'store-keeper') {
      view = <StoreKeeper user={user} />;
    }
    return view;
  };

  return <Box>{userView()}</Box>;
}

export default Timeline;
