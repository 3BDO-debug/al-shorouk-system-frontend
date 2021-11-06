import React, { useCallback, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
// material
import { DialogTitle, DialogContent, DialogActions, Box, Button, Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// apis
import { clientDeviceAdder } from '../../_apis_/clientProfile';
import { systemLogsAdder } from '../../_apis_/systemRequests';
// contexts
import { SystemRequestsContext } from '../../contexts';
// components
import { DialogAnimate } from '../animate';
import { UploadSingleFile } from '../upload';
import { MIconButton } from '../@material-extend';

AddDevice.propTypes = {
  isTriggered: PropTypes.bool,
  triggerHandler: PropTypes.func,
  clientId: PropTypes.number,
  setClientDevices: PropTypes.func
};

function AddDevice({ isTriggered, triggerHandler, clientId, setClientDevices }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [filePreview, setFilePreviw] = useState(null);
  const setSystemLogs = useContext(SystemRequestsContext).systemLogsState[1];

  const formik = useFormik({
    initialValues: {
      serial: '',
      model: '',
      file: null
    },
    validationSchema: Yup.object().shape({
      serial: Yup.string().required('هذه الخانة مطلوبة'),
      model: Yup.string().required('هذه الخانة مطلوبة')
    }),
    onSubmit: (values, { resetForm }) => {
      const data = new FormData();
      data.append('values', JSON.stringify(values));
      data.append('files', values.file);
      clientDeviceAdder(clientId, data)
        .then((clientDevicesResponse) => {
          setClientDevices(clientDevicesResponse);
          enqueueSnackbar('تم اضافة الجهاز بنجاح', {
            variant: 'success',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          });
        })
        .catch((error) =>
          enqueueSnackbar(`حدث خطا مل - ${error}`, {
            variant: 'error',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          })
        );
      setFilePreviw(null);
      resetForm();

      const systemLogsRequestData = new FormData();
      systemLogsRequestData.append('action', 'تم اضافة جهاز للعميل');
      systemLogsAdder(systemLogsRequestData)
        .then((systemLogsResponse) => setSystemLogs(systemLogsResponse))
        .catch((error) => console.log(error));
    }
  });

  const { dirty, errors, values, touched, isSubmitting, handleSubmit, setFieldValue, getFieldProps } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('file', file);
        setFilePreviw({
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <DialogAnimate open={isTriggered} onClose={triggerHandler}>
      <DialogTitle>اضافة جهاز للعميل</DialogTitle>
      <DialogContent>
        <Box marginTop="30px" component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                label="الموديل"
                focused
                value={values.model}
                onChange={(event) => setFieldValue('model', event.target.value)}
                {...getFieldProps('model')}
                error={Boolean(touched.model && errors.model)}
                helperText={touched.model && errors.model}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                label="السريل"
                value={values.serial}
                onChange={(event) => setFieldValue('serial', event.target.value)}
                {...getFieldProps('serial')}
                error={Boolean(touched.serial && errors.serial)}
                helperText={touched.serial && errors.serial}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <UploadSingleFile maxSize={3145728} accept="image/*" file={filePreview} onDrop={handleDrop} />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          disabled={!dirty}
          onClick={handleSubmit}
          type="submit"
          loading={isSubmitting}
          variant="contained"
        >
          حفظ
        </LoadingButton>
        <Button onClick={triggerHandler}>الغاء</Button>
      </DialogActions>
    </DialogAnimate>
  );
}

export default AddDevice;
