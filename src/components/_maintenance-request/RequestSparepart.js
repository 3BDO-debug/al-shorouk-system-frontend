import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
// contexts
import { SystemRequestsContext } from '../../contexts';
// apis
import { itemsFetcher } from '../../_apis_/storage';
// utils
import { itemsTableColumns, itemsTableData } from '../../utils/mock-data/sparepartsRequest';
// components
import FullScreenDialog from '../FullscreenDialog';
import MUIDataTable from '../mui-datatable/MUIDataTable';
import RequestSparepartForm from './RequestSparepartForm';

RequestSparepart.propTypes = {
  isTriggered: PropTypes.bool,
  triggerHandler: PropTypes.func,
  triggeredDevice: PropTypes.number,
  devices: PropTypes.array,
  activityLogger: PropTypes.func
};

function RequestSparepart({ devices, triggeredDevice, isTriggered, triggerHandler, activityLogger }) {
  const [items, setItems] = useState([]);
  const [triggeredItem, setTriggeredItem] = useState(0);
  const [requestSparepartForm, triggerRequestSparepartForm] = useState(false);
  const setSparepartsRequests = useContext(SystemRequestsContext).sparepartsRequestsState[1];

  useEffect(() => {
    itemsFetcher()
      .then((itemsResponse) => setItems(itemsTableData(itemsResponse)))
      .catch((error) => console.log(`spareparts-request-${error}`));
  }, []);

  const CONTENT = (
    <MUIDataTable columns={itemsTableColumns(setTriggeredItem, triggerRequestSparepartForm)} data={items} />
  );

  return (
    <>
      <FullScreenDialog
        open={isTriggered}
        closeHandler={triggerHandler}
        dialogTitle="طلب قطع غيار"
        dialogContent={CONTENT}
      />
      <RequestSparepartForm
        isTriggered={requestSparepartForm}
        triggerHandler={() => triggerRequestSparepartForm(false)}
        items={items}
        triggeredItem={parseInt(triggeredItem, 10)}
        triggeredDevice={triggeredDevice}
        devices={devices}
        setSparepartsRequests={setSparepartsRequests}
        activityLogger={activityLogger}
      />
    </>
  );
}

export default RequestSparepart;
