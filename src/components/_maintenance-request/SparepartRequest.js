import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
// material
import { Box, Grid, Typography, Stack, Avatar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// apis
import { mainUrl } from '../../_apis_/axios';
import { sparepartsRequestsUpdater } from '../../_apis_/systemRequests';
// components
import { MIconButton } from '../@material-extend';

SparepartRequest.propTypes = {
  sparepartRequest: PropTypes.object,
  setSparepartsRequests: PropTypes.func,
  warehouseView: PropTypes.bool
};

function SparepartRequest({ sparepartRequest, setSparepartsRequests, warehouseView }) {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const proceedRequestHandler = () => {
    setLoading(true);
    const data = new FormData();
    data.append('sparepartRequestId', sparepartRequest?.id);
    data.append(warehouseView ? 'proceedWarehouse' : 'proceedSupervisor', true);

    sparepartsRequestsUpdater(data)
      .then((sparepartsRequestsResponse) => {
        setSparepartsRequests(sparepartsRequestsResponse);
        enqueueSnackbar('تم قبول طلب قطعة الغيار بنجاح', {
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

    setLoading(false);
  };

  const rejectRequestHandler = () => {
    setLoading(true);
    const data = new FormData();
    data.append('sparepartRequestId', sparepartRequest?.id);
    data.append('supervisorRejected', true);
    sparepartsRequestsUpdater(data)
      .then((sparepartsRequestsResponse) => {
        console.log('heere', sparepartsRequestsResponse);
        setSparepartsRequests(sparepartsRequestsResponse);
        enqueueSnackbar('تم رفض طلب قطعة الغيار', {
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
    setLoading(false);
  };

  return (
    <Box marginTop="20px">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="subtitle2">طلب قطعة غيار</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="body2">
            <Stack direction="row" alignItems="center">
              <Typography sx={{ marginRight: '25px' }} variant="caption">
                بواسطة
              </Typography>

              <Avatar
                src={`${mainUrl}/${sparepartRequest.requested_by_profile_pic}`}
                alt={sparepartRequest.requested_by_name}
                sx={{ marginRight: '10px' }}
              />
              <Typography variant="caption">{sparepartRequest.requested_by_name}</Typography>
            </Stack>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Stack direction="row" alignItems="center">
            <Typography sx={{ marginRight: '10px' }} variant="caption">
              اسم القطعة
            </Typography>
            <Typography variant="caption">{sparepartRequest.sparepart_name}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Stack direction="row" alignItems="center">
            <Typography sx={{ marginRight: '10px' }} variant="caption">
              صورة القطعة
            </Typography>
            <Avatar
              src={`${mainUrl}/${sparepartRequest.sparepart_img}`}
              alt={sparepartRequest.sparepart_name}
              variant="rounded"
              sx={{ width: '200px', height: '200px' }}
            />
          </Stack>
        </Grid>
        {warehouseView ? (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <LoadingButton loading={loading} disabled={loading} onClick={proceedRequestHandler}>
              تم
            </LoadingButton>
          </Grid>
        ) : (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <LoadingButton loading={loading} disabled={loading} onClick={proceedRequestHandler}>
              قبول
            </LoadingButton>
            <LoadingButton loading={loading} disabled={loading} onClick={rejectRequestHandler} color="error">
              رفض
            </LoadingButton>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default SparepartRequest;
