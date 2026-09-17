/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Modal, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { eventFilePath } from 'constants.js';
import ReactPlayer from 'react-player/lazy'

const Highlights = ({ eventItems, feedback, selectedEvent, isOpenHighlightsModal, setIsOpenHighlightsModal }) => {
  const el = eventItems.findIndex((obj) => obj.id === selectedEvent);
  const currentEvent = eventItems[el];
  const { isLogin, currentUser } = useSelector((state) => state.auth);
  const emptyItem = {
    id: '',
    event_image: '',
    event_name: '',
    event_description: '',
    event_category: '',
    event_date_from: '',
    event_date_to: '',
    event_status: 1,
    venue: '',
    parentCat: '2',
    is_guest_allowed: 'N',
    is_dependent_allowed: 'N',
    is_member_charged: 'N',
    food_served: 'N',
    buffet_total: '',
    buffet_vprice: '',
    buffet_nvprice: '',
    is_dependent_charged: 'N',
    price_for_dependent: '',
    total_guest_tickets: '',
    ticket_price_per_guest: '',
    price_for_member: '',
    ticket_per_member: '',
    invitation_attachment: '',
    tournament_type: 'T',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    gvideopath: '',
    highdesc: '',
  };
  
  const [selectedItem, setSelectedItem] = useState(emptyItem);

  

  const onSubmit = (values, { resetForm }) => {
    // console.log('submit form', values);
    feedback({ evnitem: values });
    resetForm({ values: '' });
    setIsOpenHighlightsModal(false);
  };

  // console.log(selectedItem);
  const initialValues = selectedItem;

  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit,
  });
  const { handleSubmit, handleChange, setFieldValue, values, touched, errors } = formik;
  useEffect(() => {
    if (currentEvent) {
      console.log('currentUser', currentUser);
      setFieldValue('event_id', currentEvent.id, false);
      setFieldValue('image1', currentUser.image1, false);
      setFieldValue('image2', currentEvent.image2, false);
      setFieldValue('image3', currentUser.image3, false);
      setFieldValue('image4', currentUser.image4, false);
      setFieldValue('gvideopath', currentUser.gvideopath, false);
    }
  }, [currentEvent, currentUser, setFieldValue]);
  

  return (
    <Modal
      className="modal-centered"
      size="xl"
      backdrop="static"
      keyboard={false}
      show={isOpenHighlightsModal}
      onHide={() => setIsOpenHighlightsModal(false)}
    >
      <Modal.Header>
        <Modal.Title>Highlights of Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {currentEvent && (
      <div className="container main-header">
    	<div className="row justify-content-between event-info">
        	<div className="col-md-9 col-lg-9">
                {/* <img src="https://lokas.org//mcc/images/ban.jpg" alt="Event-image" width="250px" /> */}
                {currentEvent && currentEvent.event_image != '' ? (
                              <img src={`${eventFilePath}${currentEvent.event_image}`} alt="" width="100%" />
                            ) : (
                              <img src="/assets/images/Billiards/bill-banner.png" alt="" width="100%" />
                            )}
            </div>       

            <div className="col-lg-9 col-md-9">
            <br/><br/>
        <h2>{currentEvent.event_name}</h2>
				{/* <h5>Date: {currentEvent.event_date_from}</h5> */}
        <h5>Date: {new Date(currentEvent.event_date_from).toLocaleString('default', { day: '2-digit', month: 'short' }).toLocaleUpperCase()}{'  '}
        <span>
        {new Date(currentEvent.event_date_from)
                                  .toLocaleString('default', { date: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })
                                  .toLocaleUpperCase()}{' '}
                              </span></h5>
				<h5>Venue: {currentEvent.venue}</h5> 
            </div>
		</div>
       
		<div className="container">
			<p className="event-desc">{currentEvent.highdesc}</p>
		</div>
    </div>)}
    {currentEvent && (
    <div className="main" id="main">
        <div className="container">
            <div className="sec-title">
                <h2>Event Pictures</h2>
                <br/>
            </div>
            <div className="row mb-20">
                <div className="col-md-4">
					<img src={`${eventFilePath}${currentEvent.image1}`} alt="" style={{objectFit:'cover' }} width="100%" />
                </div>
				<div className="col-md-4">
					<img src={`${eventFilePath}${currentEvent.image2}`} alt="" style={{objectFit:'cover' }} width="100%"  />
                </div>
				<div className="col-md-4">
					<img src={`${eventFilePath}${currentEvent.image3}`} alt="" style={{objectFit:'cover' }} width="100%" />
                </div>
            </div>
            
			<div className="row mb-20">
                <div className="col-md-4 ">
					<img src={`${eventFilePath}${currentEvent.image4}`} alt="" style={{objectFit:'cover' }} width="100%"/>
                </div>
				<div className="col-md-4 ">
                <img src={`${eventFilePath}${currentEvent.image5}`} alt="" style={{objectFit:'cover' }} width="100%"/>
                </div>
				<div className="col-md-4 ">
                <img src={`${eventFilePath}${currentEvent.image6}`} alt="" style={{objectFit:'cover' }} width="100%"/>
                </div>
            </div>
        </div>
<br/><br/>
        <div className="container ">
        {/* <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' /> */}
        {/* <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' light={<a href="https://www.youtube.com/watch?v=ysz5S6PUM-U"><img src='https://lokas.org//mcc/images/play.png' alt='Thumbnail' />Watch Video</a>} /> */}
			<a href={currentEvent.gvideopath} target="_blank" rel="noreferrer" className="event-v"><img src="https://lokas.org//mcc/images/play.png" alt="btn" width="58"/>  Watch Video</a>
        </div>
        <br/>
        <Row>
                <div className="mb-3">
                  <Button variant="outline-primary" onClick={() => setIsOpenHighlightsModal(false)}>
                    Close
                  </Button>
                  
                </div>
              </Row>
    </div>
    )}

      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
};

export default Highlights;
