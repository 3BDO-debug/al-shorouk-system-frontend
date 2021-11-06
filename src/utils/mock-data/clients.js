import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
// material
import { Button } from '@mui/material';

export const clientsTableColumns = [
  { name: 'id', label: 'الرقم التعريفي' },
  { name: 'clientName', label: 'اسم العميل' },
  { name: 'phoneNumber1', label: 'رقم الهاتف 1' },
  { name: 'phoneNumber2', label: 'رقم الهاتف 2' },
  { name: 'fax', label: 'فاكس' },
  { name: 'address', label: 'العنوان' },
  {
    name: 'action',
    label: 'اجراء',
    options: {
      customBodyRender: (value) => (
        <Button
          component={Link}
          startIcon={<Icon icon="carbon:view-filled" />}
          to={`/dashboard/clients/client-profile/${value}`}
        />
      )
    }
  }
];

export const clientsTableData = (clients) => {
  const clientsData = clients.map((client) => ({
    id: client.id,
    clientName: client.client_name,
    phoneNumber1: client.phone_number_1,
    phoneNumber2: client.phone_number_2,
    fax: client.fax,
    address: client.address,
    action: client.id
  }));
  return clientsData;
};
