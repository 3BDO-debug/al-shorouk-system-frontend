import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
// material
import { DialogTitle, Button, DialogActions, DialogContentText, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// apis
import { deviceUpdater } from '../../_apis_/maintenanceRequest';
// components
import { DialogAnimate } from '../animate';
import { MIconButton } from '../@material-extend';

ResetDeviceStatus.propTypes = {
  isTriggered: PropTypes.bool,
  triggerHandler: PropTypes.func,
  requestedDeviceStatus: PropTypes.string,
  devicesState: PropTypes.array,
  triggeredDevice: PropTypes.number,
  maintenanceRequestId: PropTypes.number,
  activityLogger: PropTypes.func
};

function ResetDeviceStatus({
  isTriggered,
  triggerHandler,
  requestedDeviceStatus,
  devicesState,
  triggeredDevice,
  maintenanceRequestId,
  activityLogger
}) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [devices, setDevices] = devicesState;
  const [device, setDevice] = useState({});
  const [loading, setLoading] = useState(false);

  const resetDeviceStatusHandler = () => {
    setLoading(true);
    const data = new FormData();
    data.append('deviceId', device?.id);
    data.append('status', requestedDeviceStatus);

    deviceUpdater(maintenanceRequestId, data)
      .then((devicesResponse) => {
        setDevices(devicesResponse);
        enqueueSnackbar('تم اعادة حالة الجهاز الي الحالة الاصلية', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      })
      .catch((error) =>
        enqueueSnackbar(`حدث خطأ ما - ${error}`, {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        })
      );

    setLoading(false);
    triggerHandler();

    activityLogger('تم رجوع حالي الجهاز الي الحالة الرئيسية');
  };

  useEffect(() => {
    const deviceData = _.find(devices, (o) => o.id === triggeredDevice);
    setDevice(deviceData);
  }, [devices, triggeredDevice]);

  return (
    <DialogAnimate open={isTriggered} onClose={triggerHandler}>
      <DialogTitle>انتبه</DialogTitle>
      <DialogContentText>
        <Box padding="15px">هل تريد اعادة حالة الجهاز الي الحالة الاصلية ؟</Box>
      </DialogContentText>
      <DialogActions>
        <LoadingButton loading={loading} disabled={loading} onClick={resetDeviceStatusHandler}>
          نعم
        </LoadingButton>
        <Button onClick={triggerHandler} color="error">
          الغاء
        </Button>
      </DialogActions>
    </DialogAnimate>
  );
}

export default ResetDeviceStatus;
