import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// apis
import { clientsFetcher } from '../_apis_/clients';

export const ClientsContext = createContext();

export const ClientsProvider = ({ children }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    clientsFetcher()
      .then((clientsResponse) => setClients(clientsResponse))
      .catch((error) => console.log(`clients-${error}`));
  }, []);

  return <ClientsContext.Provider value={{ clientsState: [clients, setClients] }}>{children}</ClientsContext.Provider>;
};

ClientsProvider.propTypes = {
  children: PropTypes.node
};
