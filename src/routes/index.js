import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// providers
import {
  ConfigurationsProvider,
  UsersProvider,
  StorageProvider,
  ClientsProvider,
  MaintenanceRequestsProvider,
  SystemRequestsProvider
} from '../contexts';
// guards
import AuthGuard from '../guards/AuthGuard';
// components
import LoadingScreen from '../components/LoadingScreen';
// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <ConfigurationsProvider>
          <AuthGuard>
            <UsersProvider>
              <StorageProvider>
                <ClientsProvider>
                  <MaintenanceRequestsProvider>
                    <SystemRequestsProvider>
                      <DashboardLayout />
                    </SystemRequestsProvider>
                  </MaintenanceRequestsProvider>
                </ClientsProvider>
              </StorageProvider>
            </UsersProvider>
          </AuthGuard>
        </ConfigurationsProvider>
      ),
      children: [
        { element: <Navigate to="/dashboard/overview" replace /> },
        { path: 'overview', element: <Overview /> },
        { path: 'warehouses', element: <Warehouses /> },
        { path: 'warehouses/warehouse-details/:warehouseId', element: <WarehouseDetails /> },
        { path: 'supplies', element: <Supplies /> },
        { path: 'clients/list-clients', element: <ListClients /> },
        { path: 'clients/add-client', element: <AddClient /> },
        { path: 'clients/client-profile/:clientId', element: <ClientProfile /> },
        { path: 'maintenance-requests', element: <MaintenanceRequests /> },
        {
          path: 'maintenance-requests/maintenance-request-details/:maintenanceRequestId',
          element: <MaintenanceRequest />
        },
        { path: 'list-staff', element: <Staff /> },
        { path: 'list-staff/profile/:userId', element: <Profile /> },
        { path: 'system-logs', element: <SystemLogs /> }
      ]
    },
    // Auth Routes
    {
      path: 'auth',
      element: <LogoOnlyLayout />,
      children: [
        { element: <Navigate to="/auth/login" replace /> },
        { path: '/auth/login', element: <Login /> },
        { path: '/auth/register', element: <Register /> }
      ]
    },
    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },

    {
      path: '/',
      element: <Navigate to="/dashboard/overview" replace />
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Dashboard
const Overview = Loadable(lazy(() => import('../pages/Overview')));
const Warehouses = Loadable(lazy(() => import('../pages/Warehouses')));
const WarehouseDetails = Loadable(lazy(() => import('../pages/WarehouseDetails')));
const Supplies = Loadable(lazy(() => import('../pages/Supplies')));
const ListClients = Loadable(lazy(() => import('../pages/ListClients')));
const AddClient = Loadable(lazy(() => import('../pages/AddClient')));
const ClientProfile = Loadable(lazy(() => import('../pages/ClientProfile')));
const MaintenanceRequests = Loadable(lazy(() => import('../pages/MaintenanceRequests')));
const MaintenanceRequest = Loadable(lazy(() => import('../pages/MaintenanceRequest')));
const Staff = Loadable(lazy(() => import('../pages/Staff')));
const Profile = Loadable(lazy(() => import('../pages/Profile')));
const SystemLogs = Loadable(lazy(() => import('../pages/SystemLogs')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
// Auth
const Register = Loadable(lazy(() => import('../pages/Register')));
const Login = Loadable(lazy(() => import('../pages/Login')));
