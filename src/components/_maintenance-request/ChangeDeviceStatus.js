import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
// material
import { DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// apis
import { changeMaintenanceRequestDeviceStatusAdder } from '../../_apis_/systemRequests';
// components
import { DialogAnimate } from '../animate';
import Label from '../Label';
import { MIconButton } from '../@material-extend';

ChangeDeviceStatus.propTypes = {
  isTriggered: PropTypes.bool,
  triggerHandler: PropTypes.func,
  requestedStatus: PropTypes.string,
  maintenanceRequestId: PropTypes.number,
  devices: PropTypes.array,
  triggeredDevice: PropTypes.number,
  activityLogger: PropTypes.func
};

function ChangeDeviceStatus({
  isTriggered,
  triggerHandler,
  requestedStatus,
  maintenanceRequestId,
  devices,
  triggeredDevice,
  activityLogger
}) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [device, setDevice] = useState({});

  const formik = useFormik({
    initialValues: {
      notes: ''
    },
    validationSchema: Yup.object().shape({
      notes: Yup.string().required('هذه الخانة مطلوبة')
    }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      const data = new FormData();
      data.append('notes', values.notes);
      data.append('deviceId', device?.id);
      data.append('requestedStatus', requestedStatus);
      changeMaintenanceRequestDeviceStatusAdder(maintenanceRequestId, data)
        .then((response) => {
          enqueueSnackbar('تم طلب تغير حالة الجهاز بنجاح', {
            variant: 'success',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          });
          console.log(response);
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
      resetForm();
      setSubmitting(false);
      triggerHandler();

      activityLogger(`طلب تغيير حالة الجهاز الي - ${requestedStatus}`);
    }
  });

  const { dirty, errors, values, touched, isSubmitting, handleSubmit, setFieldValue, getFieldProps } = formik;

  useEffect(() => {
    const deviceData = _.find(devices, (o) => o.id === triggeredDevice);
    setDevice(deviceData);
  }, [devices, triggeredDevice]);

  return (
    <DialogAnimate open={isTriggered} onClose={triggerHandler}>
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography>طلب تغير حالة الجهاز</Typography>
          <Label variant="ghost" color="primary">
            {requestedStatus}
          </Label>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Box marginTop="30px">
          <TextField
            label="ملاحظات"
            value={values.notes}
            onChange={(event) => setFieldValue('notes', event.target.value)}
            multiline
            fullWidth
            rows={3}
            {...getFieldProps('notes')}
            error={Boolean(touched.notes && errors.notes)}
            helperText={touched.notes && errors.notes}
            focused
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={triggerHandler}>الغاء</Button>
        <LoadingButton disabled={!dirty} onClick={handleSubmit} loading={isSubmitting} variant="contained">
          حفظ
        </LoadingButton>
      </DialogActions>
    </DialogAnimate>
  );
}

export default ChangeDeviceStatus;
