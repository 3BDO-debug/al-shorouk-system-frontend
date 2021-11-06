import React, { useContext } from 'react';
// material
import { Container, Grid } from '@mui/material';
// contexts
import { UsersContext } from '../contexts';
// components
import Page from '../components/Page';
import AppWelcome from '../components/_overview/AppWelcome';
import InfoCard from '../components/_overview/InfoCard';

function Overview() {
  const user = useContext(UsersContext).userState[0];
  return (
    <Page title="Overview">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <AppWelcome displayName={`${user.first_name} ${user.last_name}`} />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <InfoCard type="primary" />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <InfoCard type="info" />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <InfoCard type="danger" />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default Overview;
