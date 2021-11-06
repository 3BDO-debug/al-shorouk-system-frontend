import { Icon } from '@iconify/react';
// material
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

const sidebarConfig = [
  // MAIN
  // ----------------------------------------------------------------------
  {
    subheader: 'الرئيسية',
    items: [
      {
        title: 'نظرة عامة',
        path: PATH_DASHBOARD.main.overview,
        icon: <Icon icon="ant-design:home-filled" width={30} height={30} />
      },
      {
        title: 'التسجيلات',
        path: PATH_DASHBOARD.main.systemLogs,
        icon: <Icon icon="cil:history" width={30} height={30} />
      }
    ]
  },
  // STORAGE
  // ----------------------------------------------------------------------
  {
    subheader: 'المخزن',
    items: [
      {
        title: 'المستودعات',

        icon: <Icon icon="maki:warehouse" width={30} height={30} />,
        path: PATH_DASHBOARD.storage.warehouses
      },
      { title: 'التوريدات', icon: <PublishedWithChangesIcon />, path: PATH_DASHBOARD.storage.supplies }
    ]
  },

  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'عامة',
    items: [
      {
        title: 'العملاء',
        path: PATH_DASHBOARD.general.clients.root,
        icon: <Icon icon="fluent:people-audience-20-filled" width={30} height={30} />,
        children: [
          { title: 'اضافة عميل', path: PATH_DASHBOARD.general.clients.addClient },
          { title: 'عرض العملاء', path: PATH_DASHBOARD.general.clients.listClients }
        ]
      },
      {
        title: 'طلبات الصيانة',
        path: PATH_DASHBOARD.general.maintenanceRequests,
        icon: <Icon icon="carbon:license-maintenance" width={30} height={30} />
      }
    ]
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'الادارة',
    items: [
      {
        title: 'الموظفين',
        path: PATH_DASHBOARD.management.staff,
        icon: <Icon icon="fluent:people-community-16-filled" width={30} height={30} />
      }
    ]
  }
];

export default sidebarConfig;
