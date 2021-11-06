import axiosInstance from './axios';

export const warehousesFetcher = async () => axiosInstance.get('/storage/warehouses').then((response) => response.data);

export const warehousesAdder = async (requestData) =>
  axiosInstance({ method: 'post', url: '/storage/warehouses', data: requestData }).then((response) => response.data);

export const itemsFetcher = async () => axiosInstance.get('/storage/items').then((response) => response.data);

export const itemsAdder = async (warehouseId, requestData) =>
  axiosInstance({ method: 'post', url: `/storage/items?warehouseId=${warehouseId}`, data: requestData }).then(
    (response) => response.data
  );

export const itemUpdater = async (requestData) =>
  axiosInstance({ method: 'put', url: '/storage/items', data: requestData }).then((response) => response.data);
