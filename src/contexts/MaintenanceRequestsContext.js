import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// apis
import { maintenanceRequestsFetcher } from '../_apis_/maintenanceRequests';

export const MaintenanceRequestsContext = createContext();

export const MaintenanceRequestsProvider = ({ children }) => {
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);

  useEffect(() => {
    maintenanceRequestsFetcher()
      .then((maintenanceRequestsResponse) => setMaintenanceRequests(maintenanceRequestsResponse))
      .catch((error) => console.log(`maintenace-requests-${error}`));
  }, []);

  return (
    <MaintenanceRequestsContext.Provider
      value={{ maintenanceRequestsState: [maintenanceRequests, setMaintenanceRequests] }}
    >
      {children}
    </MaintenanceRequestsContext.Provider>
  );
};

MaintenanceRequestsProvider.propTypes = {
  children: PropTypes.node
};
