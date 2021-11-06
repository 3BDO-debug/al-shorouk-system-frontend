import React, { useEffect, useState, useContext } from 'react';
// material
import { Container, Card } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// utils
import { maintenanceRequestsTableColumns, maintenanceRequestsTableData } from '../utils/mock-data/maintenanceRequests';
// contexts
import { MaintenanceRequestsContext } from '../contexts';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import MUIDataTable from '../components/mui-datatable/MUIDataTable';

function MaintenanceRequests() {
  const maintenanceRequests = useContext(MaintenanceRequestsContext).maintenanceRequestsState[0];
  const [maintenanceRequestsRows, setMaintenanceRequestsRows] = useState([]);

  useEffect(() => {
    setMaintenanceRequestsRows(maintenanceRequestsTableData(maintenanceRequests));
  }, [maintenanceRequests]);

  return (
    <Page title="طلبات الصيانة">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading="طلبات الصيانة"
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'طلبات الصيانة', href: PATH_DASHBOARD.general.maintenanceRequests },
            { name: 'عرض طلبات الصيانة' }
          ]}
        />
        <Card>
          <MUIDataTable columns={maintenanceRequestsTableColumns} data={maintenanceRequestsRows} />
        </Card>
      </Container>
    </Page>
  );
}

export default MaintenanceRequests;
