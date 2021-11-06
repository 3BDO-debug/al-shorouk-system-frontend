// material
import { Avatar, Button } from '@mui/material';
//
import { mainUrl } from '../../_apis_/axios';

export const itemsTableColumns = (setTriggeredItem, triggerRequestSparepartForm) => {
  const columns = [
    { name: 'id', label: 'الرقم التعريفي' },
    { name: 'warehouse', label: 'المستودع' },
    { name: 'itemName', label: 'اسم الصنف' },
    {
      name: 'itemImg',
      label: 'صورة الصنف',
      options: {
        customBodyRender: (value) => (
          <Avatar
            onClick={() => window.open(value)}
            sx={{ width: '150px', height: '150px', cursor: 'pointer' }}
            variant="rounded"
            src={value}
            alt="item"
          />
        )
      }
    },
    { name: 'category', label: 'التصنيف' },
    { name: 'createdAt', label: 'انشء في' },
    {
      name: 'action',
      label: 'اجراء',
      options: {
        customBodyRender: (value) => (
          <Button
            onClick={() => {
              setTriggeredItem(value);
              triggerRequestSparepartForm(true);
            }}
            variant="contained"
          >
            طلب
          </Button>
        )
      }
    }
  ];
  return columns;
};

export const itemsTableData = (items) => {
  const itemsData = items.map((item) => ({
    id: item.id,
    warehouse: item.warehouse_name,
    itemName: item.item_name,
    itemImg: `${mainUrl}/${item.item_img}`,
    category: item.category_name,
    createdAt: new Date(item.created_at).toLocaleString(),
    action: item.id
  }));
  return itemsData;
};
