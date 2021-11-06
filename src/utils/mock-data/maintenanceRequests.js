import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
// material
import { Avatar, Stack, Typography, Button } from '@mui/material';

export const maintenanceRequestsTableColumns = [
  { name: 'id', label: 'الرقم التعريفي' },
  { name: 'clientName', label: 'اسم العميل' },
  {
    name: 'createdBy',
    label: 'انشئ بواسطة',
    options: {
      customBodyRender: (value) => (
        <Stack direction="row" alignItems="center">
          <Avatar sx={{ marginRight: '10px' }} src={value} alt={value} />
          <Typography>{value}</Typography>
        </Stack>
      )
    }
  },
  { name: 'createdAt', label: 'انشئ في' },
  {
    name: 'action',
    label: 'اجراء',
    options: {
      customBodyRender: (value) => (
        <Button
          component={Link}
          to={`/dashboard/maintenance-requests/maintenance-request-details/${value}`}
          startIcon={<Icon icon="carbon:view-filled" />}
        />
      )
    }
  }
];

export const maintenanceRequestsTableData = (maintenanceRequests) => {
  const maintenanceRequestsData = maintenanceRequests.map((maintenanceRequest) => ({
    id: maintenanceRequest.id,
    clientName: maintenanceRequest.client_name,
    createdBy: maintenanceRequest.created_by_full_name,
    createdAt: new Date(maintenanceRequest.created_at).toLocaleString(),
    action: maintenanceRequest.id
  }));

  return maintenanceRequestsData;
};
