import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import _ from 'lodash';
import { Icon } from '@iconify/react';
// material
import {
  Container,
  Button,
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Typography,
  Stack,
  IconButton,
  Badge
} from '@mui/material';
// apis
import { mainUrl } from '../_apis_/axios';
import { itemsFetcher } from '../_apis_/storage';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// utils
import { itemsTableColumns, itemsTableData } from '../utils/mock-data/items';
// context
import { StorageContext, SystemRequestsContext } from '../contexts';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { ChartRadialBar } from '../components/charts';
import { UploadAvatar } from '../components/upload';
import MUIDataTable from '../components/mui-datatable/MUIDataTable';
import AddItem from '../components/_warehouse-details/AddItem';
import ItemActions from '../components/_warehouse-details/ItemActions';
import WarehouseNotifications from '../components/_warehouse-details/WarehouseNotifications';

function WarehouseDetails() {
  const { warehouseId } = useParams();
  const warehouses = useContext(StorageContext).warehousesState[0];
  const [warehouse, setWarehouse] = useState({});
  const [addItem, triggerAddItem] = useState(false);
  const [items, setItems] = useState([]);
  const [itemsTableRows, setItemsTableRows] = useState([]);
  const [itemsCategories, setItemsCategories] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [itemActions, triggerItemActions] = useState(false);
  const [triggeredItem, setTriggeredItem] = useState(0);
  const [warehouseNotifications, triggerWarehouseNotifications] = useState(false);
  const [sparepartsRequests, setSparepartsRequests] = useContext(SystemRequestsContext).sparepartsRequestsState;

  const [warehouseSparepartsRequests, setWarehouseSparepartsRequests] = useState([]);

  useEffect(() => {
    const warehouseDetails = _.find(warehouses, (o) => o.id === parseInt(warehouseId, 10));
    setWarehouse(warehouseDetails);
  }, [warehouses, warehouseId]);

  useEffect(() => {
    itemsFetcher()
      .then((itemsResponse) => {
        setItems(itemsResponse);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const warehouseItems = _.filter(items, (o) => o.warehouse === parseInt(warehouseId, 10));

    setItemsTableRows(itemsTableData(warehouseItems));
  }, [items, warehouseId]);

  useEffect(() => {
    const itemsCategoriesData = _.groupBy(itemsTableRows, 'category');
    setItemsCategories(_.keys(itemsCategoriesData));
    const chartDataGrouped = _.groupBy(itemsTableRows, 'category');
    const preserver = _.map(chartDataGrouped, (o) => o.length);
    setChartData(preserver);
  }, [itemsTableRows]);

  useEffect(() => {
    if (warehouseId) {
      const warehouseSparepartsRequestsData = _.filter(
        sparepartsRequests,
        (o) =>
          o.warehouse === parseInt(warehouseId, 10) &&
          o.supervisor_proceeded === true &&
          o.warehouse_proceeded === false
      );
      setWarehouseSparepartsRequests(warehouseSparepartsRequestsData);
    }
  }, [sparepartsRequests, warehouseId]);

  return (
    <Page title="تفاصيل المستودع">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading={warehouse?.warehouse_name}
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'المستودعات', href: PATH_DASHBOARD.storage.warehouses },
            { name: warehouse?.warehouse_name }
          ]}
          action={
            <Stack direction="row" alignItems="center">
              <Button
                sx={{ marginRight: '10px' }}
                onClick={() => triggerAddItem(true)}
                variant="contained"
                startIcon={<Icon icon="akar-icons:plus" />}
              >
                اضافة عناصر الي المستودع
              </Button>
              <IconButton onClick={() => triggerWarehouseNotifications(true)}>
                <Badge badgeContent={warehouseSparepartsRequests.length} color="primary">
                  <Icon icon="ic:baseline-notifications" />
                </Badge>
              </IconButton>
            </Stack>
          }
        />
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Card>
              <CardHeader
                title="البيانات"
                subheader={
                  <Typography variant="caption">
                    انشئ في : {new Date(warehouse?.created_at).toLocaleString()}{' '}
                  </Typography>
                }
              />
              <CardContent>
                <Grid container spacing={3} sx={{ alignItems: 'center' }}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField label="معين الي" value={warehouse?.assigned_to_name} focused fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <UploadAvatar file={{ preview: `${mainUrl}/${warehouse?.assigned_to_profile_pic}` }} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Card>
              <CardHeader title="احصائيات" />
              <CardContent>
                <ChartRadialBar labelsData={itemsCategories} chartData={chartData} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Card>
              <MUIDataTable
                title="تفاصيل المستودع"
                columns={itemsTableColumns(setTriggeredItem, triggerItemActions)}
                data={itemsTableRows}
                options={{ selectableRowsHideCheckboxes: true }}
              />
            </Card>
          </Grid>
        </Grid>
        <AddItem
          isTriggered={addItem}
          triggerHandler={() => triggerAddItem(false)}
          warehouseId={parseInt(warehouseId, 10)}
          itemsState={[items, setItems]}
        />
        <ItemActions
          isTriggered={itemActions}
          triggerHandler={() => triggerItemActions(false)}
          items={itemsTableRows}
          triggeredItem={triggeredItem}
          setItems={setItems}
        />
        <WarehouseNotifications
          isTriggered={warehouseNotifications}
          triggerHandler={() => triggerWarehouseNotifications(false)}
          sparepartsRequests={warehouseSparepartsRequests}
          setSparepartsRequests={setSparepartsRequests}
        />
      </Container>
    </Page>
  );
}

export default WarehouseDetails;
