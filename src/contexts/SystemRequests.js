import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// apis
import { sparepartsRequestsFetcher, supplyRequestsFetcher, systemLogsFetcher } from '../_apis_/systemRequests';

export const SystemRequestsContext = createContext();

export const SystemRequestsProvider = ({ children }) => {
  const [sparepartsRequests, setSparepartsRequests] = useState([]);
  const [supplyRequests, setSupplyRequests] = useState([]);
  const [systemLogs, setSystemLogs] = useState([]);

  useEffect(() => {
    sparepartsRequestsFetcher()
      .then((sparepartsRequestsResponse) => setSparepartsRequests(sparepartsRequestsResponse))
      .catch((error) => console.log(error));

    supplyRequestsFetcher()
      .then((supplyRequestsResponse) => setSupplyRequests(supplyRequestsResponse))
      .catch((error) => console.log(`supply requests - ${error}`));

    systemLogsFetcher()
      .then((systemLogsResponse) => setSystemLogs(systemLogsResponse))
      .catch((error) => console.log(`system-logs - ${error}`));
  }, []);

  return (
    <SystemRequestsContext.Provider
      value={{
        sparepartsRequestsState: [sparepartsRequests, setSparepartsRequests],
        supplyRequestsState: [supplyRequests, setSupplyRequests],
        systemLogsState: [systemLogs, setSystemLogs]
      }}
    >
      {children}
    </SystemRequestsContext.Provider>
  );
};

SystemRequestsProvider.propTypes = {
  children: PropTypes.node
};
