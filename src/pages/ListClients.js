import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Icon } from '@iconify/react';
// material
import { Container, Button } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// utils
import { clientsTableColumns, clientsTableData } from '../utils/mock-data/clients';
// context
import { ClientsContext } from '../contexts';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import MUIDataTable from '../components/mui-datatable/MUIDataTable';

function ListClients() {
  const navigate = useNavigate();
  const clients = useContext(ClientsContext).clientsState[0];
  const [clientsRowsData, setClientsDataRows] = useState([]);

  useEffect(() => {
    setClientsDataRows(clientsTableData(clients));
  }, [clients]);

  console.log('dsa', clients);

  return (
    <Page title="عرض العملاء">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading="العملاء"
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'العملاء', href: PATH_DASHBOARD.general.clients.listClients },
            { name: 'عرض العملاء' }
          ]}
          action={
            <Button
              onClick={() => navigate(PATH_DASHBOARD.general.clients.addClient)}
              variant="contained"
              startIcon={<Icon icon="ant-design:plus-outlined" />}
            >
              اضافة عميل
            </Button>
          }
        />
        <MUIDataTable columns={clientsTableColumns} data={clientsRowsData} />
      </Container>
    </Page>
  );
}

export default ListClients;
