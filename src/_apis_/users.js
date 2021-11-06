import axiosInstance from './axios';

export const usersFetcher = async () => axiosInstance.get('/accounts/users').then((response) => response.data);
