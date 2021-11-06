import axiosInstance from './axios';

export const devicesFetcher = (maintenanceRequestId) =>
  axiosInstance
    .get(`/maintenance-requests/maintenance-request-devices/${maintenanceRequestId}`)
    .then((response) => response.data);

export const deviceUpdater = (maintenanceRequestId, requestData) =>
  axiosInstance({
    method: 'put',
    url: `/maintenance-requests/maintenance-request-devices/${maintenanceRequestId}`,
    data: requestData
  }).then((response) => response.data);
