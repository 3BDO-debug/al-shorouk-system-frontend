import axiosInstance from './axios';

export const clientDevicesFetcher = async (clientId) =>
  axiosInstance.get(`/clients/client-devices/${clientId}`).then((response) => response.data);

export const clientDeviceAdder = async (clientId, requestData) =>
  axiosInstance({ method: 'post', url: `/clients/client-devices/${clientId}`, data: requestData }).then(
    (response) => response.data
  );
