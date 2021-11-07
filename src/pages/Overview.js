import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
// material
import { Container, Grid, Card, CardHeader, CardContent } from '@mui/material';
// contexts
import { UsersContext, MaintenanceRequestsContext } from '../contexts';
// utils
import { maintenanceRequestsTableColumns, maintenanceRequestsTableData } from '../utils/mock-data/maintenanceRequests';
// components
import Page from '../components/Page';
import AppWelcome from '../components/_overview/AppWelcome';
import InfoCard from '../components/_overview/InfoCard';
import MUIDataTable from '../components/mui-datatable/MUIDataTable';

function Overview() {
  const user = useContext(UsersContext).userState[0];
  const maintenanceRequests = useContext(MaintenanceRequestsContext).maintenanceRequestsState[0];
  const [maintenanceRequestsTableRows, setMaintenanceRequestsTableRows] = useState([]);
  const [closedMaintenanceRequests, setClosedMaintenanceRequests] = useState([]);

  useEffect(() => {
    const closedMaintenanceRequestsData = _.filter(maintenanceRequests, (o) => o.is_closed === true);
    setClosedMaintenanceRequests(closedMaintenanceRequestsData);
    setMaintenanceRequestsTableRows(maintenanceRequestsTableData(maintenanceRequests));
  }, [maintenanceRequests]);

  return (
    <Page title="Overview">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <AppWelcome displayName={`${user.first_name} ${user.last_name}`} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <InfoCard title="طلبات الصيانة المغلقة" total={closedMaintenanceRequests.length} type="primary" />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <InfoCard title="طلبات الصيانة المفتوحة" total={maintenanceRequests.length} type="info" />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Card>
              <CardHeader title="طلبات الصيانة" />
              <CardContent>
                <MUIDataTable
                  columns={maintenanceRequestsTableColumns}
                  data={maintenanceRequestsTableRows}
                  options={{ elevation: 0, selectableRows: false }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default Overview;
