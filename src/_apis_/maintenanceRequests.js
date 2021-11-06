import axiosInstance from './axios';

export const maintenanceRequestsFetcher = async () =>
  axiosInstance.get('/maintenance-requests/maintenance-requests-data').then((response) => response.data);

export const maintenanceRequestsAdder = async (requestData) =>
  axiosInstance({ method: 'post', data: requestData, url: '/maintenance-requests/maintenance-requests-data' }).then(
    (response) => response.data
  );

export const maintenanceRequestsUpdater = async (requestData) =>
  axiosInstance({ method: 'put', url: '/maintenance-requests/maintenance-requests-data', data: requestData }).then(
    (response) => response.data
  );

export const userMaintenanceRequestsFinder = async (userId) =>
  axiosInstance.get(`/maintenance-requests/user-maintenance-requests-data/${userId}`).then((response) => response.data);
