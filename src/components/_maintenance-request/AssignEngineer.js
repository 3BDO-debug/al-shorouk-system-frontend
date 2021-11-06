import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
// material
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Rating,
  Divider
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// apis
import { deviceUpdater } from '../../_apis_/maintenanceRequest';
// routes
import { mainUrl } from '../../_apis_/axios';
// contexts
import { UsersContext } from '../../contexts';
// components
import { DialogAnimate } from '../animate';
import Scrollbar from '../Scrollbar';
import { MIconButton } from '../@material-extend';

AssignEngineer.propTypes = {
  isTriggered: PropTypes.bool,
  triggerHandler: PropTypes.func,
  maintenanceRequestId: PropTypes.number,
  devicesState: PropTypes.array,
  triggeredDevice: PropTypes.number,
  activityLogger: PropTypes.func
};

function AssignEngineer({
  isTriggered,
  triggerHandler,
  maintenanceRequestId,
  devicesState,
  triggeredDevice,
  activityLogger
}) {
  const navigate = useNavigate();
  const [devices, setDevices] = devicesState;
  const [device, setDevice] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const users = useContext(UsersContext).usersState[0];
  const [engineers, setEngineers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEngineerAssign = (engineerId) => {
    setIsSubmitting(true);
    alert(triggeredDevice);
    const data = new FormData();
    data.append('deviceId', triggeredDevice);
    data.append('engineerId', engineerId);
    deviceUpdater(maintenanceRequestId, data)
      .then((devicesResponse) => {
        setDevices(devicesResponse);
        enqueueSnackbar('تم اختيار المهندس بنجاح', {
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
    setIsSubmitting(false);

    activityLogger('تم تعيين مهندس بنجاح');
  };

  useEffect(() => {
    const engineersData = _.filter(users, (o) => o.role === 'maintenance-engineer');
    setEngineers(engineersData);
  }, [users]);

  useEffect(() => {
    const deviceData = _.find(devices, (o) => o.id === triggeredDevice);
    setDevice(deviceData);
  }, [devices, triggeredDevice]);

  return (
    <DialogAnimate open={isTriggered} onClose={triggerHandler}>
      <DialogTitle>اختيار مهندس</DialogTitle>
      <DialogContent>
        <Box marginTop="30px">
          <List>
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
              {engineers?.map((engineer) => (
                <>
                  <ListItem
                    secondaryAction={
                      <LoadingButton
                        color={device?.engineer === engineer.id ? 'success' : 'primary'}
                        loading={isSubmitting}
                        onClick={() => handleEngineerAssign(engineer.id)}
                      >
                        {device?.engineer === engineer.id ? 'تم الاختيار' : 'تعيين'}
                      </LoadingButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={`${mainUrl}/${engineer.profile_pic}`}
                        alt={`${engineer.first_name} ${engineer.ast_name}`}
                        onClick={() => navigate(`/dashboard/list-staff/profile/${engineer.id}`)}
                        sx={{ cursor: 'pointer' }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${engineer.first_name} ${engineer.last_name}`}
                      secondary={<Rating value={3} readOnly />}
                    />
                  </ListItem>
                  <Divider orientation="horizontal" variant="middle" />
                </>
              ))}
            </Scrollbar>
          </List>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={triggerHandler}>تم</Button>
      </DialogActions>
    </DialogAnimate>
  );
}

export default AssignEngineer;
