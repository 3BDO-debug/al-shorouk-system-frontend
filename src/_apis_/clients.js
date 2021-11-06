import axiosInstance from './axios';

export const clientsFetcher = async () => axiosInstance.get('/clients/clients-data').then((response) => response.data);

export const clientsAdder = async (requestData) =>
  axiosInstance({ method: 'post', url: '/clients/clients-data', data: requestData }).then((response) => response.data);
