import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
// material
import { DialogTitle, DialogContent, DialogActions, Button, Box, Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// apis
import { itemUpdater } from '../../_apis_/storage';
import { systemLogsAdder } from '../../_apis_/systemRequests';
// contexts
import { SystemRequestsContext } from '../../contexts';
// components
import { DialogAnimate } from '../animate';
import { MIconButton } from '../@material-extend';

AddItemQty.propTypes = {
  isTriggered: PropTypes.bool,
  triggerHandler: PropTypes.func,
  item: PropTypes.object,
  setItems: PropTypes.func
};

function AddItemQty({ isTriggered, triggerHandler, item, setItems }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const setSystemLogs = useContext(SystemRequestsContext).systemLogsState[1];

  const formik = useFormik({
    initialValues: {
      qty: 0
    },
    validationSchema: Yup.object().shape({
      qty: Yup.number().min(0, 'cannot have negative value').required('هذه الخانة مطلوبة')
    }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      const data = new FormData();
      data.append('itemId', item?.id);
      data.append('qty', values.qty);
      itemUpdater(data)
        .then((itemsResponse) => {
          setItems(itemsResponse);
          enqueueSnackbar('تم اضافة كمية الي الصنف', {
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

      const systemLogsRequestData = new FormData();
      systemLogsRequestData.append('action', 'تم اضافة كمية الي عنصر');
      systemLogsAdder(systemLogsRequestData)
        .then((systemLogsResponse) => setSystemLogs(systemLogsResponse))
        .catch((error) => console.log(error));
    }
  });

  const { dirty, errors, values, touched, isSubmitting, handleSubmit, setFieldValue, getFieldProps } = formik;

  return (
    <DialogAnimate open={isTriggered} onClose={triggerHandler}>
      <DialogTitle>اضافة كمية الي الصنف</DialogTitle>
      <DialogContent>
        <Box marginTop="30px">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                label="الكمية"
                value={values.qty}
                onChange={(event) => setFieldValue('qty', event.target.value)}
                fullWidth
                type="number"
                {...getFieldProps('qty')}
                error={Boolean(touched.qty && errors.qty)}
                helperText={touched.qty && errors.qty}
                focused
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={triggerHandler}>
          الغاء
        </Button>
        <LoadingButton loading={isSubmitting} disabled={!dirty} onClick={handleSubmit} variant="contained">
          حفظ
        </LoadingButton>
      </DialogActions>
    </DialogAnimate>
  );
}

export default AddItemQty;
