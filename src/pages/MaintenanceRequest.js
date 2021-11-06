import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import _ from 'lodash';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
// material
import { Container, Grid, Card, Box, CardHeader, CardContent, Stack, Typography, Button, List } from '@mui/material';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// contexts
import { ClientsContext, MaintenanceRequestsContext } from '../contexts';
// utils
import { devicesTableColumns, devicesTableData } from '../utils/mock-data/maintenanceRequest';
// apis
import { devicesFetcher } from '../_apis_/maintenanceRequest';
import { maintenanceRequestsUpdater } from '../_apis_/maintenanceRequests';
import { maintenaceRequestLogsFetcher, maintenaceRequestLogsAdder } from '../_apis_/systemRequests';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import MUIDataTable from '../components/mui-datatable/MUIDataTable';
import Scrollbar from '../components/Scrollbar';
import ClientInfo from '../components/_maintenance-request/ClientInfo';
import DeviceNotes from '../components/_maintenance-request/DeviceNotes';
import DeviceActions from '../components/_maintenance-request/DeviceActions';
import RequestsNotifications from '../components/_maintenance-request/RequestsNotifications';
import Label from '../components/Label';
import { MIconButton } from '../components/@material-extend';
import MaintenaceRequestLog from '../components/_maintenance-request/MaintenaceRequestLog';

