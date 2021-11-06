import React, { useState, useEffect, useContext } from 'react';
// material
import { Container } from '@mui/material';
// contexts
import { UsersContext } from '../contexts';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// utils
import { staffTableColumns, staffTableData } from '../utils/mock-data/staff';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import MUIDataTable from '../components/mui-datatable/MUIDataTable';

function Staff() {
  const users = useContext(UsersContext).usersState[0];
  const [staffRows, setStaffRows] = useState([]);

  useEffect(() => {
    setStaffRows(staffTableData(users));
  }, [users]);

  return (
    <Page title="الموظفين">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading="الموظفين"
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'الموظفين', href: PATH_DASHBOARD.management.staff }
          ]}
        />
        <MUIDataTable
          columns={staffTableColumns}
          data={staffRows}
          options={{
            selectableRows: false
          }}
        />
      </Container>
    </Page>
  );
}

export default Staff;
