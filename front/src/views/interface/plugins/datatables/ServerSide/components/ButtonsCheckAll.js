/* eslint-disable no-nested-ternary */
import { Button, ButtonGroup, Dropdown, Form } from 'react-bootstrap';
import React, { useEffect, useRef } from 'react';

const ButtonsCheckAll = ({ tableInstance, deleteItems }) => {
  const checkAllRef = useRef(null);
  const {
    getToggleAllPageRowsSelectedProps,
    setData,
    data,
    selectedFlatRows,
    state: { selectedRowIds },
  } = tableInstance;
  const { onChange, checked, indeterminate } = getToggleAllPageRowsSelectedProps();

  useEffect(() => {
    if (checkAllRef.current) {
      checkAllRef.current.indeterminate = indeterminate;
    }
    return () => {};
  }, [indeterminate]);
  const onClick = () => {
    deleteItems({ ids: selectedFlatRows.map((x) => x.original.id) });
  };


  const changeTagSelectedItems = (tag) => {
    const newData = data.map((x, index) => {
      if (selectedRowIds[index] === true) {
        return { ...x, tag };
      }
      return x;
    });
    setData(newData);
  };
  return (
    <div className="">
      <Dropdown drop="down" as={ButtonGroup} className="ms-1 check-all-container" align="end">
        <Button variant="outline-primary" className="btn-custom-control p-0 ps-3 pe-2" onClick={onChange}>
          <Form.Check ref={checkAllRef} className="form-check float-end pt-0" type="checkbox" checked={checked} onChange={() => {}} />
        </Button>
        <Dropdown.Toggle split as={Button} variant="outline-primary" className="" />
        <Dropdown.Menu
          popperConfig={{
            modifiers: [
              {
                name: 'computeStyles',
                options: {
                  gpuAcceleration: false,
                },
              },
            ],
          }}
        >
          <Dropdown drop="start" className="dropdown-submenu">
            <Dropdown.Menu>
              <Dropdown.Item
                href="#/action"
                onClick={(event) => {
                  event.preventDefault();
                  changeTagSelectedItems('Activate');
                }}
              >
                Activate
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action"
                onClick={(event) => {
                  event.preventDefault();
                  changeTagSelectedItems('New');
                }}
              >
                Deactivate
              </Dropdown.Item>
              
            </Dropdown.Menu>
            <Dropdown.Toggle variant="link" disabled={selectedFlatRows.length === 0}>
              Status
            </Dropdown.Toggle>
          </Dropdown>
          <Dropdown.Item  disabled={selectedFlatRows.length === 0} onClick={onClick}>
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
export default ButtonsCheckAll;
