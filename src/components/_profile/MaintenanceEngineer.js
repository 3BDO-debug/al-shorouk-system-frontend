import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
// material
import { Card } from '@mui/material';
// apis
import { userMaintenanceRequestsFinder } from '../../_apis_/maintenanceRequests';
// utils
import {
  maintenanceRequestsTableColumns,
  maintenanceRequestsTableData
} from '../../utils/mock-data/maintenanceRequests';
// contexts
import { MaintenanceRequestsContext } from '../../contexts';
// components
import MUIDataTable from '../mui-datatable/MUIDataTable';

MaintenanceEngineer.propTypes = {
  user: PropTypes.object
};

function MaintenanceEngineer({ user }) {
  const maintenanceRequests = useContext(MaintenanceRequestsContext).maintenanceRequestsState[0];
  const [maintenanceRequestsData, setMaintenanceRequestsData] = useState([]);

  useEffect(() => {
    if (user?.role === 'maintenance-manager') {
      setMaintenanceRequestsData(maintenanceRequestsTableData(maintenanceRequests));
    } else {
      userMaintenanceRequestsFinder(user?.id)
        .then((maintenanceRequestsResponse) =>
          setMaintenanceRequestsData(maintenanceRequestsTableData(maintenanceRequestsResponse))
        )
        .catch((error) => console.log(error));
    }
  }, [user, maintenanceRequests]);

  return (
    <Card>
      <MUIDataTable
        columns={maintenanceRequestsTableColumns}
        data={maintenanceRequestsData}
        options={{ elevation: 0, selectableRows: false }}
      />
    </Card>
  );
}

export default MaintenanceEngineer;
