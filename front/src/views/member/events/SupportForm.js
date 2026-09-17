/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal, Container, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SupportForm = ({ eventItems, supportEvent, selectedEvent, isOpenSupportFormModal, setIsOpenSupportFormModal }) => {
  const el = eventItems.findIndex((obj) => obj.id === selectedEvent);
  const currentEvent = eventItems[el];
  const { isLogin, currentUser } = useSelector((state) => state.auth);
  const emptyItem = {
    event_id: '',
    member_code: '',
    member_name:'',
    member_email:'',
    member_phone:'',
    event_name: '',
    support_cat: '',
    support_message: '',
  };

  const [selectedItem, setSelectedItem] = useState(emptyItem);
  const validationSchema = Yup.object().shape({
    support_message: Yup.string().required('Support Message is required'),
    // support_cat: Yup.string().required('Event Description is required'),
  });

  const onSubmit = (values, { resetForm }) => {
    // console.log('submit form', values);
    supportEvent({ evnitem: values });
    resetForm({ values: '' });
    setIsOpenSupportFormModal(false);
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
    if (currentEvent) {
      console.log('currentUser', currentUser);
      setFieldValue('event_id', currentEvent.id, false);
      setFieldValue('member_code', currentUser.membercode, false);
      setFieldValue('event_name', currentEvent.event_name, false);
      setFieldValue('member_name', currentUser.name, false);
      setFieldValue('member_email', currentUser.email, false);
      setFieldValue('member_phone', currentUser.mobile_no, false);
    }
  }, [currentEvent, currentUser, setFieldValue]);



  // console.log('startDate', startDate);
  return (
    <Modal
      className="modal-centered"
      size="xl"
      backdrop="static"
      keyboard={false}
      show={isOpenSupportFormModal}
      onHide={() => setIsOpenSupportFormModal(false)}
    >
      <Modal.Header>
        <Modal.Title>
          {'Support for Event '}
          {currentEvent ? currentEvent.event_name : ''}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Container fluid>
            {currentEvent ? (
              <Row>
                <Col md="12">
                  <Form.Label>Your Message / Concern</Form.Label>
                </Col>
                <Col md="6">
                  <div className="mb-3">
                    <Form.Control
                      type="text"
                      name="support_message"
                      as="textarea"
                      defaultValue={selectedItem ? selectedItem.support_message : values.support_message}
                      onChange={handleChange}
                    />
                    {errors.support_message && touched.support_message && (
                      <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                        {errors.support_message}
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
                <Button variant="outline-primary" onClick={() => setIsOpenSupportFormModal(false)}>
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

export default SupportForm;
