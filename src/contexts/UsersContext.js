import { createContext, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
// apis
import { userInfoRequest } from '../_apis_/auth';
import { usersFetcher } from '../_apis_/users';

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  const userInfoHandler = useCallback(
    async () =>
      userInfoRequest()
        .then((userInfoResponse) => setUser(userInfoResponse))
        .catch((error) => console.log(error)),
    []
  );

  const usersHandler = useCallback(
    async () =>
      usersFetcher()
        .then((usersResponse) => setUsers(usersResponse))
        .catch((error) => console.log(`Users-${error}`)),
    []
  );

  useEffect(() => {
    usersHandler();
    userInfoHandler();
  }, [usersHandler, userInfoHandler]);

  return (
    <UsersContext.Provider value={{ userState: [user, setUser], usersState: [users, setUsers] }}>
      {children}
    </UsersContext.Provider>
  );
};

UsersProvider.propTypes = {
  children: PropTypes.node
};
