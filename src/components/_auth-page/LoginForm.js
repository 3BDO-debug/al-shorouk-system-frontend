import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { useNavigate } from 'react-router';
// material
import { Box, Grid, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// apis
import { loginRequest, userInfoRequest } from '../../_apis_/auth';
// components
import { MotionInView, varSlideInLeft } from '../animate';
import { MIconButton } from '../@material-extend';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const loginSchema = Yup.object().shape({
    username: Yup.string().required('هذه الخانة مطلوبة'),
    password: Yup.string().required('هذه الخانة مطلوبة')
  });
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      await loginRequest(values)
        .then(() => {
          enqueueSnackbar('تم تسجيل الدخول بنجاح', {
            variant: 'success',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          });
        })
        .catch((error) =>
          enqueueSnackbar(
            error.response.status === 401 ? 'كلمة المرور او اسم المستخدم غير صحيح' : 'Something wrong happened',
            {
              variant: 'error',
              action: (key) => (
                <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                  <Icon icon={closeFill} />
                </MIconButton>
              )
            }
          )
        );
      userInfoRequest()
        .then((userInfoResponse) => {
          navigate(`/dashboard/list-staff/profile/${userInfoResponse.id}`);
        })
        .catch((error) => console.log(error));
    }
  });

  const { errors, dirty, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <MotionInView variants={varSlideInLeft}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              label="اسم المستخدم"
              value={values.username}
              onChange={(event) => setFieldValue('username', event.target.value)}
              {...getFieldProps('username')}
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              label="كلمة السر"
              value={values.password}
              onChange={(event) => setFieldValue('password', event.target.value)}
              type={showPassword ? 'text' : 'password'}
              {...getFieldProps('password')}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <LoadingButton
              disabled={!dirty}
              loading={isSubmitting}
              onClick={handleSubmit}
              variant="contained"
              sx={{ float: 'right' }}
              type="submit"
            >
              تسجيل الدخول
            </LoadingButton>
          </Grid>
        </Grid>
      </MotionInView>
    </Box>
  );
}

export default LoginForm;
