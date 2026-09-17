/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-loop-func */
/* eslint-disable func-names */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable no-cond-assign */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Col, Form, Row, NavLink, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import axios from 'axios';
import HtmlHead from 'components/html-head/HtmlHead';
import Layout from 'layout/Layout';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { SERVICE_URL, API_URL } from 'config.js';
import { eventFilePath } from 'constants.js';
import Select from 'react-select';
import { toast } from 'react-toastify';
import BookSeat from './BookSeat';
import GiveFeedBack from './GiveFeedBack';
import SupportForm from './SupportForm';
import Highlights from './highlights'

const EventsList = () => {
  const title = 'Events List';
  const description = 'Events List Page';
  const { isLogin, currentUser } = useSelector((state) => state.auth);
  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: '', text: 'Events' },
    { to: '', text: 'Events List' },
  ];

  const [data, setData] = useState([]);
  const [allCat, setAllCat] = useState([]);
  const [catData, setCatData] = useState([]);
  const [selectedCatId, setSelectedCatId] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');

  const current = new Date();
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const getGivenMonth = (monthVal, diffVal, subtract) => {
    const makeDate = new Date(monthVal);

    if (subtract) {
      makeDate.setMonth(makeDate.getMonth() - diffVal);
    }
    if (!subtract) {
      makeDate.setMonth(makeDate.getMonth() + diffVal);
    }
    const monReturn = `${month[makeDate.getMonth()]} - ${makeDate.getFullYear()}`;
    // console.log('After subtracting a month: ', monReturn);
    return monReturn;
  };

  const options = [
    { value: getGivenMonth(current, 3, true), label: getGivenMonth(current, 3, true) },
    { value: getGivenMonth(current, 2, true), label: getGivenMonth(current, 2, true) },
    { value: getGivenMonth(current, 1, true), label: getGivenMonth(current, 1, true) },
    { value: getGivenMonth(current, 0, false), label: getGivenMonth(current, 0, false) },
    { value: getGivenMonth(current, 1, false), label: getGivenMonth(current, 1, false) },
    { value: getGivenMonth(current, 2, false), label: getGivenMonth(current, 2, false) },
    { value: getGivenMonth(current, 3, false), label: getGivenMonth(current, 3, false) },
  ];
  const [monthSelected, setMonthSelected] = useState(getGivenMonth(current, 0, false));
  const [isOpenBookSeatModal, setIsOpenBookSeatModal] = useState(false);
  const [isOpenSupportFormModal, setIsOpenSupportFormModal] = useState(false);
  const [isOpenGiveFeedBackModal, setIsOpenGiveFeedBackModal] = useState(false);
  const [isOpenHighlightsModal, setIsOpenHighlightsModal] = useState(false);
  const fetchCategoryData = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}events/category_get`);

    setTimeout(() => {
      const { result } = response.data;
      // let catloop = [];
      setAllCat(result);
      const catloop = result.reduce(function (r, o) {
        const k = o.parent_id; // unique `loc` key

        if (r[k] || (r[k] = [])) r[k].push(o);
        return r;
      }, {});

      // console.log('catloop', catloop);
      setCatData(catloop);
      document.body.classList.remove('spinner');
    }, 1000);
  }, []);
  useEffect(() => {
    fetchCategoryData();
  }, []);
  const selectCat = (e, id) => {
    e.preventDefault();
    setSelectedCatId(id);
    console.log('selectedId', id);
  };
  const fetchData = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}events/get_events`, { params: { selectedCatId, monthSelected,sortBy: [{ id: 'event_date_from', desc: true }] } });

    setTimeout(() => {
      // const { items, pageCount: pCount } = response.data;
      // console.log('memberdata', response.data.result);
      setData(response.data.result);
      // setPageCount(response.data.pageCount);
      document.body.classList.remove('spinner');
    }, 1000);
  }, [selectedCatId, monthSelected]);
  useEffect(() => {
    fetchData();
  }, [fetchData, selectedCatId, monthSelected]);
  // console.log('datalen', data.length);

  const bookEvent = React.useCallback(async ({ evnitem }) => {
    console.log('additem', evnitem);
    document.body.classList.add('spinner');
    const response = await axios.post(`${API_URL}events/add_event_rsvp`, evnitem);
    setTimeout(() => {
      toast.success('Event Booked Successfully', {
        position: 'top-right',
      });

      fetchData();
      document.body.classList.remove('spinner');
    }, 1000);
  });
  const handleSearchInputChange = (selectedOptionObj) => {
    setMonthSelected(selectedOptionObj.value);
    // console.log("selectedOptionObj", selectedOptionObj);
  };
  const supportEvent = React.useCallback(async ({ evnitem }) => {
    // console.log('additem', item);
    document.body.classList.add('spinner');
    const response = await axios.post(`${API_URL}events/support_event`, evnitem);
    setTimeout(() => {
      toast.success('Support Mail Sent Successfully. Admin will contact you.', {
        position: 'top-right',
      });
      fetchData();
      document.body.classList.remove('spinner');
    }, 1000);
  });
  const feedback = React.useCallback(async ({ evnitem }) => {
    // console.log('additem', item);
    document.body.classList.add('spinner');
    const response = await axios.post(`${API_URL}events/feedback`, evnitem);
    setTimeout(() => {
      toast.success('Thanks for your valuable feedback', {
        position: 'top-right',
      });
      fetchData();
      document.body.classList.remove('spinner');
    }, 1000);
  });

  return (
    <>
      <HtmlHead title={title} description={description} />
      <Layout>
        <Row>
          <Col>
            {/* Title Start */}

            {/* Title End */}
            {}
            <img src="/assets/images/event-p-banner.png" alt="" className="img-fluid" />
          </Col>
        </Row>
        <section className="main-wrap event-wrap p-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3" hidden="hidden">
                <div className="event-lft">
                  {Object.keys(catData).length > 0
                    ? // let menus = '';
                      catData[0].map(function (itemData, ite) {
                        // console.log('childdaata', catData[itemData.id]);
                        return (
                          <>
                            <h4 key={`h4${ite}`}>{itemData.cat_name}</h4>
                            <ul className="event-lft-nav" key={`ul${ite}`}>
                              {catData[itemData.id] && Object.keys(catData[itemData.id]).length > 0
                                ? catData[itemData.id].map(function (Items) {
                                    // console.log(Items);
                                    return (
                                      <li key={Items.id}>
                                        <a
                                          href="#"
                                          id={Items.id}
                                          onClick={(e) => {
                                            selectCat(e, Items.id);
                                          }}
                                        >
                                          {Items.cat_name}
                                        </a>
                                      </li>
                                    );
                                  })
                                : ''}
                            </ul>
                          </>
                        );
                      })
                    : ''}
                </div>
              </div>
              <div className="col-lg-9 event-right">
                <Row>
                  <Col>
                    Events For{'  '} &nbsp;&nbsp; 
                    <Select
                      className="nodesigndropdown"
                      classNamePrefix="react-select "
                      options={options}
                      value={monthSelected}
                      onChange={handleSearchInputChange}
                      placeholder={monthSelected}
                    />
                  </Col>
                </Row>
                {data.length > 0
                  ? data.map(function (events, el) {
                      // console.log(events);
                      const eventMonth = new Date(events.event_date_from);
                      const eventEndDate = new Date(events.event_date_to);
                      return (
                        <div className="row" key={`eventl${events.id}`}>
                          <div className="col-lg-2">
                            <h2>
                              {eventMonth.toLocaleString('default', { day: '2-digit', month: 'short' }).toLocaleUpperCase()}{' '}
                              {/* <span>{eventMonth.getFullYear()}</span> */}
                            </h2>
                            <h2>
                              <span>
                                {eventMonth
                                  .toLocaleString('default', { date: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })
                                  .toLocaleUpperCase()}{' '}
                              </span>
                            </h2>
                          </div>
                          <div className="col-lg-10">
                            {events.event_image != '' ? (
                              <img src={`${eventFilePath}${events.event_image}`} alt="" />
                            ) : (
                              <img src="/assets/images/Billiards/bill-banner.png" alt="" />
                            )}
                            <h4>{events.event_name}</h4>
                            <p>{events.event_description}</p>
                            <h6>Venue : {events.venue}</h6>
                            <p>
                            Download Event Circular :
                              {events.invitation_attachment != '' ? (
                                <>
                                  <a href={`${eventFilePath}${events.invitation_attachment}`} target="_blank" rel="noreferrer" >
                                  <img src="/assets/images/invitedownload.jpeg" alt="" style={{ width: '48px', height: '48px' }} />
                                    {/* <img src="/assets/images/invitedownload.jpeg" alt="" style={{ width: '48px', height: '48px',float: 'right' }} /> */}
                                    <br />
                                     {/*
                                    <b>{events.invitation_attachment.toLocaleUpperCase()} </b> */}
                                  </a>
                                </>
                              ) : (
                                ''
                              )}
                            </p>
                            <Row className="nobroder">
                              {events.event_status == 2 || current.getTime() >= eventEndDate.getTime() ? (
                                // events.event_status == 2 ? (
                                  <>

                               {events.highdesc.length>0 ? (
                                <Col md="6">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedEvent(events.id);
                                      setIsOpenHighlightsModal(true);
                                    }}
                                    className="btn btn-lg  btn-secondary event-support"
                                  >
                                    Highlights
                                  </button>
                                </Col>):<></>}
                                <Col md="6">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedEvent(events.id);
                                      setIsOpenGiveFeedBackModal(true);
                                    }}
                                    className="btn btn-lg  btn-secondary event-support"
                                  >
                                    Give Feed Back
                                  </button>
                                </Col>
                               
                                </>
                              ) : (
                                <>
                                  <Col md="6">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setSelectedEvent(events.id);
                                        setIsOpenBookSeatModal(true);
                                      }}
                                      className="btn btn-primary btn-lg book-seat"
                                    >
                                      Event Reservation
                                    </button>
                                  </Col>
                                  <Col md="6">
                                    <button
                                      type="button"
                                      className="btn btn-lg  btn-secondary event-support"
                                      onClick={() => {
                                        setSelectedEvent(events.id);
                                        setIsOpenSupportFormModal(true);
                                      }}
                                    >
                                      Support
                                    </button>
                                  </Col>
                                </>
                              )}
                            </Row>
                          </div>
                        </div>
                      );
                    })
                  : ''}
              </div>
            </div>
          </div>
        </section>
        <BookSeat
          eventItems={data}
          bookEvent={bookEvent}
          catData={allCat}
          selectedEvent={selectedEvent}
          isOpenBookSeatModal={isOpenBookSeatModal}
          setIsOpenBookSeatModal={setIsOpenBookSeatModal}
        />
        <SupportForm
          eventItems={data}
          supportEvent={supportEvent}
          selectedEvent={selectedEvent}
          isOpenSupportFormModal={isOpenSupportFormModal}
          setIsOpenSupportFormModal={setIsOpenSupportFormModal}
        />
        <GiveFeedBack
          eventItems={data}
          feedback={feedback}
          selectedEvent={selectedEvent}
          isOpenGiveFeedBackModal={isOpenGiveFeedBackModal}
          setIsOpenGiveFeedBackModal={setIsOpenGiveFeedBackModal}
        />
        
        <Highlights
          eventItems={data}
          Highlights={Highlights}
          selectedEvent={selectedEvent}
          isOpenHighlightsModal={isOpenHighlightsModal}
          setIsOpenHighlightsModal={setIsOpenHighlightsModal}
        />
        <Row />
        <br />
        <br />
        <Row style={{ marginBottom: '10%' }}>
          <Col xs="12" />
        </Row>
      </Layout>
    </>
  );
};

export default EventsList;
