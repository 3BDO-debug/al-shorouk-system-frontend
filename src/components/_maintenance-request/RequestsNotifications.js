import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// material
import { DialogTitle, DialogContent, DialogActions, Box, Button, List, ListItem, Divider } from '@mui/material';
// apis
import { changeMaintenanceRequestDeviceStatusFetcher } from '../../_apis_/systemRequests';
// contexts
import { SystemRequestsContext } from '../../contexts/SystemRequests';
// components
import { DialogAnimate } from '../animate';
import ChangeDeviceStatusRequest from './ChangeDeviceStatusRequest';
import SparepartRequest from './SparepartRequest';

RequestsNotifications.propTypes = {
  isTriggered: PropTypes.bool,
  triggerHandler: PropTypes.func,
  maintenanceRequestId: PropTypes.number,
  triggeredDevice: PropTypes.number,
  devicesState: PropTypes.array
};

function RequestsNotifications({ isTriggered, triggerHandler, maintenanceRequestId, triggeredDevice, devicesState }) {
  const [devices, setDevices] = devicesState;
  const [sparepartsRequests, setSparepartsRequests] = useContext(SystemRequestsContext).sparepartsRequestsState;
  const [filteredSparepartsRequests, setFilteredSparepartsRequests] = useState([]);
  const [changeDeviceStatusRequest, setChangeDeviceStatusRequest] = useState([]);
  const [filteredChangeDeviceStatusRequest, setFilteredChangeDeviceStatusRequest] = useState({});
  const [device, setDevice] = useState({});

  useEffect(() => {
    const deviceData = _.find(devices, (o) => o.id === triggeredDevice);
    setDevice(deviceData);
  }, [devices, triggeredDevice]);

  useEffect(() => {
    if (isTriggered) {
      changeMaintenanceRequestDeviceStatusFetcher(maintenanceRequestId)
        .then((response) => {
          setChangeDeviceStatusRequest(response);
        })
        .catch((error) => console.log(error));
    }
  }, [maintenanceRequestId, isTriggered]);

  useEffect(() => {
    const sparepartsRequestsData = _.filter(
      sparepartsRequests,
      (o) => o.maintenance_request_device === device?.id && o.supervisor_proceeded === false
    );
    setFilteredSparepartsRequests(sparepartsRequestsData);
  }, [device, sparepartsRequests]);

  useEffect(() => {
    const changeDeviceStatusRequestData = _.find(
      changeDeviceStatusRequest,
      (o) => o.maintenance_request_device === device?.id && o.is_proceeded === false
    );
    setFilteredChangeDeviceStatusRequest(changeDeviceStatusRequestData);
  }, [changeDeviceStatusRequest, device]);

  return (
    <DialogAnimate open={isTriggered} onClose={triggerHandler}>
      <DialogTitle>طلبات الجهاز</DialogTitle>
      <DialogContent>
        <Box marginTop="30px">
          <List>
            <ListItem>
              {filteredChangeDeviceStatusRequest && (
                <ChangeDeviceStatusRequest
                  maintenanceRequestId={parseInt(maintenanceRequestId, 10)}
                  filteredChangeDeviceStatusRequest={filteredChangeDeviceStatusRequest}
                  setChangeDeviceStatusRequest={setChangeDeviceStatusRequest}
                  deviceId={device?.id}
                  setDevices={setDevices}
                />
              )}
            </ListItem>
            <Divider />
            {filteredSparepartsRequests.map((sparepartRequest) => (
              <>
                <ListItem>
                  <SparepartRequest sparepartRequest={sparepartRequest} setSparepartsRequests={setSparepartsRequests} />
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

export default RequestsNotifications;
