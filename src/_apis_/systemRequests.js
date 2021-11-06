import axiosInstance from './axios';

export const sparepartsRequestsFetcher = () =>
  axiosInstance.get('/system-requests/spareparts-requests').then((response) => response.data);

export const sparepartsRequestsAdder = (requestData) =>
  axiosInstance({
    method: 'post',
    url: '/system-requests/spareparts-requests',
    data: requestData
  }).then((response) => response.data);

export const sparepartsRequestsUpdater = (requestData) =>
  axiosInstance({ method: 'put', url: '/system-requests/spareparts-requests', data: requestData }).then(
    (response) => response.data
  );

export const changeMaintenanceRequestDeviceStatusFetcher = (maintenanceRequestId) =>
  axiosInstance
    .get(`/system-requests/change-maintenance-request-device-status/${maintenanceRequestId}`)
    .then((response) => response.data);

export const changeMaintenanceRequestDeviceStatusAdder = (maintenanceRequestId, requestData) =>
  axiosInstance({
    method: 'post',
    url: `/system-requests/change-maintenance-request-device-status/${maintenanceRequestId}`,
    data: requestData
  }).then((response) => response.data);

export const changeMaintenanceRequestDeviceStatusUpdater = (maintenanceRequestId, requestData) =>
  axiosInstance({
    method: 'put',
    url: `/system-requests/change-maintenance-request-device-status/${maintenanceRequestId}`,
    data: requestData
  }).then((response) => response.data);

export const supplyRequestsFetcher = async () =>
  axiosInstance.get('/system-requests/supply-requests').then((response) => response.data);

export const supplyRequestsAdder = async (requestData) =>
  axiosInstance({ method: 'post', url: '/system-requests/supply-requests', data: requestData }).then(
    (response) => response.data
  );

export const systemLogsFetcher = async () =>
  axiosInstance.get('/system-requests/system-logs').then((response) => response.data);

export const systemLogsAdder = async (requestData) =>
  axiosInstance({ method: 'post', url: '/system-requests/system-logs', data: requestData }).then(
    (response) => response.data
  );

export const maintenaceRequestLogsFetcher = async () =>
  axiosInstance.get('/system-requests/maintenance-request-logs').then((response) => response.data);

export const maintenaceRequestLogsAdder = async (requestData) =>
  axiosInstance({ method: 'post', url: '/system-requests/maintenance-request-logs', data: requestData }).then(
    (response) => response.data
  );
