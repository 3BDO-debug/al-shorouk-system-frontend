import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
// material
import { Box, Grid, Stack, Typography, Avatar, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// apis
import { deviceUpdater } from '../../_apis_/maintenanceRequest';
import { changeMaintenanceRequestDeviceStatusUpdater } from '../../_apis_/systemRequests';
import { mainUrl } from '../../_apis_/axios';
// components
import Label from '../Label';
import { MIconButton } from '../@material-extend';

ChangeDeviceStatusRequest.propTypes = {
  filteredChangeDeviceStatusRequest: PropTypes.object,
  setChangeDeviceStatusRequest: PropTypes.func,
  deviceId: PropTypes.number,
  maintenanceRequestId: PropTypes.number,
  setDevices: PropTypes.func
};

function ChangeDeviceStatusRequest({
  maintenanceRequestId,
  filteredChangeDeviceStatusRequest,
  setChangeDeviceStatusRequest,
  deviceId,
  setDevices
}) {
  const [submitting, setSubmitting] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const proceedChangeDeviceStatusRequest = (status) => {
    const updateRequestData = new FormData();
    updateRequestData.append('requestId', filteredChangeDeviceStatusRequest?.id);
    changeMaintenanceRequestDeviceStatusUpdater(maintenanceRequestId, updateRequestData)
      .then((changeDeviceStatusRequestResponse) => {
        setChangeDeviceStatusRequest(changeDeviceStatusRequestResponse);
        enqueueSnackbar(`تم ${status}`, {
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
  };

  const handleDeviceStatusChange = (status) => {
    setSubmitting(true);
    if (status === 'accepted') {
      proceedChangeDeviceStatusRequest('قبول');
      const updateDeviceData = new FormData();
      updateDeviceData.append('deviceId', deviceId);
      updateDeviceData.append('status', filteredChangeDeviceStatusRequest?.requested_status);

      deviceUpdater(maintenanceRequestId, updateDeviceData)
        .then((devicesResponse) => {
          setDevices(devicesResponse);
          enqueueSnackbar('تم تعديل حالة الجهاز بنجاح', {
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
    } else if (status === 'declined') {
      proceedChangeDeviceStatusRequest('رفض');
    }
    setSubmitting(false);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="subtitle2">طلب تغير حالة الجهاز</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="body2">
            <Stack direction="row" alignItems="center">
              <Typography sx={{ marginRight: '25px' }} variant="caption">
                بواسطة
              </Typography>

              <Avatar
                sx={{ marginRight: '10px' }}
                src={`${mainUrl}/${filteredChangeDeviceStatusRequest?.requested_by_profile_pic}`}
                alt={filteredChangeDeviceStatusRequest?.requested_by_name}
              />
              <Typography variant="caption">{filteredChangeDeviceStatusRequest?.requested_by_name}</Typography>
            </Stack>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Stack direction="row" alignItems="center">
            <Typography variant="caption" sx={{ marginRight: '25px' }}>
              الحالة المطلوبة
            </Typography>
            <Label variant="ghost" color="primary">
              {filteredChangeDeviceStatusRequest?.requested_status}
            </Label>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TextField label="الملاحظات" value={filteredChangeDeviceStatusRequest?.notes} multiline rows={3} fullWidth />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <LoadingButton
            loading={submitting}
            disabled={submitting}
            onClick={() => handleDeviceStatusChange('accepted')}
          >
            قبول
          </LoadingButton>
          <LoadingButton
            loading={submitting}
            disabled={submitting}
            color="error"
            onClick={() => handleDeviceStatusChange('declined')}
          >
            رفض
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChangeDeviceStatusRequest;
