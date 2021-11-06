import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// material
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SettingsIcon from '@mui/icons-material/Settings';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import WarningIcon from '@mui/icons-material/Warning';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
// components
import { DialogAnimate } from '../animate';
import AssignEngineer from './AssignEngineer';
import RequestSparepart from './RequestSparepart';
import ChangeDeviceStatus from './ChangeDeviceStatus';
import ResetDeviceStatus from './ResetDeviceStatus';

DeviceActions.propTypes = {
  isTriggered: PropTypes.bool,
  triggerHandler: PropTypes.func,
  maintenanceRequestId: PropTypes.number,
  devicesState: PropTypes.array,
  triggeredDevice: PropTypes.number,
  activityLogger: PropTypes.func
};

function DeviceActions({
  isTriggered,
  triggerHandler,
  maintenanceRequestId,
  devicesState,
  triggeredDevice,
  activityLogger
}) {
  const [devices, setDevices] = devicesState;
  const [device, setDevice] = useState({});
  const [assignEngineer, triggerAssignEngineer] = useState(false);
  const [requestSparepart, triggerRequestSparepart] = useState(false);
  const [changeDeviceStatus, triggerChangeDeviceStatus] = useState(false);
  const [requestedDeviceStatus, setRequestedDeviceStatus] = useState('');
  const [resetDeviceStatus, triggerResetDeviceStatus] = useState(false);

  useEffect(() => {
    const deviceData = _.find(devices, (o) => o.id === triggeredDevice);
    setDevice(deviceData);
  }, [devices, triggeredDevice]);

  return (
    <>
      <DialogAnimate open={isTriggered} onClose={triggerHandler}>
        <DialogTitle>اجرائات علي الجهاز</DialogTitle>
        <DialogContent>
          <List>
            <ListItemButton onClick={() => triggerAssignEngineer(true)}>
              <ListItemIcon>
                <EngineeringIcon color="primary" />
              </ListItemIcon>
              <ListItemText secondary="تعيين الي مهندس" />
            </ListItemButton>
            <Divider orientation="horizontal" sx={{ m: 1 }} variant="middle" />
            <ListItemButton disabled={device?.status !== 'في الصيانة'} onClick={() => triggerRequestSparepart(true)}>
              <ListItemIcon>
                <SettingsIcon color="secondary" />
              </ListItemIcon>
              <ListItemText secondary="طلب قطعة غيار" />
            </ListItemButton>
            <Divider orientation="horizontal" sx={{ m: 1 }} variant="middle" />

            <ListItemButton
              disabled={device?.status !== 'في الصيانة'}
              onClick={() => {
                setRequestedDeviceStatus('تم الاكمال');
                triggerChangeDeviceStatus(true);
              }}
            >
              <ListItemIcon>
                <DoneAllIcon color="success" />
              </ListItemIcon>
              <ListItemText secondary="تم الاكمال" />
            </ListItemButton>
            <Divider orientation="horizontal" sx={{ m: 1 }} variant="middle" />

            <ListItemButton
              disabled={device?.status !== 'في الصيانة'}
              onClick={() => {
                setRequestedDeviceStatus('لم يكتمل');
                triggerChangeDeviceStatus(true);
              }}
            >
              <ListItemIcon>
                <WarningIcon color="error" />
              </ListItemIcon>
              <ListItemText secondary="لم تكتمل" />
            </ListItemButton>
            <Divider orientation="horizontal" sx={{ m: 1 }} variant="middle" />

            <ListItemButton
              disabled={device?.status === 'في الصيانة'}
              onClick={() => {
                setRequestedDeviceStatus('في الصيانة');
                triggerResetDeviceStatus(true);
              }}
            >
              <ListItemIcon>
                <RotateLeftIcon color="warning" />
              </ListItemIcon>
              <ListItemText secondary="الرجوع الي الحالة الرئيسية للجهاز" />
            </ListItemButton>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={triggerHandler}>انهاء</Button>
        </DialogActions>
      </DialogAnimate>

      <AssignEngineer
        isTriggered={assignEngineer}
        triggerHandler={() => triggerAssignEngineer(false)}
        maintenanceRequestId={maintenanceRequestId}
        devicesState={devicesState}
        triggeredDevice={triggeredDevice}
        activityLogger={activityLogger}
      />
      <RequestSparepart
        isTriggered={requestSparepart}
        triggerHandler={() => triggerRequestSparepart(false)}
        triggeredDevice={triggeredDevice}
        devices={devicesState[0]}
        activityLogger={activityLogger}
      />
      <ChangeDeviceStatus
        isTriggered={changeDeviceStatus}
        triggerHandler={() => triggerChangeDeviceStatus(false)}
        requestedStatus={requestedDeviceStatus}
        maintenanceRequestId={maintenanceRequestId}
        devices={devicesState[0]}
        triggeredDevice={parseInt(triggeredDevice, 10)}
        activityLogger={activityLogger}
      />
      <ResetDeviceStatus
        isTriggered={resetDeviceStatus}
        triggerHandler={() => triggerResetDeviceStatus(false)}
        triggeredDevice={triggeredDevice}
        devicesState={[devices, setDevices]}
        requestedDeviceStatus={requestedDeviceStatus}
        maintenanceRequestId={maintenanceRequestId}
        activityLogger={activityLogger}
      />
    </>
  );
}

export default DeviceActions;
