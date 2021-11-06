import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
// material
import { Avatar, Button } from '@mui/material';
//
import { mainUrl } from '../../_apis_/axios';

export const staffTableColumns = [
  { name: 'id', label: 'الرقم التعريفي' },
  { name: 'fullName', label: 'الاسم' },
  { name: 'photo', label: 'الصورة', options: { customBodyRender: (value) => <Avatar src={value} /> } },
  { name: 'role', label: 'الوظيفة' },
  {
    name: 'action',
    label: 'اجراء',
    options: {
      customBodyRender: (value) => (
        <Button
          startIcon={<Icon icon="carbon:view-filled" />}
          component={Link}
          to={`/dashboard/list-staff/profile/${value}`}
        />
      )
    }
  }
];

export const staffTableData = (staff) => {
  const staffData = staff.map((staffMember) => ({
    id: staffMember.id,
    fullName: `${staffMember.first_name} ${staffMember.last_name}`,
    photo: `${mainUrl}/${staffMember.profile_pic}`,
    role: staffMember.role,
    action: staffMember.id
  }));
  return staffData;
};
