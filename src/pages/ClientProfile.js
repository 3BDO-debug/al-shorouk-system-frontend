import React, { useEffect, useState, useContext } from 'react';
import _ from 'lodash';
import { useParams } from 'react-router';
import { Icon } from '@iconify/react';
// material
import { Container, Box, Tabs, Tab, Stack, Button } from '@mui/material';
// context
import { ClientsContext } from '../contexts';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// apis
import { clientDevicesFetcher } from '../_apis_/clientProfile';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import ClientInfo from '../components/_client-profile/ClientInfo';
import ClientDevices from '../components/_client-profile/ClientDevices';
import AddDevice from '../components/_client-profile/AddDevice';
import MaintenanceRequests from '../components/_client-profile/MaintenanceRequests';

function ClientProfile() {
  const [currentTab, setCurrentTab] = useState('info');
  const { clientId } = useParams();
  const clients = useContext(ClientsContext).clientsState[0];
  const [client, setClient] = useState([]);
  const [clientDevices, setClientDevices] = useState([]);
  const [addDevice, triggerAddDevice] = useState(false);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    const clientData = _.find(clients, (o) => o.id === parseInt(clientId, 10));
    setClient(clientData);
  }, [clientId, clients]);

  useEffect(() => {
    clientDevicesFetcher(parseInt(clientId, 10))
      .then((clientDevicesResponse) => setClientDevices(clientDevicesResponse))
      .catch((error) => console.log(`client-profile-${error}`));
  }, [client, clientId]);

  const TABS = [
    {
      label: 'بيانات العميل',
      value: 'info',
      icon: <Icon icon="akar-icons:info" width={20} height={20} />,
      component: <ClientInfo client={client} />
    },
    {
      label: 'اجهزة العميل',
      value: 'devices',
      icon: <Icon icon="carbon:block-storage-alt" />,
      component: <ClientDevices clientId={parseInt(clientId, 10)} clientDevices={clientDevices} />
    },
    {
      label: 'طلبات الصيانة',
      value: 'maintenance',
      icon: <Icon icon="akar-icons:ticket" />,
      component: <MaintenanceRequests />
    }
  ];

  return (
    <Page title="ملف العميل">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading={client?.client_name}
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'العملاء', href: PATH_DASHBOARD.general.clients.listClients },
            { name: client?.client_name }
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Icon icon="ant-design:plus-outlined" />}
              onClick={() => triggerAddDevice(true)}
            >
              اضافة جهاز
            </Button>
          }
        />
        <Stack spacing={5}>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={handleChangeTab}
          >
            {TABS.map((tab) => (
              <Tab disableRipple key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
            ))}
          </Tabs>
          {TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Stack>
        <AddDevice
          isTriggered={addDevice}
          triggerHandler={() => triggerAddDevice(false)}
          clientId={parseInt(clientId, 10)}
          setClientDevices={setClientDevices}
        />
      </Container>
    </Page>
  );
}

export default ClientProfile;
