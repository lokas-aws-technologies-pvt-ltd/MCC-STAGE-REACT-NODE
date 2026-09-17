/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-danger */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal, Container, Row, Col } from 'react-bootstrap';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { API_URL } from 'config.js';
import HtmlHead from 'components/html-head/HtmlHead';
import Layout from 'layout/Layout';
import { toast } from 'react-toastify';

// import Page from 'http://localhost:3000/magazine/index.html';

const Booking = () => {
  const title = 'Chamber Booking';
  const description = 'Chamber Booking';
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  console.log('location', window.location.origin);
  const { isLogin, currentUser } = useSelector((state) => state.auth);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [days, setdays] = useState('');

  useEffect(() => {
    // console.log('currentUser', currentUser);
    if (!currentUser.membercode) {
      history.push('/');
    } else if (currentUser.type !== 'U') {
      history.push('/InvalidAccess');
    }
  }, [currentUser, history]);
  const lastlogin = '';

  const validationSchema = Yup.object().shape({
    member_name: Yup.string().required('Member name is required'),
    member_id: Yup.string().required('Member ID is required'),
    email: Yup.string().email().required('Email is required'),
    phone: Yup.string().min(10, "Enter 10 digit number").required('Phone is required'),
    no_room: Yup.string().required('Number of rooms is required'),
    no_occupancy: Yup.string().required('Number of accupancy is required'),
    guest_name: Yup.string().required('Guest name is required'),
    nationality: Yup.string().required('Nationality is required'),
    no_days: Yup.string().required('Number of days is required'),
    id_proof: Yup.string().required('Is Proof is required'),
    checkindate: Yup.date().typeError('Invalid date').required('Check in date is required'),
    checkoutdate: Yup.date()
      .typeError('Invalid date')
      .when('checkindate', (checkindate) => {
        if (checkindate) {
          return Yup.date().min(checkindate, 'Check out date must be after check out date').typeError('Check out date is required');
        }
      })
      .required('End Date is required')
      .min(new Date(), 'End Date must be later than today'),

  });

  const emptyItem = {
    member_id: currentUser ? currentUser.membercode : '',
    member_name: currentUser ? currentUser.name : '',
    email: currentUser ? currentUser.email : '',
    phone: currentUser ? currentUser.mobile_no : '',
    no_room: '',
    no_occupancy: '',
    guest_name: '',
    nationality: '',
    id_proof: '',
    no_days: '',
    checkindate: '',
    checkoutdate: '',


  };
  const onSubmit = (values) => {
    console.log('submit form', values);

    const type = "Member";
    const clubname = "";
    const uploadConfig = {
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        //  	'Access-Control-Allow-Origin':'*', 
        //	'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    };

    const formData = new FormData();
    formData.append('club_name', clubname);
    formData.append('type', type);
    formData.append('created_by',currentUser.createdby);
    Object.keys(values).forEach((fieldName) => {
      // console.log(fieldName, item[fieldName]);
      formData.append(fieldName, values[fieldName]);
    });

    const response = axios.post(`${API_URL}chamber/chamber_book_add`, formData, uploadConfig);
    setTimeout(() => {
      toast.success('Chamber booking request created successfully', {
        position: 'top-right',
      });
      history.push('/member/chamber/myBooking');
      document.body.classList.remove('spinner');
    }, 1000);


  }

  const initialValues = emptyItem;
  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, setFieldValue, values, touched, errors } = formik;

  useEffect(() => {
   

    if (startDate != null && endDate != null) {
     const firstDate = new Date(startDate) // 10th May, 2022
     const secondDate = new Date(endDate) // today, 14th May, 2022
     
     const firstDateInMs = firstDate.getTime()
     const secondDateInMs = secondDate.getTime()
     
     const differenceBtwDates = secondDateInMs - firstDateInMs
     
     const aDayInMs = 24 * 60 * 60 * 1000
     
     const daysDiffs = Math.round(differenceBtwDates / aDayInMs)
     
     console.log(daysDiffs);
     setdays(daysDiffs+1);
     if(daysDiffs==0)
     setFieldValue('no_days', '1');
     else if(daysDiffs<0)
     setFieldValue('no_days', '');
     else
     setFieldValue('no_days', daysDiffs);
   }
   


 }, [startDate, endDate]);
  return (
    <>
      <HtmlHead title={title} description={description} />
      <Layout>
        <div className="page-title-container">
          <Row>
            <Col>
              {/* Title Start */}

              {/* Title End */}
              { }
              <img src="/assets/images/chambers.png" alt="" className="img-fluid" />
            </Col>
          </Row>

        </div>
        <div className="page-title">
          <Row>
            <Col>
              <h2>Chamber Booking</h2>
              <br />
            </Col>
          </Row>
        </div>
        <Form onSubmit={handleSubmit}>
          <Container fluid>
            <Row>

              <Col md="5">
                <div className="mb-3">
                  <Form.Label> Member Name:</Form.Label>
                  <Form.Control className="form-control" id="member_name" placeholder="Enter your name" name="member_name" value={currentUser.name} readOnly
                    onChange={handleChange} />
                </div>
              </Col>
              <Col md="5">
                <div className="mb-3">
                  <Form.Label>Member ID:</Form.Label>
                  <Form.Control className="form-control" id="member_id" placeholder="Enter your Member ID" name="member_id" value={currentUser.membercode} readOnly
                    onChange={handleChange} />
                </div>
              </Col>
              <Col md="5">
                <div className="mb-3">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control className="form-control" id="email" placeholder="Enter your Email" name="email" value={currentUser.email} readOnly onChange={handleChange} />
                </div>
              </Col>
              <Col md="5">
                <Form.Label>Phone Number:</Form.Label>
                <div className="mb-3">
                  <Form.Control className="form-control" id="phone" placeholder="Enter your Phone Number" name="phone" value={currentUser.mobile_no} readOnly onChange={handleChange} />
                </div>

              </Col>
              <Col md="5">
                <div className="mb-3">
                  <Form.Label>No of Rooms:</Form.Label>
                  <Form.Control className="form-control" id="no_room" placeholder="Enter numer of rooms" name="no_room" defaultValue={values.no_room}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }

                    }} onChange={handleChange} />
                  {errors.no_room && touched.no_room && (
                    <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                      {errors.no_room}
                    </div>
                  )}
                </div>
              </Col>
              <Col md="5">
                <div className="mb-3">
                  <Form.Label>Occupancy:</Form.Label>
                  <Form.Control className="form-control" id="no_occupancy" placeholder="Enter number of occupancy" name="no_occupancy" defaultValue={values.no_occupancy}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }

                    }} onChange={handleChange} />
                  {errors.no_occupancy && touched.no_occupancy && (
                    <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                      {errors.no_occupancy}
                    </div>
                  )}
                </div>
              </Col>
            </Row>




            <Row>
              <Col md="3">
                <div className="mb-3">
                  <Form.Label>Guest Name:</Form.Label>
                  <Form.Control type="text" className="form-control" id="guest_name" placeholder="Enter Guest name" name="guest_name" defaultValue={values.guest_name}
                    onChange={handleChange} />
                  {errors.guest_name && touched.guest_name && (
                    <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                      {errors.guest_name}
                    </div>
                  )}
                </div>
              </Col>
              <Col md="3">
                <div className="mb-3">
                  <Form.Label>Nationality:</Form.Label>
                  <Form.Control type="text" className="form-control" id="nationality" placeholder="Enter Guest nationality" name="nationality" defaultValue={values.nationality}
                    onChange={handleChange} />
                  {errors.nationality && touched.nationality && (
                    <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                      {errors.nationality}
                    </div>
                  )}
                </div>
              </Col>
              <Col md="3">
                <div className="mb-3">
                  <Form.Label>Guest ID Proof:</Form.Label>
                  <Form.Control
                    type="file"
                    name="id_proof"
                    defaultValue={values.id_proof}
                    // accept="application/pdf,application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    // defaultValue={selectedItem ? selectedItem.invitation_attachment : values.invitation_attachment}
                    //  onChange={handleChange}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldValue('idprooffile', e.currentTarget.files[0]);
                    }}
                  />
                  {errors.id_proof && touched.id_proof && (
                    <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                      {errors.id_proof}
                    </div>
                  )}
                </div>
              </Col>

            </Row>

            <br /><br />
            <p>Reservation Dates</p>
            <Row>

              <Col md="3">

                <div className="mb-3">

                  <Form.Label>Check In</Form.Label>
                  <DatePicker
                    className="form-control"
                    name="checkindate"
                    defaultValue={values.checkindate}
                    minDate={new Date()}
                    shouldCloseOnSelect
                    selected={startDate}
                    showTimeSelect
                    dateFormat="dd-MM-yyyy hh:mm aa"
                    onChange={(date) => {
                      setStartDate(date);
                      //  handleChange(date);
                      setFieldValue('checkindate', date);
                    }}
                  />
                  {errors.checkindate && touched.checkindate && (
                    <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                      {errors.checkindate}
                    </div>
                  )}
                </div>
              </Col>
              <Col md="3">

                <div className="mb-3">

                  <Form.Label>Check Out</Form.Label>
                  <DatePicker
                    className="form-control"
                    name="checkoutdate"
                    defaultValue={values.checkoutdate}
                    selected={endDate}
                    minDate={startDate}
                    shouldCloseOnSelect
                    onChange={(date) => {
                      setEndDate(date);
                      //  handleChange(date);
                      setFieldValue('checkoutdate', date);
                    }}

                    showTimeSelect
                    dateFormat="dd-MM-yyyy hh:mm aa"
                  />
                  {errors.checkoutdate && touched.checkoutdate && (
                    <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                      {errors.checkoutdate}
                    </div>
                  )}
                </div>
              </Col>
              <Col md="3">
                <div className="mb-3">

                  <Form.Label>No of Days:</Form.Label>

                  <Form.Control type="text" className="form-control" readOnly id="no_days" placeholder="" name="no_days" defaultValue={values.no_days}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }

                    }} onChange={handleChange} />
                  {errors.no_days && touched.no_days && (
                    <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                      {errors.no_days}
                    </div>
                  )}
                </div>
              </Col>



            </Row>
            {/* <button type="button" className="btn btn-primary main-btn" >Cancel</button> */}
            <button type="button" className="btn btn-primary main-btn" onClick={(e) => {

              history.push('/member/chamber/myBooking');
            }} >Cancel</button>&nbsp;&nbsp;
            <button type="submit" className="btn btn-primary main-btn">Submit</button>
          </Container>
          <br /> <br /> <br />
        </Form>
      </Layout>
    </>


  );
};

export default Booking;
