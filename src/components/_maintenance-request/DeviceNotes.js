import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
// material
import { DialogContent, DialogTitle, DialogActions, Box, Grid, TextField, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// apis
import { deviceUpdater } from '../../_apis_/maintenanceRequest';
// components
import { DialogAnimate } from '../animate';
import { MIconButton } from '../@material-extend';

DeviceNotes.propTypes = {
  maintenanceRequestId: PropTypes.number,
  isTriggered: PropTypes.bool,
  triggerHandler: PropTypes.func,
  triggeredDevice: PropTypes.object,
  devicesState: PropTypes.array
};

function DeviceNotes({ maintenanceRequestId, isTriggered, triggerHandler, devicesState, triggeredDevice }) {
  const [devices, setDevices] = devicesState;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [device, setDevice] = useState({});
  const formik = useFormik({
    initialValues: {
      supervisorNotes: ''
    },
    validationSchema: Yup.object().shape({
      supervisorNotes: Yup.string().required('هذه الخانة مطلوبة')
    }),
    onSubmit: (values, { resetForm }) => {
      const data = new FormData();
      data.append('deviceId', device?.id);
      data.append('supervisorNotes', values.supervisorNotes);
      deviceUpdater(maintenanceRequestId, data)
        .then((devicesResponse) => {
          setDevices(devicesResponse);
          enqueueSnackbar('تم اضافة الملاحظات', {
            variant: 'success',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          });
        })
        .catch((error) =>
          enqueueSnackbar(`حدث خطا ما - ${error}`, {
            variant: 'error',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          })
        );
      resetForm();
    }
  });

  useEffect(() => {
    const deviceData = _.find(devices, (o) => o.id === triggeredDevice);
    setDevice(deviceData);
  }, [triggeredDevice, devices]);

  const { dirty, errors, values, touched, isSubmitting, handleSubmit, setFieldValue, getFieldProps } = formik;

  return (
    <DialogAnimate open={isTriggered} onClose={triggerHandler}>
      <DialogTitle>ملاحظات الجهاز</DialogTitle>
      <DialogContent>
        <Box component="form" marginTop="30px">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              {device?.supervisor_notes ? (
                <TextField label="الملاحظات" value={device?.supervisor_notes} multiline rows={4} fullWidth />
              ) : (
                <TextField
                  label="الملاحظات"
                  value={values.supervisorNotes}
                  onChange={(event) => setFieldValue('supervisorNotes', event.target.value)}
                  {...getFieldProps('supervisorNotes')}
                  error={Boolean(touched.supervisorNotes && errors.supervisorNotes)}
                  helperText={touched.supervisorNotes && errors.supervisorNotes}
                  multiline
                  rows={4}
                  fullWidth
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <LoadingButton disabled={!dirty} loading={isSubmitting} onClick={handleSubmit} variant="contained">
          حفظ
        </LoadingButton>
        <Button onClick={triggerHandler}>الغاء</Button>
      </DialogActions>
    </DialogAnimate>
  );
}

export default DeviceNotes;
