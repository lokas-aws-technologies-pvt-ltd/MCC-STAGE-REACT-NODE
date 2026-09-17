/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { Button, Form, Modal ,Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { SERVICE_URL, API_URL } from 'config.js';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const AffiliateclubAddEdit = ({ tableInstance, addItem, editItem }) => {
  const { selectedFlatRows, data, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;
  const emptyItem = { id: '', club_name: '', club_type: '',contact_person:'',phone:'', address: '',  email: '' };
  const [selectedItem, setSelectedItem] = useState(emptyItem);
  const validationSchema = Yup.object().shape({
   
    club_name: Yup.string().required('Club Name is required'),
    club_type: Yup.string().required('Club Type is required'),
    contact_person: Yup.string().required('Contact Person is required'),
    phone: Yup.number().required('Phone number is required'),
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
      const fields = ['id', 'club_name', 'club_type','contact_person','phone', 'address',  'email'];
      fields.forEach((field) => {
        // console.log('selectedItem', selectedItem[field]);
        setFieldValue(field, selectedItem[field], false);
      });
      // values = selectedItem;
    }
  }, [selectedItem, selectedFlatRows]);

  const changeActive = (event) => {
    if (event.target.checked) {
      setSelectedItem({ ...selectedItem, club_type: event.target.value });
    }
  };

  return (
    <Modal className="modal-right" show={isOpenAddEditModal} onHide={() => setIsOpenAddEditModal(false)}>
      <Modal.Header>
        <Modal.Title>{selectedFlatRows.length === 1 ? 'Edit' : 'Add'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Control type="hidden" name="id" defaultValue={selectedItem ? selectedItem.id : ''} />
          <div className="mb-3">
            <Form.Label>Club Name</Form.Label>
            <Form.Control type="text" name="club_name" defaultValue={selectedItem ? selectedItem.club_name : values.club_name} onChange={handleChange} />
            {errors.club_name && touched.club_name && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.club_name}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Club Type</Form.Label>
            {/* <Form.Control type="text" name="club_type" defaultValue={selectedItem ? selectedItem.club_type : values.club_type} onChange={handleChange} /> */}
            <Row>
                            <Col md="4">
                            <Form.Check
                                type="radio"
                                label="Domestic"
                                value="D"
                                id="club_type0"
                                name="club_type"
                                // eslint-disable-next-line eqeqeq
                                checked={(values && values.club_type == 'D') || (selectedItem && selectedItem.club_type == 'D')}
                                onChange={(e) => {
                                  handleChange(e);
                                  changeActive(e);
                                }}
                              />
                              </Col>&nbsp;&nbsp;&nbsp;
                              <Col md="4">
                              <Form.Check
                                type="radio"
                                label="International"
                                value="I"
                                id="club_1type"
                                name="club_type"
                                // eslint-disable-next-line eqeqeq
                                checked={(values && values.club_type == "I") || (selectedItem && selectedItem.club_type == "I")}
                                onChange={(e) => {
                                  handleChange(e);
                                  changeActive(e);
                                }}
                              />
                            </Col>
                          
                          </Row>
            {errors.club_type && touched.club_type && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.club_type}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Contact Person</Form.Label>
            <Form.Control type="text" name="contact_person" defaultValue={selectedItem ? selectedItem.contact_person : values.contact_person} onChange={handleChange} />
            {errors.contact_person && touched.contact_person && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.contact_person}
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
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text"  name="phone" defaultValue={selectedItem ? selectedItem.phone : values.phone} onChange={handleChange} />
            {errors.phone && touched.phone && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.phone}
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

export default AffiliateclubAddEdit;
