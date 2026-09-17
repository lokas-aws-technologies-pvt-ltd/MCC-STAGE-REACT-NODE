/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Modal, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const GiveFeedBack = ({ foodOrders, feedback, selectedFoodOrder, isOpenGiveFeedBackModal, setIsOpenGiveFeedBackModal }) => {
  // const el = foodOrders.findIndex((obj) => obj.id === selectedFoodOrder);
 // console.log('foodOrders', foodOrders.result);
  // const currentOrder = foodOrders[el];
// const currentOrder = foodOrders.result;
  const { isLogin, currentUser } = useSelector((state) => state.auth);
  const emptyItem = {
    order_id: '',
    member_code: '',
    foodorder_name: '',
    feedback_cat:'f&b Bar',
    feedback_message: '',
    member_name:'',
    member_email:'',
    member_phone:'',
  }; 
  const [selectedItem, setSelectedItem] = useState(emptyItem);

  const validationSchema = Yup.object().shape({
    feedback_message: Yup.string().required('Feed Back is required'),
  });

  const onSubmit = (values, { resetForm }) => {
    // console.log('submit form', values);
    feedback({ evnitem: values });
    resetForm({ values: '' });
    setIsOpenGiveFeedBackModal(false);
  };

  // console.log(selectedItem);
  const initialValues = selectedItem;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const { handleSubmit, handleChange, setFieldValue, values, touched, errors } = formik;
  useEffect(() => {
    if (selectedFoodOrder) {
       // console.log('currentOrder', currentOrder);
      setFieldValue('order_id', selectedFoodOrder, false);
      setFieldValue('member_code', currentUser.membercode, false);
      setFieldValue('foodorder_name', 'f&b Bar', false);
      setFieldValue('member_name', currentUser.name, false);
      setFieldValue('member_email', currentUser.email, false);
      setFieldValue('member_phone', currentUser.mobile_no, false);
    }
  }, [selectedFoodOrder, currentUser, setFieldValue]);
  

  return (
    <Modal
      className="modal-centered"
      size="xl"
      backdrop="static"
      keyboard={false}
      show={isOpenGiveFeedBackModal}
      onHide={() => setIsOpenGiveFeedBackModal(false)}
    >
      <Modal.Header>
        <Modal.Title>Feed Back of F&B Bar Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Container fluid>
            {selectedFoodOrder  ? (
              <Row>
                <Col md="12">
                  <Form.Label>Feed Back Message</Form.Label>
                </Col>
                <Col md="6">
                  <div className="mb-3">
                    
                    <Form.Control
                      type="text"
                      name="feedback_message"
                      as="textarea"
                      defaultValue={selectedItem ? selectedItem.feedback_message : values.feedback_message}
                      onChange={handleChange}
                    />
                    {errors.feedback_message && touched.feedback_message && (
                      <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                        {errors.feedback_message}
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            ) : (
              ' '
            )}
            <Row>
              <div className="mb-3">
                <Button variant="outline-primary" onClick={() => { formik.resetForm({ values: ''}); setIsOpenGiveFeedBackModal(false)}}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Send
                </Button>
              </div>
            </Row>
          </Container>
        </Form>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
};

export default GiveFeedBack;