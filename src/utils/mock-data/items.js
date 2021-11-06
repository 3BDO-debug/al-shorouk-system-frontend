import { Icon } from '@iconify/react';
// material
import { Avatar, Button } from '@mui/material';
// apis
import { mainUrl } from '../../_apis_/axios';

export const itemsTableColumns = (setTriggeredItem, triggerItemActions) => [
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
  { name: 'qty', label: 'الكمية' },
  { name: 'ppu', label: 'السعر' },
  { name: 'createdAt', label: 'انشء في' },
  {
    name: 'actions',
    label: 'اجرائات',
    options: {
      customBodyRender: (value) => (
        <Button
          variant="contained"
          onClick={() => {
            setTriggeredItem(value);
            triggerItemActions(true);
          }}
          startIcon={<Icon icon="pepicons:electricity" />}
        >
          اجرائات علي الصنف
        </Button>
      )
    }
  }
];

export const itemsTableData = (items) => {
  const itemsData = items.map((item) => ({
    id: item.id,
    warehouse: item.warehouse_name,
    itemName: item.item_name,
    itemImg: `${mainUrl}/${item.item_img}`,
    category: item.category_name,
    qty: item.qty,
    ppu: item.ppu,
    createdAt: new Date(item.created_at).toLocaleString(),
    actions: item.id
  }));
  return itemsData;
};
