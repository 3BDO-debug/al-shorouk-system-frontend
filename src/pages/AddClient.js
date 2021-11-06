import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
// material
import { Card, Container, Box, Grid, TextField, CardContent } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// apis
import { clientsAdder } from '../_apis_/clients';
import { systemLogsAdder } from '../_apis_/systemRequests';
// context
import { ClientsContext, SystemRequestsContext } from '../contexts';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { MIconButton } from '../components/@material-extend';

function AddClient() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const setClients = useContext(ClientsContext).clientsState[1];
  const setSystemLogs = useContext(SystemRequestsContext).systemLogsState[1];

  const formik = useFormik({
    initialValues: {
      clientName: '',
      address: '',
      phoneNumber1: '',
      phoneNumber2: '',
      fax: ''
    },
    validationSchema: Yup.object().shape({
      clientName: Yup.string().required('هذه الخانة مطلوبة'),
      address: Yup.string().required('هذه الخانة مطلوبة'),
      phoneNumber1: Yup.number().required('هذه الخانة مطلوبة'),
      phoneNumber2: Yup.number().required('هذه الخانة مطلوبة'),
      fax: Yup.number().required('هذه الخانة مطلوبة')
    }),
    onSubmit: (values, { resetForm }) => {
      const data = new FormData();
      data.append('values', JSON.stringify(values));
      clientsAdder(data)
        .then((clientsResponse) => {
          setClients(clientsResponse);
          enqueueSnackbar('تم اضافة عميل', {
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

      const systemLogsRequestData = new FormData();
      systemLogsRequestData.append('action', 'تم اضافة عميل');
      systemLogsAdder(systemLogsRequestData)
        .then((systemLogsResponse) => setSystemLogs(systemLogsResponse))
        .catch((error) => console.log(error));
    }
  });

  const { dirty, errors, values, touched, isSubmitting, handleSubmit, setFieldValue, getFieldProps } = formik;

  return (
    <Page title="اضافة عميل">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading="اضافة عميل"
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'العملاء', href: PATH_DASHBOARD.general.clients.listClients },
            { name: 'اضافة عميل' }
          ]}
        />
        <Card>
          <CardContent>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    value={values.clientName}
                    onChange={(event) => setFieldValue('clientName', event.target.value)}
                    label="اسم العميل"
                    fullWidth
                    {...getFieldProps('clientName')}
                    error={Boolean(touched.clientName && errors.clientName)}
                    helperText={touched.clientName && errors.clientName}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    value={values.phoneNumber1}
                    onChange={(event) => setFieldValue('phoneNumber1', event.target.value)}
                    label="رقم الهاتف 1"
                    fullWidth
                    {...getFieldProps('phoneNumber1')}
                    error={Boolean(touched.phoneNumber1 && errors.phoneNumber1)}
                    helperText={touched.phoneNumber1 && errors.phoneNumber1}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    value={values.phoneNumber2}
                    onChange={(event) => setFieldValue('phoneNumber2', event.target.value)}
                    label="رقم الهاتف 2"
                    fullWidth
                    {...getFieldProps('phoneNumber2')}
                    error={Boolean(touched.phoneNumber2 && errors.phoneNumber2)}
                    helperText={touched.phoneNumber2 && errors.phoneNumber2}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    value={values.fax}
                    onChange={(event) => setFieldValue('fax', event.target.value)}
                    label="فاكس"
                    fullWidth
                    {...getFieldProps('fax')}
                    error={Boolean(touched.fax && errors.fax)}
                    helperText={touched.fax && errors.fax}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    value={values.address}
                    onChange={(event) => setFieldValue('address', event.target.value)}
                    label="العنوان"
                    fullWidth
                    {...getFieldProps('address')}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <LoadingButton disabled={!dirty} onClick={handleSubmit} loading={isSubmitting} variant="contained">
                    حفظ
                  </LoadingButton>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default AddClient;
