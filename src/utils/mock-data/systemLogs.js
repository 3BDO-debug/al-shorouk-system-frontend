export const systemLogsTableColumns = [
  { name: 'id', label: 'الرقم التعريفي' },
  { name: 'actionBy', label: 'بواسطة' },
  { name: 'action', label: 'التسجيل' },
  { name: 'createdAt', label: 'انشئي في' }
];

export const systemLogsTableData = (systemLogs) => {
  const systemLogsData = systemLogs.map((systemLog) => ({
    id: systemLog.id,
    actionBy: systemLog.action_by_name,
    action: systemLog.action,
    createdAt: new Date(systemLog.created_at).toLocaleString()
  }));

  return systemLogsData;
};
