/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { SERVICE_URL, API_URL } from 'config.js';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const MemberAddEdit = ({ tableInstance, addItem, editItem }) => {
  const { selectedFlatRows, data, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;
  const emptyItem = { id: '', member_code: '', first_name: '', last_name: '', sex: '', email: '', mobile_no: '', doj: '', postal_address: '' };
  const [selectedItem, setSelectedItem] = useState(emptyItem);
  const validationSchema = Yup.object().shape({
    member_code: Yup.string()
      .required('Member Code is required')
      .test(
        'Unique Member Code',
        'Member Code already in use', // <- key, message
        function (value) {
          return new Promise((resolve, reject) => {
            axios
              .get(`${API_URL}user/check_member_code_unique`, { params: { member_code: value, memberid: selectedItem.id } })
              .then((res) => {
                // console.log('res', res.data.success);
                if (res.data.success  == '0') {
                  resolve(true);
                } else {
                  resolve(false);
                }
              })
              .catch((error) => {
                // if (error.response.data.content === 'The email has already been taken.') {
                  resolve(false);
                // }
              });
          });
        }
      ),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    sex: Yup.string().required('Sex is required'),
    email: Yup.string()
      .required('Email Id is required')
      .email('Enter Valid Email')
      .test(
        'Unique Email',
        'Email already in use', // <- key, message
        function (value) {
          return new Promise((resolve, reject) => {
            axios
              .get(`${API_URL}user/check_member_email_unique`, { params: { email: value, memberid: selectedItem.id } })
              .then((res) => {
                if (res.data.success == '0') {
                  resolve(true);
                } else {
                  resolve(false);
                }
              })
              .catch((error) => {
                // if (error.response.data.content === 'The email has already been taken.') {
                  resolve(false);
               //  }
              });
          });
        }
      ),
    mobile_no: Yup.number().required('mobile_no Number is required'),
    doj: Yup.date('Enter Valid Date').required('Date of Join is required'),
    postal_address: Yup.string().required('Address is Required'),
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
      const fields = ['id', 'member_code', 'first_name', 'last_name', 'sex', 'email', 'mobile_no', 'doj', 'postal_address'];
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
          <Form.Control type="hidden" name="id" defaultValue={selectedItem ? selectedItem.id : ''} />
          <div className="mb-3">
            <Form.Label>Member Code</Form.Label>
            <Form.Control type="text" name="member_code" defaultValue={selectedItem ? selectedItem.member_code : values.member_code} onChange={handleChange} />
            {errors.member_code && touched.member_code && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.member_code}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="first_name" defaultValue={selectedItem ? selectedItem.first_name : values.first_name} onChange={handleChange} />
            {errors.first_name && touched.first_name && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.first_name}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="last_name" defaultValue={selectedItem ? selectedItem.last_name : values.last_name} onChange={handleChange} />
            {errors.last_name && touched.last_name && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.last_name}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Sex</Form.Label>
            <Form.Check
              type="radio"
              label="Male"
              value="M"
              id="categoryRadio1"
              name="sex"
              checked={(values && values.sex === 'M') || (selectedItem && selectedItem.sex === 'M')}
              onChange={(e) => {
                handleChange(e);
                changeCategory(e);
              }}
            />
            <Form.Check
              type="radio"
              label="Female"
              value="F"
              id="categoryRadio2"
              name="sex"
              checked={(values && values.sex === 'F') || (selectedItem && selectedItem.sex === 'F')}
              onChange={(e) => {
                handleChange(e);
                changeCategory(e);
              }}
            />
            {errors.sex && touched.sex && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.sex}
              </div>
            )}
          </div>

          <div className="mb-3">
            <Form.Label>Date Of Join</Form.Label>
            <Form.Control type="date" name="doj" defaultValue={selectedItem ? selectedItem.doj : values.doj} onChange={handleChange} />
            {errors.doj && touched.doj && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.doj}
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
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control type="number" name="mobile_no" defaultValue={selectedItem ? selectedItem.mobile_no : values.mobilenumber} onChange={handleChange} />
            {errors.mobile_no && touched.mobile_no && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.mobile_no}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              name="postal_address"
              defaultValue={selectedItem ? selectedItem.postal_address : values.postal_address}
              onChange={handleChange}
            />
            {errors.postal_address && touched.postal_address && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.postal_address}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Button variant="outline-primary" onClick={() => setIsOpenAddEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {selectedFlatRows.length === 1 ? 'Done' : 'Add'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
};

export default MemberAddEdit;
