/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { SERVICE_URL, API_URL } from 'config.js';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const CommitteeMemberAddEdit = ({ tableInstance, addItem, editItem }) => {
  const { selectedFlatRows, data, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;
  const emptyItem = { mid: '', name: '', designation: '', address: '',  email: '' };
  const [selectedItem, setSelectedItem] = useState(emptyItem);
  const validationSchema = Yup.object().shape({
   
    name: Yup.string().required('Name is required'),
    designation: Yup.string().required('Designation is required'),
    address: Yup.string().required('Address is required'),
    email: Yup.string()
      .required('Email Id is required')
      .email('Enter Valid Email')
      
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
      setSelectedItem(selectedFlatRows[0].original);
    } else {
      setSelectedItem(emptyItem);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenAddEditModal, selectedFlatRows]);
  const initialValues = selectedItem;
  // console.log('initialValues', initialValues);
  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, setFieldValue, values, touched, errors } = formik;

  const changeCategory = (event) => {
    if (event.target.checked) {
      setSelectedItem({ ...selectedItem, sex: event.target.value });
    }
  };

  useEffect(() => {
    if (selectedFlatRows.length === 1) {
      // get user and set form fields
      const fields = ['mid', 'name', 'designation', 'address',  'email'];
      fields.forEach((field) => {
        // console.log('selectedItem', selectedItem[field]);
        setFieldValue(field, selectedItem[field], false);
      });
      // values = selectedItem;
    }
  }, [selectedItem, selectedFlatRows]);

 

  return (
    <Modal className="modal-right" show={isOpenAddEditModal} onHide={() => setIsOpenAddEditModal(false)}>
      <Modal.Header>
        <Modal.Title>{selectedFlatRows.length === 1 ? 'Edit' : 'Add'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Control type="hidden" name="mid" defaultValue={selectedItem ? selectedItem.mid : ''} />
          <div className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" defaultValue={selectedItem ? selectedItem.name : values.name} onChange={handleChange} />
            {errors.name && touched.name && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.name}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Designation</Form.Label>
            <Form.Control type="text" name="designation" defaultValue={selectedItem ? selectedItem.designation : values.designation} onChange={handleChange} />
            {errors.designation && touched.designation && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.designation}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" as="textarea" name="address" defaultValue={selectedItem ? selectedItem.address : values.address} onChange={handleChange} />
            {errors.address && touched.address && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.address}
              </div>
            )}
          </div>
          

          <div className="mb-3">
            <Form.Label>Email Id</Form.Label>
            <Form.Control type="email" name="email" defaultValue={selectedItem ? selectedItem.email : values.email} onChange={handleChange} />
            {errors.email && touched.email && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.email}
              </div>
            )}
          </div>

        
          <div className="mb-3">
            <Button variant="outline-primary" onClick={() => setIsOpenAddEditModal(false)}>
              Cancel
            </Button>&nbsp;&nbsp;
            <Button variant="primary" type="submit">
              {selectedFlatRows.length === 1 ? 'Done' : 'Add'}
            </Button>&nbsp;&nbsp;
           
            
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer />
     
    </Modal>
  );
};

export default CommitteeMemberAddEdit;
