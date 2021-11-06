import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Stack, Avatar, Typography, Button } from '@mui/material';

export const warehousesTableColumns = [
  { name: 'id', label: 'الرقم التعريفي' },
  { name: 'name', label: 'اسم المستودع' },
  {
    name: 'assignedTo',
    label: 'معين إلي',
    options: {
      customBodyRender: (value) => (
        <Stack direction="row" alignItems="center">
          <Avatar src="" alt={value} />
          <Typography sx={{ marginLeft: '10px' }} variant="overline">
            {value}
          </Typography>
        </Stack>
      )
    }
  },
  { name: 'createdAt', label: 'انشيء في' },
  {
    name: 'action',
    label: 'اجراء',
    options: {
      customBodyRender: (value) => (
        <Button
          component={Link}
          to={`/dashboard/warehouses/warehouse-details/${value}`}
          startIcon={<Icon icon="carbon:view-filled" />}
        />
      )
    }
  }
];

export const warehousesTableData = (warehouses) => {
  const warehousesData = warehouses.map((warehouse) => ({
    id: warehouse.id,
    name: warehouse.warehouse_name,
    assignedTo: warehouse.assigned_to_name,
    createdAt: new Date(warehouse.created_at).toLocaleString(),
    action: warehouse.id
  }));
  return warehousesData;
};
