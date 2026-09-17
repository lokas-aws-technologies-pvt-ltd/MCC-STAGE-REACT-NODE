/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import * as Yup from 'yup';

const BanquetAddEdit = ({ tableInstance, addItem, editItem }) => {
  const { selectedFlatRows, data, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;
  const emptyItem = {
    banquet_id: '',
    banquet_name: '',
    capacity: '0',
    cost_4_hrs: '0',
    cost_8_hrs: '0',
    electricity_4_hrs: '0',
    electricity_8_hrs: '0',
    projector: '0',
    valet_per_driver: '0',
    banquet_status: '0',
  };
  const [selectedItem, setSelectedItem] = useState(emptyItem);

  const validationSchema = Yup.object().shape({
    banquet_name: Yup.string().required('Category Name is required'),
    capacity: Yup.number().positive().required('Capacity is Required'),
    cost_4_hrs: Yup.number().positive().required('Cost/8hrs is Required'),
    cost_8_hrs: Yup.number().positive().required('Cost/8hrs is Required'),
    electricity_4_hrs: Yup.number().positive().required('Electricity/4hrs is Required'),
    electricity_8_hrs: Yup.number().positive().required('Electricity/8hrs is Required'),
    projector: Yup.number().positive().required('Projector Cost is Required'),
    valet_per_driver: Yup.number().positive().required('Valet Parking Cost / Driver Required'),
    banquet_status: Yup.string().required('Status is Required'),
  });

  const onSubmit = (values, { resetForm }) => {
    // console.log('submit form', values);
    if (selectedFlatRows.length === 1) {
      editItem({ item: values });

      // const { index } = selectedFlatRows[0];
      // const newData = data.map((row, rowIndex) => (rowIndex === index ? selectedItem : row));
      // setData(newData);
    } else {
      addItem({ item: values });
    }
    resetForm({ values: '' });
    setIsOpenAddEditModal(false);
  };

  useEffect(() => {
    if (isOpenAddEditModal && selectedFlatRows.length === 1) {
      // console.log(selectedFlatRows[0].original.capacity);
      setSelectedItem(selectedFlatRows[0].original);
    } else {
      setSelectedItem(emptyItem);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenAddEditModal, selectedFlatRows]);
  const initialValues = selectedItem;

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, setFieldValue, values, touched, errors } = formik;

  const changeActive = (event) => {
    // console.log('event', event.target.value);
    if (event.target.checked) {
      setSelectedItem({ ...selectedItem, banquet_status: event.target.value });
    }
  };

  useEffect(() => {
    if (selectedFlatRows.length === 1) {
      // get user and set form fields
      const fields = [
        'banquet_id',
        'banquet_name',
        'capacity',
        'cost_4_hrs',
        'cost_8_hrs',
        'electricity_4_hrs',
        'electricity_8_hrs',
        'projector',
        'valet_per_driver',
        'banquet_status',
      ];
      fields.forEach((field) => {
        // console.log( 'selectedItem', selectedItem[field]);
        setFieldValue(field, selectedItem[field], false);
      });
      // values = selectedItem;
    }
  }, [selectedItem, selectedFlatRows]);
  // console.log('selectedItem', selectedItem);
  return (
    <Modal className="modal-right" show={isOpenAddEditModal} onHide={() => setIsOpenAddEditModal(false)}>
      <Modal.Header>
        <Modal.Title>{selectedFlatRows.length === 1 ? 'Edit' : 'Add'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Form.Label>Banquet Name</Form.Label>
            <Form.Control
              type="text"
              name="banquet_name"
              defaultValue={selectedItem ? selectedItem.banquet_name : values.banquet_name}
              onChange={handleChange}
            />
            {errors.banquet_name && touched.banquet_name && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.banquet_name}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Capacity</Form.Label>
            <Form.Control type="text" name="capacity" value={values ? values.capacity : selectedItem.capacity} onChange={handleChange} />
            {errors.capacity && touched.capacity && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.capacity}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Cost / 4hrs</Form.Label>
            <Form.Control type="text" name="cost_4_hrs" value={values ? values.cost_4_hrs : selectedItem.cost_4_hrs} onChange={handleChange} />
            {errors.cost_4_hrs && touched.cost_4_hrs && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.cost_4_hrs}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Cost / 8hrs</Form.Label>
            <Form.Control type="text" name="cost_8_hrs" value={values ? values.cost_8_hrs : selectedItem.cost_8_hrs} onChange={handleChange} />
            {errors.cost_8_hrs && touched.cost_8_hrs && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.cost_8_hrs}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Electricity / 4hrs</Form.Label>
            <Form.Control
              type="text"
              name="electricity_4_hrs"
              value={values ? values.electricity_4_hrs : selectedItem.electricity_4_hrs}
              onChange={handleChange}
            />
            {errors.electricity_4_hrs && touched.electricity_4_hrs && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.electricity_4_hrs}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Electricity / 8hrs</Form.Label>
            <Form.Control
              type="text"
              name="electricity_8_hrs"
              value={values ? values.electricity_8_hrs : selectedItem.electricity_8_hrs}
              onChange={handleChange}
            />
            {errors.electricity_8_hrs && touched.electricity_8_hrs && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.electricity_8_hrs}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Projector Cost</Form.Label>
            <Form.Control type="text" name="projector" value={values ? values.projector : selectedItem.projector} onChange={handleChange} />
            {errors.projector && touched.projector && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.projector}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Valet Parking Cost / Driver</Form.Label>
            <Form.Control
              type="text"
              name="valet_per_driver"
              value={values ? values.valet_per_driver : selectedItem.valet_per_driver}
              onChange={handleChange}
            />
            {errors.valet_per_driver && touched.valet_per_driver && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.valet_per_driver}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Check
              type="radio"
              label="Available"
              value="1"
              id="categoryRadio1"
              name="banquet_status"
              checked={(values && values.banquet_status == '1') || (selectedItem && selectedItem.banquet_status == '1')}
              onChange={(e) => {
                handleChange(e);
                changeActive(e);
              }}
            />
            <Form.Check
              type="radio"
              label="Unavailable"
              value="0"
              id="categoryRadio2"
              name="active"
              checked={(values && values.banquet_status == '0') || (selectedItem && selectedItem.banquet_status == '0')}
              onChange={(e) => {
                handleChange(e);
                changeActive(e);
              }}
            />
            {errors.banquet_status && touched.banquet_status && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.banquet_status}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Button variant="outline-primary" onClick={() => setIsOpenAddEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="Submit">
              {selectedFlatRows.length === 1 ? 'Done' : 'Add'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
};

export default BanquetAddEdit;
