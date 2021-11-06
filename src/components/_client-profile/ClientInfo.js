import React from 'react';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
// material
import { Card, CardContent, Box, Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

ClientInfo.propTypes = {
  client: PropTypes.object
};

function ClientInfo({ client }) {
  return (
    <Card>
      <CardContent>
        {client && (
          <Box component="form">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField label="اسم العميل" value={client.client_name} fullWidth />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField fullWidth value={client.address} label="العنوان" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField fullWidth value={client.fax} label="فاكس" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField fullWidth value={client.phone_number_1} label="رقم الهاتف 1" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField fullWidth value={client.phone_number_2} label="رقم الهاتف 2" />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <LoadingButton variant="contained" startIcon={<Icon icon="akar-icons:edit" />}>
                  تعديل
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default ClientInfo;
