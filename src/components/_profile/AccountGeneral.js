import React from 'react';
import PropTypes from 'prop-types';
// material
import { Grid, Card, TextField } from '@mui/material';
// apis
import { mainUrl } from '../../_apis_/axios';
// components
import { UploadAvatar } from '../upload';

AccountGeneral.propTypes = {
  user: PropTypes.object
};

function AccountGeneral({ user }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
          <UploadAvatar file={{ preview: `${mainUrl}/${user?.profile_pic_name}` }} />
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <Card sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField label="الاسم الاول" value={user?.first_name} fullWidth />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField label="اسم العائلة" value={user?.last_name} fullWidth />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField label="البريد" value={user?.email} fullWidth />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField label="اسم المستخدم" value={user?.username} fullWidth />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField label="رقم الهاتف" value={user?.phone_number} fullWidth />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField label="العنوان" value={user?.address} fullWidth />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField label="الوظيفة" value={user?.role} fullWidth />
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AccountGeneral;
