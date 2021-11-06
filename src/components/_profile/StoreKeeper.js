import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// material
import { Card } from '@mui/material';
// contexts
import { StorageContext } from '../../contexts';
// utils
import { warehousesTableColumns, warehousesTableData } from '../../utils/mock-data/warehouses';
// components
import MUIDataTable from '../mui-datatable/MUIDataTable';

StoreKeeper.propTypes = {
  user: PropTypes.object
};

function StoreKeeper({ user }) {
  const warehouses = useContext(StorageContext).warehousesState[0];
  const [warehousesData, setWarehousesData] = useState([]);

  useEffect(() => {
    const userWarehouses = _.filter(warehouses, (o) => o.assigned_to === user?.id);
    setWarehousesData(warehousesTableData(userWarehouses));
  }, [user, warehouses]);

  return (
    <Card>
      <MUIDataTable
        columns={warehousesTableColumns}
        data={warehousesData}
        options={{ elevation: 0, selectableRows: false }}
      />
    </Card>
  );
}

export default StoreKeeper;
