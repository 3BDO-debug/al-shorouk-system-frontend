import React, { useContext, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
// material
import {
  Box,
  DialogTitle,
  DialogContent,
  Grid,
  Autocomplete,
  TextField,
  CircularProgress,
  DialogActions,
  Button
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// apis
import { itemsAdder } from '../../_apis_/storage';
import { systemLogsAdder } from '../../_apis_/systemRequests';
// contexts
import { ConfigurationsContext, SystemRequestsContext } from '../../contexts';
// components
import { DialogAnimate } from '../animate';
import { UploadSingleFile } from '../upload';
import { MIconButton } from '../@material-extend';

AddItem.propTypes = {
  isTriggered: PropTypes.bool,
  triggerHandler: PropTypes.func,
  warehouseId: PropTypes.number,
  itemsState: PropTypes.array
};

function AddItem({ isTriggered, triggerHandler, warehouseId, itemsState }) {
  const itemsCategories = useContext(ConfigurationsContext).itemsCategoriesState[0];
  const [itemsCategoriesData, setItemsCategoriesData] = useState([]);
  const setItems = itemsState[1];
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const setSystemLogs = useContext(SystemRequestsContext).systemLogsState[1];

  const formik = useFormik({
    initialValues: {
      category: null,
      itemName: '',
      qty: 0,
      ppu: 0.0,
      itemImg: null
    },
    validationSchema: Yup.object().shape({
      category: Yup.object().nullable().required('هذه الخانة مطلوبة'),
      itemName: Yup.string().required('هذه الخانة مطلوبة'),
      qty: Yup.number().min(0, 'cannot have negative value').required('هذه الخانة مطلوبة'),
      ppu: Yup.number().min(0, 'cannot have negative value').required('هذه الخانة مطلوبة')
    }),
    onSubmit: (values, { resetForm }) => {
      const data = new FormData();
      data.append('values', JSON.stringify(values));
      data.append('files', values.itemImg.uploadedFile);
      itemsAdder(warehouseId, data)
        .then((itemsResponse) => {
          setItems(itemsResponse);
          enqueueSnackbar('تم اضافة عنصر بنجاح', {
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
      systemLogsRequestData.append('action', 'تم اضافة عنصر الي المستودع');
      systemLogsAdder(systemLogsRequestData)
        .then((systemLogsResponse) => setSystemLogs(systemLogsResponse))
        .catch((error) => console.log(error));
    }
  });

  const { errors, dirty, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('itemImg', {
          ...file,
          uploadedFile: file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  useEffect(() => {
    setItemsCategoriesData(
      itemsCategories.map((itemCategory) => ({ label: itemCategory.category_name, id: itemCategory.id }))
    );
  }, [itemsCategories]);

  return (
    <DialogAnimate open={isTriggered} onClose={triggerHandler}>
      <DialogTitle>اضافة عنصر</DialogTitle>
      <DialogContent>
        <Box component="form" paddingTop="30px" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Autocomplete
                value={values.category}
                onChange={(event, value) => setFieldValue('category', value && value)}
                options={itemsCategoriesData}
                loading={itemsCategoriesData.length === 0}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    focused
                    {...params}
                    {...getFieldProps('category')}
                    error={Boolean(touched.category && errors.category)}
                    helperText={touched.category && errors.category}
                    label="التصنيف"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {itemsCategoriesData.length === 0 && <CircularProgress color="inherit" size={20} />}
                          {params.InputProps.endAdornment}
                        </>
                      )
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                label="اسم الصنف"
                value={values.itemName}
                onChange={(event) => setFieldValue('itemName', event.target.value)}
                {...getFieldProps('itemName')}
                error={Boolean(touched.itemName && errors.itemName)}
                helperText={touched.itemName && errors.itemName}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                value={values.qty}
                onChange={(event) => setFieldValue('qty', event.target.value)}
                type="number"
                label="الكمية"
                {...getFieldProps('qty')}
                error={Boolean(touched.qty && errors.qty)}
                helperText={touched.qty && errors.qty}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                value={values.ppu}
                onChange={(event) => setFieldValue('ppu', event.target.value)}
                type="number"
                label="السعر"
                {...getFieldProps('ppu')}
                error={Boolean(touched.qty && errors.qty)}
                helperText={touched.qty && errors.qty}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <UploadSingleFile maxSize={3145728} accept="image/*" file={values.itemImg} onDrop={handleDrop} />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <LoadingButton disabled={!dirty} loading={isSubmitting} onClick={handleSubmit} variant="contained">
          حفظ
        </LoadingButton>
        <Button onClick={() => triggerHandler()}>الغاء</Button>
      </DialogActions>
    </DialogAnimate>
  );
}

export default AddItem;