function MaintenanceRequest() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { maintenanceRequestId } = useParams();
  const [maintenanceRequests, setMaintenanceRequests] = useContext(MaintenanceRequestsContext).maintenanceRequestsState;
  const clients = useContext(ClientsContext).clientsState[0];
  const [maintenanceRequest, setMaintenanceRequest] = useState({});
  const [client, setClient] = useState({});
  const [devices, setDevices] = useState([]);
  const [devicesRows, setDevicesRows] = useState([]);
  const [deviceNotes, triggerDeviceNotes] = useState(false);
  const [triggeredDevice, setTriggeredDevice] = useState(0);
  const [deviceActions, triggerDeviceActions] = useState(false);
  const [requestsNotifications, triggerRequestsNotifications] = useState(false);
  const [maintenaceRequestLogs, setMaintenaceRequestLogs] = useState([]);

  const handleMaintenanceRequestUpdate = () => {
    const data = new FormData();
    data.append('maintenanceRequestId', maintenanceRequest?.id);
    data.append('closeMaintenanceRequest', true);
    maintenanceRequestsUpdater(data)
      .then((maintenanceRequestsResponse) => {
        setMaintenanceRequests(maintenanceRequestsResponse);
        enqueueSnackbar('تم تعديل طلب الصيانة بنجاح', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      })
      .catch((error) =>
        enqueueSnackbar(`حدث خطأ ما - ${error}`, {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        })
      );
  };

  const resetRequestHandler = () => {
    const data = new FormData();
    data.append('maintenanceRequestId', maintenanceRequest?.id);
    data.append('resetMaintenanceRequest', true);
    maintenanceRequestsUpdater(data)
      .then((maintenanceRequestsResponse) => {
        setMaintenanceRequests(maintenanceRequestsResponse);
        enqueueSnackbar('تم لعلدة فتح طلب الصيانة بنجاح', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      })
      .catch((error) =>
        enqueueSnackbar(`حدث خطأ ما - ${error}`, {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        })
      );
  };

  const activityLogger = (action) => {
    const data = new FormData();
    data.append('maintenanceRequestId', maintenanceRequest?.id);
    data.append('action', action);
    maintenaceRequestLogsAdder(data)
      .then((maintenaceRequestLogsResponse) => setMaintenaceRequestLogs(maintenaceRequestLogsResponse))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const maintenanceRequestData = _.find(maintenanceRequests, (o) => o.id === parseInt(maintenanceRequestId, 10));
    setMaintenanceRequest(maintenanceRequestData);
  }, [maintenanceRequestId, maintenanceRequests]);

  useEffect(() => {
    const clientData = _.find(clients, (o) => o.id === maintenanceRequest?.client);
    setClient(clientData);
  }, [maintenanceRequest, clients]);

  useEffect(() => {
    if (maintenanceRequest) {
      devicesFetcher(maintenanceRequest.id)
        .then((devicesResponse) => setDevices(devicesResponse))
        .catch((error) => console.log(`maintenance-request-${error}`));

      maintenaceRequestLogsFetcher()
        .then((maintenaceRequestLogsResponse) => setMaintenaceRequestLogs(maintenaceRequestLogsResponse))
        .catch((error) => console.log(error));
    }
  }, [maintenanceRequest]);

  useEffect(() => {
    setDevicesRows(devicesTableData(devices));
  }, [devices]);

  return (
    <Page title="طلب الصيانة">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading={
            <Stack direction="row" alignItems="center">
              <Typography
                sx={{ marginRight: '10px' }}
                variant="h4"
              >{`طلب الصيانة - ${maintenanceRequestId}`}</Typography>
              {maintenanceRequest?.is_closed && (
                <Label variant="ghost" color="error">
                  اغلقت
                </Label>
              )}
            </Stack>
          }
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'طلبات الصيانة', href: PATH_DASHBOARD.general.maintenanceRequests },
            { name: `طلب الصيانة - ${maintenanceRequestId}` }
          ]}
          action={
            !maintenanceRequest?.is_closed ? (
              <Button
                onClick={handleMaintenanceRequestUpdate}
                variant="contained"
                color="error"
                startIcon={<Icon icon="ant-design:close-circle-filled" />}
              >
                غلق طلب الصيانة
              </Button>
            ) : (
              <Button onClick={resetRequestHandler} variant="contained" color="warning" startIcon={<RotateLeftIcon />}>
                اعادة فتح طلب الصيانة
              </Button>
            )
          }
        />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Card>
              <CardHeader title="التسجيلات" />
              <CardContent>
                <Scrollbar
                  sx={{
                    height: '300px',
                    '& .simplebar-content': {
                      height: '300px',
                      display: 'flex',
                      flexDirection: 'column'
                    }
                  }}
                >
                  <Box component="div" display="flex" flexDirection="column">
                    <List>
                      {maintenaceRequestLogs.map((maintenaceRequestLog) => (
                        <MaintenaceRequestLog
                          key={maintenaceRequestLog.id}
                          maintenaceRequestLog={maintenaceRequestLog}
                        />
                      ))}
                    </List>
                  </Box>
                </Scrollbar>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <ClientInfo client={client} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Card>
              <CardHeader title="الاجهزة" />
              <CardContent>
                <MUIDataTable
                  columns={devicesTableColumns([
                    triggerDeviceNotes,
                    setTriggeredDevice,
                    triggerDeviceActions,
                    triggerRequestsNotifications
                  ])}
                  data={devicesRows}
                  options={{
                    selectableRows: false,
                    elevation: 0
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <DeviceNotes
          maintenanceRequestId={parseInt(maintenanceRequestId, 10)}
          triggeredDevice={triggeredDevice}
          isTriggered={deviceNotes}
          triggerHandler={() => triggerDeviceNotes(false)}
          devicesState={[devices, setDevices]}
        />
        <DeviceActions
          isTriggered={deviceActions}
          triggerHandler={() => triggerDeviceActions(false)}
          maintenanceRequestId={parseInt(maintenanceRequestId, 10)}
          devicesState={[devices, setDevices]}
          triggeredDevice={triggeredDevice}
          activityLogger={activityLogger}
        />
        <RequestsNotifications
          isTriggered={requestsNotifications}
          triggerHandler={() => triggerRequestsNotifications(false)}
          maintenanceRequestId={parseInt(maintenanceRequestId, 10)}
          devicesState={[devices, setDevices]}
          triggeredDevice={triggeredDevice}
        />
      </Container>
    </Page>
  );
}

export default MaintenanceRequest;
