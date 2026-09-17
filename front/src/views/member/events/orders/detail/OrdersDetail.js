/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Card, Table } from 'react-bootstrap';
import { catImageLivePath, itemImageLivePath } from 'constants.js';
import moment from 'moment';
import axios from 'axios';
import { SERVICE_URL, API_URL } from 'config.js';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { toast } from 'react-toastify';
import GiveFeedBack from './GiveFeedBack';
import Layout from '../../../../../layout/Layout';

const OrdersDetail = () => {
  const title = 'Event Booking Detail';
  const description = 'Event Booking Detail';
  // const[parentCatId, setParentCatId] = useState('');
  const [data, setData] = useState([]);
  const [guestData, setGuestData] = useState([]);
  const [eventDetail, setEventDetail] = useState([]);
  const [dependentData, setDependentData] = useState([]);
  const { id } = useParams();
  const [isOpenGiveFeedBackModal, setIsOpenGiveFeedBackModal] = useState(false);

  const fetchGuestData = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}events/rsvp_guest_detail`, { params: { orderId: id } });
    // console.log(response.data);
    setTimeout(() => {
      const { result } = response.data;
      setGuestData(result);

      document.body.classList.remove('spinner');
    }, 1000);
  }, [id]);
  const fetchDependentsData = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}events/rsvp_dependent_detail`, { params: { orderId: id } });
    // console.log(response.data);
    setTimeout(() => {
      const { result } = response.data;
      setDependentData(result);

      document.body.classList.remove('spinner');
    }, 1000);
  }, [id]);
  const fetchEventRsvpDetailData = React.useCallback(
    async (parentCatId) => {
      document.body.classList.add('spinner');
      const response = await axios.get(`${API_URL}events/rsvp_detail_data`, { params: { orderId: id, parentCat: parentCatId } });
      // console.log(response.data);
      setTimeout(() => {
        const { result } = response.data;
        // console.log('detailResult', result);
        setEventDetail(result);
        if (parentCatId == '1' && result[0].is_dependent_attending == 'Y') {
          fetchDependentsData();
        }
        if (parentCatId == '2' && result[0].is_dependent_coming == 'Y') {
          fetchDependentsData();
        }
        if (parentCatId == '2' && result[0].is_guest_coming == 'Y') {
          fetchGuestData();
        }
        document.body.classList.remove('spinner');
      }, 1000);
    },
    [fetchDependentsData, fetchGuestData, id]
  );

  const fetchData = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}events/rsvp_detail`, { params: { orderId: id } });

    setTimeout(() => {
      const { result } = response.data;
      // console.log(response.data);
      setData(response.data);
      if (result[0].parent_cat != '') {
        fetchEventRsvpDetailData(result[0].parent_cat);
      }
      document.body.classList.remove('spinner');
    }, 1000);
  }, [id, fetchEventRsvpDetailData]);

  useEffect(() => {
    fetchData();
  }, []);
  const feedback = React.useCallback(async ({ evnitem }) => {
    // console.log('additem', item);
    document.body.classList.add('spinner');
    const response = await axios.post(`${API_URL}events/orderfeedback`, evnitem);
    setTimeout(() => {
      toast.success('Thanks for your valuable feedback', {
        position: 'top-right',
      });
      fetchData();
      document.body.classList.remove('spinner');
    }, 1000);
  });
  // console.log('eventDetail', eventDetail);
  return (
    <>
      <HtmlHead title={title} description={description} />
      <Layout>
        <div className="page-title-container">
          <Row className="g-0">
            {/* Title Start */}
            <Col className="col-auto mb-3 mb-sm-0 me-auto">
              <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/member/events/orders/list">
                <CsLineIcons icon="chevron-left" size="13" />
                <span className="align-middle text-small ms-1">Bookings</span>
              </NavLink>
              <h1 className="mb-0 pb-0 display-4" id="title">
                {title}{' '}
                <span>
                  {' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpenGiveFeedBackModal(true);
                    }}
                    className="btn  btn-secondary"
                    style={{ float: 'right' }}
                  >
                    Give Feed Back
                  </button>
                </span>
              </h1>
            </Col>
            {/* Title End */}
          </Row>
        </div>

        <Row>
          <Col xl="8" xxl="9">
            {/* Status Start */}
            <Row className="g-2 mb-5">
              <Col sm="6">
                {/* Event Detail Start */}
                <h2 className="small-title">Event Details</h2>
                <Card className="mb-5">
                  <Card.Body className="mb-n5">
                    <div className="mb-5">
                      <>
                        <Row className="g-0 mb-2">
                          <Col xs="auto">
                            <div className="me-1">Event Name :</div>
                          </Col>
                          <Col className="text-alternate">{data.result ? `${data.resulta[0].event_name}` : ''}</Col>
                        </Row>
                        <Row className="g-0 mb-2">
                          <Col xs="auto">
                            <div className="me-1">Event Category :</div>
                          </Col>
                          <Col className="text-alternate">{data.result ? `${data.resulta[0].eventcategory}` : ''}</Col>
                        </Row>
                        <Row className="g-0 mb-2">
                          <Col xs="auto">
                            <div className="me-1">Venue :</div>
                          </Col>
                          <Col className="text-alternate">{data.result ? `${data.resulta[0].venue}` : ''}</Col>
                        </Row>
                        <Row className="g-0 mb-2">
                          <Col xs="auto">
                            <div className="me-1">Starts At :</div>
                          </Col>
                          <Col className="text-alternate">{data.resulta ? moment(data.resulta[0].event_date_from).format('DD/MMM/YYYY hh:mm A') : ''}</Col>
                        </Row>
                        <Row className="g-0 mb-2">
                          <Col xs="auto">
                            <div className="me-1">Ends At :</div>
                          </Col>
                          <Col className="text-alternate">{data.resulta ? moment(data.resulta[0].event_date_to).format('DD/MMM/YYYY hh:mm A') : ''}</Col>
                        </Row>
                      </>
                    </div>
                  </Card.Body>
                </Card>
                {/* Event Detail End */}
              </Col>
              <Col sm="6">
                {/* Event Detail Start */}
                <h2 className="small-title">Event Booking Details </h2>
                <Card className="mb-5">
                  <Card.Body className="mb-n5">
                    <div className="mb-5">
                      <>
                        <Row className="g-0 mb-2">
                          <Col xs="auto">
                            <div className="me-1">Booking Status : </div>
                          </Col>
                          <Col className="text-alternate">
                            {data.result && data.result[0].rsvp_status == '0'
                              ? 'Booked'
                              : // eslint-disable-next-line no-else-return
                              data.result && data.result[0].rsvp_status == '1'
                              ? 'Confirmed'
                              : // eslint-disable-next-line no-else-return
                              data.result && data.result[0].rsvp_status == '2'
                              ? 'Cancelled'
                              : // eslint-disable-next-line no-else-return
                                'Status'}
                          </Col>
                        </Row>

                        <Row className="g-0 mb-2">
                          <Col xs="auto">
                            <div className="me-1">Booked Date : </div>
                          </Col>
                          <Col className="text-alternate">{data.result ? moment(data.result[0].created_date).format('DD/MMM/YYYY hh:mm A') : ''}</Col>
                        </Row>
                        <Row className="g-0 mb-2">
                          <Col xs="auto">
                            <div className="me-1">Comments : </div>
                          </Col>
                          <Col className="text-alternate">{data.result ? data.result[0].comments : ''}</Col>
                        </Row>
                        {eventDetail.length > 0 && data.result[0].parent_cat == '2' && eventDetail[0].totalbuffet > 0 && (
                          <Row className="g-0 mb-2">
                            <Col xs="auto">
                              <div className="me-1">Veg Buffet - {eventDetail[0].veg_buffet}</div>
                              <div className="me-1">Non-Veg Buffet - {eventDetail[0].nonVeg_buffet}</div>
                            </Col>
                          </Row>
                        )}

{eventDetail.length > 0 && data.result[0].parent_cat == '2' && (
  <>
                      {eventDetail.length > 0 && eventDetail[0].table_book_detail.length > 0 && (
                          <>
                            <Row className="g-0 mb-2">
                              <Col xs="auto">
                                <div className="me-1">Table Booking Request: </div>

                              </Col>
                              <Col className="text-alternate">{eventDetail[0].table_book_detail}</Col>
                            </Row>

                            <Row className="g-0 mb-2">
                              <Col xs="auto">

                                <div className="me-1">Table Status: </div>
                               </Col>
                               <Col className="text-alternate">
                               {eventDetail[0].admin_tablebook_response.length >0
                              ? eventDetail[0].admin_tablebook_response
                              : 'No Status'
                                
                               }
                               </Col>
                            </Row>
                          </>
                        )}</>)}
                      </>
                    </div>
                  </Card.Body>
                </Card>
                {/* Event Detail End */}
              </Col>
            </Row>
            {/* Status End */}
          </Col>

          <Col xl="4" xxl="3">
            {/* Address Start */}
            <h2 className="small-title">Member Details</h2>
            <Card className="mb-5">
              <Card.Body className="mb-n5">
                <div className="mb-5">
                  <p className="text-small text-muted mb-2">MEMBER DETAILS</p>

                  <>
                    <Row className="g-0 mb-2">
                      <Col xs="auto">
                        <div className="sw-3 me-1">
                          <CsLineIcons icon="user" size="17" className="text-primary" />
                        </div>
                      </Col>
                      <Col className="text-alternate">
                        {data.resultb ? `${data.resultb[0].first_name} ${data.resultb[0].last_name} (${data.result[0].member_code})` : ''}
                      </Col>
                    </Row>
                    <Row className="g-0 mb-2">
                      <Col xs="auto">
                        <div className="sw-3 me-1">
                          <CsLineIcons icon="email" size="17" className="text-primary" />
                        </div>
                      </Col>
                      <Col className="text-alternate">{data.result ? `${data.resultb[0].email}` : ''}</Col>
                    </Row>
                    <Row className="g-0 mb-2">
                      <Col xs="auto">
                        <div className="sw-3 me-1">
                          <CsLineIcons icon="phone" size="17" className="text-primary" />
                        </div>
                      </Col>
                      <Col className="text-alternate">{data.resultb ? `${data.resultb[0].mobile_no}` : ''}</Col>
                    </Row>
                  </>
                </div>
              </Card.Body>
            </Card>
            {/* Address End */}
          </Col>
        </Row>
        {eventDetail.length > 0 && data.result[0].parent_cat == '2' && (
          <Row>
            <Col>
              <h2 className="small-title">Participation Detail</h2>
              <Card className="mb-10">
                <Card.Body>
                  <Table>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        {data.result[0].parent_cat == '2' &&
                          eventDetail.length > 0 &&
                          (eventDetail[0].who_is_coming == 'b' || eventDetail[0].who_is_coming == 'me') && (
                            <>
                              <th scope="col">Member Name</th>
                              <th scope="col">Member Code</th>
                              {/* <th scope="col">Member Age</th> */}
                            </>
                          )}
                        {data.result[0].parent_cat == '2' &&
                          eventDetail.length > 0 &&
                          (eventDetail[0].who_is_coming == 'b' || eventDetail[0].who_is_coming == 'ws') && (
                            <>
                              <th scope="col">Spouse Name</th>
                              {/* <th scope="col">Spouse Age</th> */}
                            </>
                          )}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>#</td>
                        {data.result[0].parent_cat == '2' &&
                          eventDetail.length > 0 &&
                          (eventDetail[0].who_is_coming == 'b' || eventDetail[0].who_is_coming == 'me') && (
                            <>
                              <td>{eventDetail[0].member_name}</td>
                              <td>{eventDetail[0].member_code}</td>
                              {/* <td>{eventDetail[0].member_age}</td> */}
                            </>
                          )}
                        {data.result[0].parent_cat == '2' &&
                          eventDetail.length > 0 &&
                          (eventDetail[0].who_is_coming == 'b' || eventDetail[0].who_is_coming == 'ws') && (
                            <>
                              <td>{eventDetail[0].spouse_name}</td>
                              {/* <td>{eventDetail[0].spouse_age}</td> */}
                            </>
                          )}
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
        {eventDetail.length > 0 && eventDetail[0].are_you_coming == 'Y' && data.result[0].parent_cat == '1' && (
          <Row>
            <Col>
              <h2 className="small-title">Participation Detail</h2>
              <Card className="mb-10">
                <Card.Body>
                  <Table>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Member Name</th>
                        <th scope="col">Member Code</th>
                        {/* <th scope="col">Member Age</th> */}
                        {data.result[0].parent_cat == '1' && eventDetail.length > 0 && eventDetail[0].tournament_type == 'D' && (
                          <>
                            <th scope="col">Pair Name</th>
                            <th scope="col">Pair Code</th>
                            <th scope="col">Pair Age</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>#</td>
                        <td>{eventDetail[0].member_name}</td>
                        <td>{eventDetail[0].member_code}</td>
                        {/* <td>{eventDetail[0].member_age}</td> */}
                        {data.result[0].parent_cat == '1' && eventDetail.length > 0 && eventDetail[0].tournament_type == 'D' && (
                          <>
                            <td>{eventDetail[0].member_pair_name}</td>
                            <td>{eventDetail[0].member_pair_code}</td>
                            <td>{eventDetail[0].member_pair_age}</td>
                          </>
                        )}
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
        {eventDetail.length > 0 && (eventDetail[0].is_dependent_attending == 'Y' || eventDetail[0].is_dependent_coming == 'Y') && dependentData.length > 0 && (
          <Row>
            <Col>
              {/* Cart Start */}
              <h2 className="small-title">Dependent Details</h2>
              <Card className="mb-10">
                <Card.Body>
                  <Table>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Relation</th>
                        <th scope="col">Name</th>
                        <th scope="col">Code</th>
                        <th scope="col">Age</th>
                        {data.result[0].parent_cat == '1' && eventDetail.length > 0 && eventDetail[0].tournament_type == 'D' && (
                          <>
                            <th scope="col">Pair Name</th>
                            <th scope="col">Pair Code</th>
                            <th scope="col">Pair Age</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {dependentData.length > 0 ? (
                        dependentData.map((dependent, index) => {
                          return (
                            <tr key={`dependents${index}`}>
                              <th scope="row">{index + 1}</th>
                              <td>{dependent.dependent_relation}</td>
                              <td>{dependent.dependent_name}</td>
                              <td>{dependent.dependent_code}</td>
                              <td>{dependent.dependent_age>0?dependent.dependent_age:''}</td>
                              {data.result[0].parent_cat == '1' && eventDetail.length > 0 && eventDetail[0].tournament_type == 'D' && (
                                <>
                                  <td>{dependent.dependent_pair_name}</td>
                                  <td>{dependent.dependent_pair_code}</td>
                                  <td>{dependent.dependent_pair_age>0?dependent.dependent_pair_age:''}</td>
                                </>
                              )}
                            </tr>
                          );
                        })
                      ) : (
                        <tr key="guestsNone">
                          <td colSpan="4">No Dependent Details</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
        {data.result && data.result[0].parent_cat == '2' && guestData.length > 0 && (
          <Row>
            <Col>
              {/* Cart Start */}
              <h2 className="small-title">Guest Details</h2>
              <Card className="mb-10">
                <Card.Body>
                  <Table>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {guestData.length > 0 ? (
                        guestData.map((guest, index) => {
                          return (
                            <tr key={`guests${index}`}>
                              <th scope="row">{index + 1}</th>
                              <td>{guest.guest_name}</td>
                              <td>{guest.guest_email}</td>
                              <td>{guest.guest_phone}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr key="guestsNone">
                          <td colSpan="4">No Guest Details</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
        <GiveFeedBack
          eventOrders={data}
          feedback={feedback}
          selectedEventOrder={id}
          isOpenGiveFeedBackModal={isOpenGiveFeedBackModal}
          setIsOpenGiveFeedBackModal={setIsOpenGiveFeedBackModal}
        />
      </Layout>
    </>
  );
};

export default OrdersDetail;
