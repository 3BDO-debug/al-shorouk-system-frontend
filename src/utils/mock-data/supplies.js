export const suppliesTableColumns = [
  { name: 'id', label: 'الرقم التعريفي' },
  { name: 'warehouse', label: 'اسم المستودع' },
  { name: 'client', label: 'العميل' },
  { name: 'item', label: 'الصنف' },
  { name: 'qty', label: 'الكمية' },
  { name: 'total', label: 'الاجمالي (جنيه مصري)' }
];

export const suppliesTableData = (supplies) => {
  const suppliesData = supplies.map((supply) => ({
    id: supply.id,
    warehouse: supply.warehouse,
    client: supply.client_name,
    item: supply.item_name,
    qty: supply.qty,
    total: supply.total
  }));

  return suppliesData;
};
