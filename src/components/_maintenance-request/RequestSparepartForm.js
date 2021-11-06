import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
// material
import { DialogTitle, DialogContent, DialogActions, Box, Button, Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// apis
import { sparepartsRequestsAdder } from '../../_apis_/systemRequests';
// components
import { DialogAnimate } from '../animate';
import { MIconButton } from '../@material-extend';

RequestSparepartForm.propTypes = {
  isTriggered: PropTypes.bool,
  triggerHandler: PropTypes.func,
  items: PropTypes.array,
  triggeredItem: PropTypes.number,
  triggeredDevice: PropTypes.number,
  setSparepartsRequests: PropTypes.func,
  devices: PropTypes.array,
  activityLogger: PropTypes.func
};

function RequestSparepartForm({
  triggeredDevice,
  isTriggered,
  triggerHandler,
  items,
  triggeredItem,
  setSparepartsRequests,
  devices,
  activityLogger
}) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [device, setDevice] = useState({});
  const [item, setItem] = useState({});
  const formik = useFormik({
    initialValues: {
      qty: 0
    },
    validationSchema: Yup.object().shape({
      qty: Yup.number().min(0, 'cannot be negative value').required('هذه الخانة مطلوبة')
    }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      const data = new FormData();
      data.append('deviceId', parseInt(device?.id, 10));
      data.append('sparepart', item?.id);
      data.append('qty', values.qty);

      sparepartsRequestsAdder(data)
        .then((sparepartsRequestsResponse) => {
          setSparepartsRequests(sparepartsRequestsResponse);
          enqueueSnackbar('تم طلب قطعة الغيار بنجاح', {
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

      resetForm();
      setSubmitting(false);
      triggerHandler();

      activityLogger(`تم طلب قطعة غيار - ${item?.itemName}`);
    }
  });
  const { dirty, errors, values, touched, isSubmitting, handleSubmit, setFieldValue, getFieldProps } = formik;

  useEffect(() => {
    const itemData = _.find(items, (o) => o.id === triggeredItem);
    setItem(itemData);
  }, [triggeredItem, items]);

  useEffect(() => {
    const deviceData = _.find(devices, (o) => o.id === parseInt(triggeredDevice, 10));
    setDevice(deviceData);
  }, [devices, triggeredDevice]);

  return (
    <DialogAnimate open={isTriggered} onClose={triggerHandler}>
      <DialogTitle>{`طلب قطعة غيار - ${item?.itemName}`}</DialogTitle>
      <DialogContent>
        <Box marginTop="30px">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                type="number"
                label="الكمية"
                value={values.qty}
                onChange={(event) => setFieldValue('qty', event.target.value)}
                {...getFieldProps('qty')}
                error={Boolean(touched.qty && errors.qty)}
                helperText={touched.qty && errors.qty}
                fullWidth
                focused
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <LoadingButton disabled={!dirty} loading={isSubmitting} onClick={handleSubmit} variant="contained">
          طلب
        </LoadingButton>
        <Button onClick={triggerHandler}>الغاء</Button>
      </DialogActions>
    </DialogAnimate>
  );
}

export default RequestSparepartForm;
