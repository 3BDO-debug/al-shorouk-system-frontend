import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
// material
import { Card, Fab, Tooltip, Badge } from '@mui/material';
// apis
import { maintenanceRequestsAdder } from '../../_apis_/maintenanceRequests';
import { systemLogsAdder } from '../../_apis_/systemRequests';
// contexts
import { SystemRequestsContext } from '../../contexts';
// utils
import { clientDevicesTableColumns, clientDevicesTableData } from '../../utils/mock-data/clientProfile';
// components
import MUIDataTable from '../mui-datatable/MUIDataTable';
import { MotionInView, varFadeInLeft } from '../animate';
import { MIconButton } from '../@material-extend';

ClientDevices.propTypes = {
  clientDevices: PropTypes.array,
  clientId: PropTypes.number
};

function ClientDevices({ clientId, clientDevices }) {
  const [clientDevicesRows, setClientDevicesRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const setSystemLogs = useContext(SystemRequestsContext).systemLogsState[1];

  const intialiizer = () => {
    enqueueSnackbar('برجاء الانتظار', {
      variant: 'warning',
      action: (key) => (
        <MIconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={closeFill} />
        </MIconButton>
      )
    });
    const data = new FormData();
    data.append('clientId', clientId);
    const devices = selectedRows.map((row) => clientDevices[row].id);
    console.log('hello', devices);
    data.append('devices', JSON.stringify(devices));
    data.append('status', 'تحت التجهيز');
    maintenanceRequestsAdder(data)
      .then((maintenanceRequestResponse) => {
        navigate(`/dashboard/maintenance-requests/maintenance-request-details/${maintenanceRequestResponse.id}`);
        enqueueSnackbar('تم انشاء طلب الصيانة بنجاح', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      })
      .catch((error) =>
        enqueueSnackbar(`حدث خطا ما - ${error}`, {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        })
      );

    const systemLogsRequestData = new FormData();
    systemLogsRequestData.append('action', 'تم انشاء طلب صيانة للعميل');
    systemLogsAdder(systemLogsRequestData)
      .then((systemLogsResponse) => setSystemLogs(systemLogsResponse))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setClientDevicesRows(clientDevicesTableData(clientDevices));
  }, [clientDevices]);

  return (
    <>
      <Card>
        <MUIDataTable
          columns={clientDevicesTableColumns}
          data={clientDevicesRows}
          options={{
            rowsSelected: selectedRows,
            onRowsSelect: (rowsSelected, allRows) => {
              const selected = allRows.map((item) => item.index);
              setSelectedRows(selected);
            }
          }}
        />
      </Card>
      {selectedRows.length !== 0 && (
        <MotionInView variants={varFadeInLeft}>
          <Tooltip title="انشاء طلب الصيانة">
            <Badge
              badgeContent={selectedRows.length}
              color="primary"
              sx={{ position: 'fixed', right: '40px', bottom: '40px', zIndex: 10000 }}
            >
              <Fab onClick={intialiizer}>
                <Icon icon="wpf:maintenance" width={20} height={20} />
              </Fab>
            </Badge>
          </Tooltip>
        </MotionInView>
      )}
    </>
  );
}

export default ClientDevices;
