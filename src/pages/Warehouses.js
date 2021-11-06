import React, { useState, useContext, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import _ from 'lodash';
// material
import {
  Container,
  Button,
  DialogTitle,
  DialogContent,
  Box,
  Grid,
  TextField,
  Autocomplete,
  CircularProgress,
  DialogActions
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// apis
import { warehousesAdder } from '../_apis_/storage';
import { systemLogsAdder } from '../_apis_/systemRequests';
// context
import { UsersContext, StorageContext, SystemRequestsContext } from '../contexts';
// utils
import { warehousesTableColumns, warehousesTableData } from '../utils/mock-data/warehouses';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import MUIDataTable from '../components/mui-datatable/MUIDataTable';
import { DialogAnimate } from '../components/animate';
import { MIconButton } from '../components/@material-extend';

function Warehouses() {
  const setSystemLogs = useContext(SystemRequestsContext).systemLogsState[1];
  const [addWarehouse, triggerAddWarehouse] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const users = useContext(UsersContext).usersState[0];
  const [storeKeepers, setStoreKeepers] = useState([]);
  const [warehouses, setWarehouses] = useContext(StorageContext).warehousesState;
  const [warehousesRowsData, setWarehousesRowsData] = useState([]);

  const formik = useFormik({
    initialValues: {
      warehouseName: '',
      assignTo: null
    },
    validationSchema: Yup.object().shape({
      warehouseName: Yup.string().required('هذه الخانة مطلوبة'),
      assignTo: Yup.object().required('هذه الخانة مطلوبة')
    }),
    onSubmit: (values, { resetForm }) => {
      const data = new FormData();
      data.append('assignTo', values.assignTo.id);
      data.append('warehouseName', values.warehouseName);
      warehousesAdder(data)
        .then((warehousesResponse) => {
          setWarehouses(warehousesResponse);
          enqueueSnackbar('تم اضافة مخزن بنجاح', {
            variant: 'success',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          });
        })
        .catch((error) => {
          enqueueSnackbar(`حدث خطأ ما - ${error}`, {
            variant: 'error',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          });
        });
      resetForm();

      const systemLogsRequestData = new FormData();
      systemLogsRequestData.append('action', 'تم اضافة مستودع');
      systemLogsAdder(systemLogsRequestData)
        .then((systemLogsResponse) => setSystemLogs(systemLogsResponse))
        .catch((error) => console.log(error));
    }
  });
  const { dirty, errors, values, touched, isSubmitting, handleSubmit, setFieldValue, getFieldProps } = formik;

  useEffect(() => {
    const filteredUsers = _.filter(users, (user) => user.role === 'store-keeper');
    setStoreKeepers(
      filteredUsers.map((storeKeeper) => ({
        label: `${storeKeeper.first_name} ${storeKeeper.last_name}`,
        id: storeKeeper.id
      }))
    );
    setWarehousesRowsData(warehousesTableData(warehouses));
  }, [users, warehouses]);

  return (
    <Page title="المستودعات">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading="المستودعات"
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'المستودعات', href: PATH_DASHBOARD.storage.warehouses }
          ]}
          action={
            <Button
              onClick={() => triggerAddWarehouse(true)}
              variant="contained"
              startIcon={<Icon icon="ant-design:plus-outlined" />}
            >
              اضافة مستودع
            </Button>
          }
        />
        <MUIDataTable columns={warehousesTableColumns} data={warehousesRowsData} />

        <DialogAnimate open={addWarehouse} onClose={() => triggerAddWarehouse(false)}>
          <DialogTitle>اضافة مستودع</DialogTitle>
          <DialogContent>
            <Box component="form" marginTop="30px" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    label="اسم المستودع"
                    value={values.warehouseName}
                    onChange={(event) => setFieldValue('warehouseName', event.target.value)}
                    {...getFieldProps('warehouseName')}
                    error={Boolean(touched.warehouseName && errors.warehouseName)}
                    helperText={touched.warehouseName && errors.warehouseName}
                    focused
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Autocomplete
                    options={storeKeepers}
                    value={values.assignTo}
                    onChange={(event, value) => {
                      setFieldValue('assignTo', value && value);
                    }}
                    loading={storeKeepers.length === 0}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="تعين إلي"
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {storeKeepers.length === 0 && <CircularProgress color="inherit" size={20} />}
                              {params.InputProps.endAdornment}
                            </>
                          )
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <LoadingButton
              loading={isSubmitting}
              disabled={!dirty}
              onClick={() => {
                handleSubmit();
              }}
              type="submit"
              variant="contained"
              color="primary"
            >
              حفظ
            </LoadingButton>
            <Button onClick={() => triggerAddWarehouse(false)} variant="outlined" color="secondary">
              الغاء
            </Button>
          </DialogActions>
        </DialogAnimate>
      </Container>
    </Page>
  );
}

export default Warehouses;
