import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// apis
import { warehousesFetcher } from '../_apis_/storage';

export const StorageContext = createContext();

export const StorageProvider = ({ children }) => {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    warehousesFetcher()
      .then((warehousesResponse) => setWarehouses(warehousesResponse))
      .catch((error) => console.log(`Warehouses-${error}`));
  }, []);
  return (
    <StorageContext.Provider value={{ warehousesState: [warehouses, setWarehouses] }}>
      {children}
    </StorageContext.Provider>
  );
};

StorageProvider.propTypes = {
  children: PropTypes.node
};
