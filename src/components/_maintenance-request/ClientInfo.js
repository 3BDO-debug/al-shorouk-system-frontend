import React from 'react';
import PropTypes from 'prop-types';
// material
import { Card, CardHeader, CardContent, Box, Grid, TextField } from '@mui/material';

ClientInfo.propTypes = {
  client: PropTypes.object
};

function ClientInfo({ client }) {
  return (
    <Card>
      <CardHeader title="بيانات العميل" />
      <CardContent>
        <Box paddingBottom="20px">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField label="اسم العميل" value={client?.client_name} fullWidth />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField fullWidth value={client?.address} label="العنوان" />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField fullWidth value={client?.fax} label="فاكس" />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField fullWidth value={client?.phone_number_1} label="رقم الهاتف 1" />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField fullWidth value={client?.phone_number_2} label="رقم الهاتف 2" />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ClientInfo;
