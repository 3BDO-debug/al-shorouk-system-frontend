import React, { useState, useEffect, useContext } from 'react';
// material
import { Container, Card, CardHeader } from '@mui/material';
// contexts
import { SystemRequestsContext } from '../contexts';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// utils
import { systemLogsTableColumns, systemLogsTableData } from '../utils/mock-data/systemLogs';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import MUIDataTable from '../components/mui-datatable/MUIDataTable';

function SystemLogs() {
  const systemLogs = useContext(SystemRequestsContext).systemLogsState[0];
  const [systemLogsTableRows, setSystemLogsTableRows] = useState([]);

  useEffect(() => {
    setSystemLogsTableRows(systemLogsTableData(systemLogs));
  }, [systemLogs]);

  return (
    <Page title="التسجيلات">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading="التسجيلات"
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'التسجيلات', href: PATH_DASHBOARD.main.systemLogs }
          ]}
        />
        <Card>
          <CardHeader title="التسجيلات" />
          <MUIDataTable
            columns={systemLogsTableColumns}
            data={systemLogsTableRows}
            options={{ elevation: 0, selectableRows: false }}
          />
        </Card>
      </Container>
    </Page>
  );
}

export default SystemLogs;
