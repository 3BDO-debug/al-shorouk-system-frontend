import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// material
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  Divider,
  ListItemText
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
// components
import { DialogAnimate } from '../animate';
import AddItemQty from './AddItemQty';
import ItemSupply from './ItemSupply';

ItemActions.propTypes = {
  isTriggered: PropTypes.bool,
  triggerHandler: PropTypes.func,
  items: PropTypes.array,
  triggeredItem: PropTypes.func,
  setItems: PropTypes.func
};

function ItemActions({ isTriggered, triggerHandler, items, triggeredItem, setItems }) {
  const [item, setItem] = useState({});
  const [addItemQty, triggerAddItemQty] = useState(false);
  const [itemSupply, triggerItemSupply] = useState(false);

  useEffect(() => {
    const itemData = _.find(items, (o) => o.id === triggeredItem);
    setItem(itemData);
  }, [items, triggeredItem]);

  return (
    <>
      <DialogAnimate open={isTriggered} onClose={triggerHandler}>
        <DialogTitle>اجرائات علي الصنف</DialogTitle>
        <DialogContent>
          <List>
            <ListItemButton onClick={() => triggerAddItemQty(true)}>
              <ListItemIcon>
                <AddIcon color="primary" />
              </ListItemIcon>
              <ListItemText secondary="اضافة كمية" />
            </ListItemButton>
            <Divider orientation="horizontal" sx={{ m: 1 }} variant="middle" />
            <ListItemButton onClick={() => triggerItemSupply(true)}>
              <ListItemIcon>
                <PublishedWithChangesIcon color="primary" />
              </ListItemIcon>
              <ListItemText secondary="توريد" />
            </ListItemButton>
            <Divider orientation="horizontal" sx={{ m: 1 }} variant="middle" />
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={triggerHandler}>الغاء</Button>
        </DialogActions>
      </DialogAnimate>
      <AddItemQty
        isTriggered={addItemQty}
        triggerHandler={() => triggerAddItemQty(false)}
        item={item}
        setItems={setItems}
      />
      <ItemSupply isTriggered={itemSupply} triggerHandler={() => triggerItemSupply(false)} item={item} />
    </>
  );
}

export default ItemActions;
