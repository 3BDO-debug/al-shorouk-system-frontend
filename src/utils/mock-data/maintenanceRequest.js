import { Icon } from '@iconify/react';
// material
import { Button, Stack, Avatar, Typography } from '@mui/material';
// apis
import { mainUrl } from '../../_apis_/axios';
// components
import Label from '../../components/Label';

export const devicesTableColumns = (args) => {
  const [triggerDeviceNotes, setTriggeredDevice, triggerDeviceActions, triggerRequestsNotifications] = args;
  const columns = [
    { name: 'id', label: 'الرقم التعريفي' },
    { name: 'deviceModel', label: 'الموديل' },
    { name: 'deviceSerial', label: 'رقم السريل' },
    {
      name: 'engineer',
      label: 'المهندس',
      options: {
        customBodyRender: (value) =>
          value ? (
            <Stack direction="row" alignItems="center">
              <Avatar src={`${mainUrl}/${value.profile_pic}`} />
              <Typography sx={{ marginLeft: '10px' }} variant="caption">
                {value.name}
              </Typography>
            </Stack>
          ) : (
            <Label variant="ghost" color="error">
              لم يتم تعيين مهندس بعد
            </Label>
          )
      }
    },
    {
      name: 'supervisorNotes',
      label: 'ملاحظات',
      options: {
        customBodyRender: (value) => (
          <Button
            variant="contained"
            onClick={() => {
              setTriggeredDevice(value);
              triggerDeviceNotes(true);
            }}
            startIcon={<Icon icon="clarity:note-line" />}
          >
            ملاحظات
          </Button>
        )
      }
    },
    {
      name: 'deviceStatus',
      label: 'حالة الجهاز',
      options: {
        customBodyRender: (value) => (
          <Label color="info" variant="ghost">
            {value}
          </Label>
        )
      }
    },
    {
      name: 'actions',
      label: 'اجرائات',
      options: {
        customBodyRender: (value) => (
          <>
            <Button
              onClick={() => {
                setTriggeredDevice(value);
                triggerDeviceActions(true);
              }}
              variant="contained"
              startIcon={<Icon icon="pepicons:electricity" />}
            >
              اجرائات علي الجهاز
            </Button>
            <Button
              color="warning"
              onClick={() => {
                setTriggeredDevice(value);
                triggerRequestsNotifications(true);
              }}
              startIcon={<Icon icon="clarity:notification-solid" />}
            />
          </>
        )
      }
    }
  ];
  return columns;
};

export const devicesTableData = (devices) => {
  const devicesData = devices.map((device) => ({
    id: device.id,
    deviceModel: device.model,
    deviceSerial: device.serial_number,
    engineer: device.assigned_engineer,
    supervisorNotes: device.id,
    deviceStatus: device.status,
    actions: device.id
  }));
  return devicesData;
};
