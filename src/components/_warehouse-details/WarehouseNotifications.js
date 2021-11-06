import React from 'react';
import PropTypes from 'prop-types';
// material
import { DialogTitle, DialogContent, DialogActions, Box, Button, List, ListItem, Divider } from '@mui/material';
// components
import { DialogAnimate } from '../animate';
import SparepartRequest from '../_maintenance-request/SparepartRequest';

WarehouseNotifications.propTypes = {
  isTriggered: PropTypes.bool,
  triggerHandler: PropTypes.func,
  setSparepartsRequests: PropTypes.func,
  sparepartsRequests: PropTypes.array
};

function WarehouseNotifications({ isTriggered, triggerHandler, setSparepartsRequests, sparepartsRequests }) {
  return (
    <DialogAnimate open={isTriggered} onClose={triggerHandler}>
      <DialogTitle>اشعارات المخزن</DialogTitle>
      <DialogContent>
        <Box marginTop="30px">
          <List>
            {sparepartsRequests.map((sparepartRequest) => (
              <>
                <ListItem>
                  <SparepartRequest
                    warehouseView
                    sparepartRequest={sparepartRequest}
                    setSparepartsRequests={setSparepartsRequests}
                  />
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={triggerHandler}>الغاء</Button>
      </DialogActions>
    </DialogAnimate>
  );
}

export default WarehouseNotifications;
