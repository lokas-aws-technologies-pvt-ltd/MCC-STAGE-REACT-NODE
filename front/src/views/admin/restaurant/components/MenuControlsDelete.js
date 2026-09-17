import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const MenuControlsDelete = ({ tableInstance, deleteItems }) => {
  const { selectedFlatRows } = tableInstance;
  const onClick = () => {
    
    deleteItems({ ids: selectedFlatRows.map((x) => x.original.item_id) });
  };
  // console.log(selectedFlatRows)
  if (selectedFlatRows.length === 0) {
    return (
      <Button variant="foreground-alternate" className="btn-icon btn-icon-only shadow delete-datatable" disabled>
        <CsLineIcons icon="bin" />
      </Button>
    );
  }
  return (
    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top-delete">Delete</Tooltip>}>
      <Button onClick={onClick} variant="foreground-alternate" className="btn-icon btn-icon-only shadow delete-datatable">
        <CsLineIcons icon="bin" />
      </Button>
    </OverlayTrigger>
  );
};
export default MenuControlsDelete;