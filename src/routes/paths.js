// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_AUTH = '/auth';

// ----------------------------------------------------------------------

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  main: {
    overview: path(ROOTS_DASHBOARD, '/overview'),
    systemLogs: path(ROOTS_DASHBOARD, '/system-logs')
  },
  storage: {
    warehouses: path(ROOTS_DASHBOARD, '/warehouses'),
    supplies: path(ROOTS_DASHBOARD, '/supplies')
  },
  general: {
    clients: {
      root: path(ROOTS_DASHBOARD, '/clients'),
      addClient: path(ROOTS_DASHBOARD, '/clients/add-client'),
      listClients: path(ROOTS_DASHBOARD, '/clients/list-clients')
    },
    maintenanceRequests: path(ROOTS_DASHBOARD, '/maintenance-requests')
  },
  management: {
    staff: path(ROOTS_DASHBOARD, '/list-staff')
  }
};

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register')
};
