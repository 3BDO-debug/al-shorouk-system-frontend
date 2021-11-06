import axiosInstance from './axios';

export const itemsCategoriesFetcher = async () =>
  axiosInstance.get('/configurations/items-categories').then((response) => response.data);
