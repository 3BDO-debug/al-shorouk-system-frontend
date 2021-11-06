import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import _ from 'lodash';
import { Icon } from '@iconify/react';
// material
import { Container, Stack, Tabs, Tab, Box } from '@mui/material';
// contexts
import { UsersContext } from '../contexts';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import AccountGeneral from '../components/_profile/AccountGeneral';
import Timeline from '../components/_profile/Timeline';
import { MotionInView, varSlideInLeft } from '../components/animate';

function Profile() {
  const { userId } = useParams();
  const users = useContext(UsersContext).usersState[0];
  const [user, setUser] = useState({});
  const [currentTab, setCurrentTab] = useState('general');

  useEffect(() => {
    const userData = _.find(users, (o) => o.id === parseInt(userId, 10));
    setUser(userData);
  }, [userId, users]);

  const TABS = [
    {
      value: 'general',
      label: 'البيانات',
      icon: <Icon icon="ic:round-account-box" width={20} height={20} />,
      component: <AccountGeneral user={user} />
    },
    {
      value: 'timeline',
      label: 'اخر التحديثات',
      icon: <Icon icon="clarity:timeline-line" width={20} height={20} />,
      component: <Timeline user={user} />
    }
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Page title="الملف الشخصي">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading={`${user?.first_name} ${user?.last_name}`}
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'الموظفين', href: PATH_DASHBOARD.management.staff },
            { name: `${user?.first_name} ${user?.last_name}` }
          ]}
        />
        <Stack spacing={5}>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={handleChangeTab}
          >
            {TABS.map((tab) => (
              <Tab disableRipple key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
            ))}
          </Tabs>

          {TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return (
              isMatched && (
                <MotionInView variants={varSlideInLeft}>
                  <Box key={tab.value}>{tab.component}</Box>
                </MotionInView>
              )
            );
          })}
        </Stack>
      </Container>
    </Page>
  );
}

export default Profile;
