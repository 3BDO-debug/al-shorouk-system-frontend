import React, { useState, useEffect, useContext } from 'react';
// material
import { Container, Card, CardHeader } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// contexts
import { SystemRequestsContext } from '../contexts';
// utils
import { suppliesTableColumns, suppliesTableData } from '../utils/mock-data/supplies';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import MUIDataTable from '../components/mui-datatable/MUIDataTable';

function Supplies() {
  const supplyRequests = useContext(SystemRequestsContext).supplyRequestsState[0];

  const [suppliesTableRows, setSuppliesTableRows] = useState([]);

  useEffect(() => {
    setSuppliesTableRows(suppliesTableData(supplyRequests));
  }, [supplyRequests]);

  return (
    <Page title="التوريدات">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading="التوريدات"
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'التوريدات', href: PATH_DASHBOARD.storage.supplies }
          ]}
        />
        <Card>
          <CardHeader title="بيانات التوريدات" />
          <MUIDataTable
            columns={suppliesTableColumns}
            data={suppliesTableRows}
            options={{ elevation: 0, selectableRows: false }}
          />
        </Card>
      </Container>
    </Page>
  );
}

export default Supplies;
