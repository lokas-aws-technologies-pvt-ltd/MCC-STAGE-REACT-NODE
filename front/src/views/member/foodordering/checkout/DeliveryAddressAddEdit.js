/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const DeliveryAddressAddEdit = ({ currentAdress, addItem, editItem, staticBackdropExample, setStaticBackdropExample }) => {
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    phone: Yup.number().required('Phone No is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    zipcode: Yup.number().required('Pincode is required'),
    address: Yup.string().required('Address is required'),
  });
  const currentAdresses = currentAdress;
  const optionsState = [{ value: 'Tamil Nadu', label: 'Tamil Nadu' }];
  const [selectValueState, setSelectValueState] = useState({ value: 'Tamil Nadu', label: 'Tamil Nadu' });
  const optionsCity = [{ value: 'Chennai', label: 'Chennai' }];
  const [selectValueCity, setSelectValueCity] = useState({ value: 'Chennai', label: 'Chennai' });
  const initialValues = {
    id: 0,
    first_name: '',
    last_name: '',
    phone: '',
    state: 'Tamil Nadu',
    city: 'Chennai',
    zipcode: '',
    address: '',
  };
  const onSubmit = (values, { resetForm }) => {
    console.log('values', values);
    if(currentAdresses==''){
        addItem({ item: values });
    }else{
        editItem({ item: values });
    } 
    resetForm();
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const { handleSubmit, handleChange, setFieldValue, values, touched, errors } = formik;
  
  useEffect(() => {
     
      // get user and set form fields
      const fields = ['id', 'first_name', 'last_name', 'address', 'member_code', 'phone', 'state', 'city', 'zipcode'];
      if (Object.keys(currentAdresses).length>0) {
      fields.forEach((field) => {
        // console.log('selectedItem', selectedItem[field]);
        setFieldValue(field, currentAdresses[field], false);
      });
      // values = selectedItem;
   }else{
    fields.forEach((field) => {
      // console.log('selectedItem', selectedItem[field]);
      setFieldValue(field, initialValues[field], false);
    });
   }
  }, [currentAdresses]);
  // console.log('currentAdresses', currentAdresses);
  return (
    <Modal backdrop="static" keyboard={false} show={staticBackdropExample} onHide={() => setStaticBackdropExample(false)}>
      <Modal.Header closeButton>
        <Modal.Title id="staticBackdropLabel">{currentAdresses==''?'Add':'Edit'} Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="g-3">
          <Col lg="6">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="first_name" value={values.first_name} onChange={handleChange} />
            {errors.first_name && touched.first_name && (
              <div style={{ position: 'inherit', transform: 'initial' }} className="d-block invalid-tooltip">
                {errors.first_name}
              </div>
            )}
          </Col>
          <Col lg="6">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="last_name" value={values.last_name} onChange={handleChange} />
            {errors.last_name && touched.last_name && (
              <div style={{ position: 'inherit', transform: 'initial' }} className="d-block invalid-tooltip">
                {errors.last_name}
              </div>
            )}
          </Col>
          <Col lg="6">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" name="phone" value={values.phone} onChange={handleChange} />
            {errors.phone && touched.phone && (
              <div style={{ position: 'inherit', transform: 'initial' }} className="d-block invalid-tooltip">
                {errors.phone}
              </div>
            )}
          </Col>
          <Col lg="6">
            <Form.Label>State</Form.Label>
            <Select name="state" classNameprefix="react-select" options={optionsState} value={selectValueState} onChange={setSelectValueState} placeholder="" />
            {errors.state && touched.state && (
              <div style={{ position: 'inherit', transform: 'initial' }} className="d-block invalid-tooltip">
                {errors.state}
              </div>
            )}
          </Col>
          <Col lg="6">
            <Form.Label>City</Form.Label>
            <Select name="city" classNameprefix="react-select" options={optionsCity} value={selectValueCity} onChange={setSelectValueCity} placeholder="" />
            {errors.city && touched.city && (
              <div style={{ position: 'inherit', transform: 'initial' }} className="d-block invalid-tooltip">
                {errors.city}
              </div>
            )}
          </Col>
          <Col lg="6">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control name="zipcode" type="text" value={values.zipcode} onChange={handleChange} />
            {errors.zipcode && touched.zipcode && (
              <div style={{ position: 'inherit', transform: 'initial' }} className="d-block invalid-tooltip">
                {errors.zipcode}
              </div>
            )}
          </Col>
          <Col lg="12">
            <Form.Label>Address</Form.Label>
            <Form.Control name="address" as="textarea" rows={3} value={values.address} onChange={handleChange} />
            {errors.address && touched.address && (
              <div style={{ position: 'inherit', transform: 'initial' }} className="d-block invalid-tooltip">
                {errors.address}
              </div>
            )}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setStaticBackdropExample(false)}>
          Close
        </Button>
        <Button onClick={handleSubmit}>{currentAdresses==''?'Add':'Edit'}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeliveryAddressAddEdit;
