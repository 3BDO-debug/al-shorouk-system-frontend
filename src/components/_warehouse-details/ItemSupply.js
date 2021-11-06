import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
// material
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  TextField,
  Grid,
  Autocomplete,
  CircularProgress
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// apis
import { supplyRequestsAdder, systemLogsAdder } from '../../_apis_/systemRequests';
// contexts
import { ClientsContext, SystemRequestsContext } from '../../contexts';
// components
import { DialogAnimate } from '../animate';
import { MIconButton } from '../@material-extend';

ItemSupply.propTypes = {
  isTriggered: PropTypes.bool,
  triggerHandler: PropTypes.func,
  item: PropTypes.object
};

function ItemSupply({ isTriggered, triggerHandler, item }) {
  const clients = useContext(ClientsContext).clientsState[0];
  const setSupplyRequests = useContext(SystemRequestsContext).supplyRequestsState[1];
  const [clientsData, setClientsData] = useState([]);
  const setSystemLogs = useContext(SystemRequestsContext).systemLogsState[1];

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      client: null,
      qty: 0
    },
    validationSchema: Yup.object().shape({
      client: Yup.object().required('هذه الخانة مطلوبة'),
      qty: Yup.number().min(0, 'cannot be negative').required('هذه الخانة مطلوبة')
    }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      const data = new FormData();
      data.append('clientId', values.client.id);
      data.append('itemId', item?.id);
      data.append('qty', values.qty);

      supplyRequestsAdder(data)
        .then((supplyRequestsResponse) => {
          setSupplyRequests(supplyRequestsResponse);
          enqueueSnackbar('تم انشاء امر توريد بنجاح', {
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
      systemLogsRequestData.append('action', 'تم اصدار امر توريد');
      systemLogsAdder(systemLogsRequestData)
        .then((systemLogsResponse) => setSystemLogs(systemLogsResponse))
        .catch((error) => console.log(error));
    }
  });

  const { dirty, errors, values, touched, isSubmitting, handleSubmit, setFieldValue, getFieldProps } = formik;

  useEffect(() => {
    const clientsReformedData = _.map(clients, (o) => ({ label: o.client_name, id: o.id }));
    setClientsData(clientsReformedData);
  }, [clients]);

  return (
    <DialogAnimate open={isTriggered} onClose={triggerHandler}>
      <DialogTitle>توريد صنف</DialogTitle>
      <DialogContent>
        <Box marginTop="30px">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Autocomplete
                options={clientsData}
                value={values.client}
                onChange={(event, value) => {
                  setFieldValue('client', value && value);
                }}
                loading={clients.length === 0}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="العميل"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {clients.length === 0 && <CircularProgress color="inherit" size={20} />}
                          {params.InputProps.endAdornment}
                        </>
                      )
                    }}
                  />
                )}
              />{' '}
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                label="الكمية"
                {...getFieldProps('qty')}
                error={Boolean(touched.qty && errors.qty)}
                helperText={touched.qty && errors.qty}
                focused
                fullWidth
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

export default ItemSupply;
