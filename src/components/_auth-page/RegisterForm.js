import React, { useCallback, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { useNavigate } from 'react-router';
// material
import {
  Box,
  Card,
  TextField,
  Grid,
  MenuItem,
  FormHelperText,
  IconButton,
  InputAdornment,
  Typography,
  ListSubheader
} from '@mui/material';
// apis
import { registerRequest } from '../../_apis_/auth';
// utils
import { fData } from '../../utils/formatNumber';
// components
import RegisterStepper from './RegisterStepper';
import { UploadAvatar } from '../upload';
import { MotionInView, varSlideInLeft, varSlideInRight, varSlideInUp, varZoomIn } from '../animate';
import { MIconButton } from '../@material-extend';

function RegisterForm() {
  const [filePreview, setFilePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const registerSchema = Yup.object().shape({
    role: Yup.string().required('هذه الخانة مطلوبة'),
    firstName: Yup.string().required('هذه الخانة مطلوبة'),
    lastName: Yup.string().required('هذه الخانة مطلوبة'),
    username: Yup.string().required('هذه الخانة مطلوبة'),
    email: Yup.string().email('Invalid email').required('هذه الخانة مطلوبة'),
    govId: Yup.number().required('هذه الخانة مطلوبة'),
    phoneNumber: Yup.string().required('هذه الخانة مطلوبة'),
    address: Yup.string().required('هذه الخانة مطلوبة'),
    profilePic: Yup.mixed().required('هذه الخانة مطلوبة')
  });

  const formik = useFormik({
    initialValues: {
      role: '',
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      govId: '',
      phoneNumber: '',
      address: '',
      password: '',
      profilePic: null
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const data = new FormData();
      data.append('values', JSON.stringify(values));
      data.append('files', values.profilePic);
      await registerRequest(data)
        .then(() => {
          navigate('/auth/login');
          enqueueSnackbar('تم انشاء الحساب بنجاح', {
            variant: 'success',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          });
        })
        .catch((error) =>
          enqueueSnackbar(`حدث شيئا خطا - ${error}`, {
            variant: 'error',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          })
        );
    }
  });

  const { errors, dirty, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('profilePic', file);
        setFilePreview({
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  const steps = [
    {
      id: 0,
      label: 'نوع الوظيفة',
      content: (
        <Box padding="30px">
          <MotionInView variants={varSlideInLeft}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  fullWidth
                  select
                  label="اختر وظيفتك"
                  {...getFieldProps('role')}
                  error={Boolean(touched.role && errors.role)}
                  helperText={touched.role && errors.role}
                  value={values.role}
                  onChange={(event) => setFieldValue('role', event.target.value)}
                >
                  <ListSubheader>قسم الصيانة</ListSubheader>
                  <MenuItem value="maintenance-manager">مدير الصيانة</MenuItem>
                  <MenuItem value="maintenance-engineer">مهندس الصيانة</MenuItem>
                  <MenuItem>المنسق</MenuItem>
                  <ListSubheader>المخازن</ListSubheader>
                  <MenuItem value="store-keeper">مسئول المخزن</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </MotionInView>
        </Box>
      )
    },
    {
      id: 1,
      label: 'بيانات الحساب',
      content: (
        <Box padding="30px">
          <MotionInView variants={varSlideInUp}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="الاسم الاول"
                  fullWidth
                  {...getFieldProps('firstName')}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  value={values.firstName}
                  onChange={(event) => setFieldValue('firstName', event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="اسم العائلة"
                  fullWidth
                  {...getFieldProps('lastName')}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  value={values.lastName}
                  onChange={(event) => setFieldValue('lastName', event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="اسم المستخدم"
                  fullWidth
                  {...getFieldProps('username')}
                  error={Boolean(touched.username && errors.username)}
                  helperText={touched.username && errors.username}
                  value={values.username}
                  onChange={(event) => setFieldValue('username', event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="الايميل"
                  fullWidth
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  value={values.email}
                  onChange={(event) => setFieldValue('email', event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  label="رقم البطاقة"
                  fullWidth
                  {...getFieldProps('govId')}
                  error={Boolean(touched.govId && errors.govId)}
                  helperText={touched.govId && errors.govId}
                  value={values.govId}
                  onChange={(event) => setFieldValue('govId', event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="رقم الهاتف"
                  fullWidth
                  {...getFieldProps('phoneNumber')}
                  error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  value={values.phoneNumber}
                  onChange={(event) => setFieldValue('phoneNumber', event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="العنوان"
                  fullWidth
                  {...getFieldProps('address')}
                  error={Boolean(touched.address && errors.address)}
                  helperText={touched.address && errors.address}
                  value={values.address}
                  onChange={(event) => setFieldValue('address', event.target.value)}
                />
              </Grid>
            </Grid>
          </MotionInView>
        </Box>
      )
    },
    {
      id: 2,
      label: 'كلمة السر',
      content: (
        <Box padding="30px">
          <MotionInView variants={varSlideInRight}>
            <TextField
              fullWidth
              value={values.password}
              onChange={(event) => setFieldValue('password', event.target.value)}
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="كلمة السر"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </MotionInView>
        </Box>
      )
    },
    {
      id: 3,
      label: 'الصورة الشخصية',
      content: (
        <Box padding="30px">
          <MotionInView variants={varZoomIn}>
            <UploadAvatar
              accept="image/*"
              file={filePreview}
              onDrop={handleDrop}
              error={Boolean(touched.profilePic && errors.profilePic)}
              caption={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary'
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
            <FormHelperText error sx={{ px: 2 }} {...getFieldProps('profilePic')}>
              {touched.profilePic && errors.profilePic}
            </FormHelperText>
          </MotionInView>
        </Box>
      )
    }
  ];

  return (
    <Card sx={{ p: 3 }}>
      <RegisterStepper steps={steps} submitHandler={handleSubmit} dirty={dirty} isSubmitting={isSubmitting} />
    </Card>
  );
}

export default RegisterForm;
