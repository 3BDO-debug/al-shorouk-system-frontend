// material
import { Avatar } from '@mui/material';
import { mainUrl } from '../../_apis_/axios';

export const clientDevicesTableColumns = [
  { name: 'id', label: 'الرقم التعريفي' },
  { name: 'model', label: 'الموديل' },
  { name: 'serial', label: 'السريل' },
  {
    name: 'img',
    label: 'صورة',
    options: {
      customBodyRender: (value) => (
        <Avatar sx={{ width: '200px', height: '200px' }} variant="rounded" src={value} alt={value} />
      )
    }
  }
];

export const clientDevicesTableData = (clientDevices) => {
  const clientDevicesData = clientDevices.map((clientDevice) => ({
    id: clientDevice.id,
    model: clientDevice.model,
    serial: clientDevice.serial_number,
    img: `${mainUrl}/${clientDevice.img}`
  }));
  return clientDevicesData;
};
