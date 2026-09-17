/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Card, Table } from 'react-bootstrap';
import axios from 'axios';
import { SERVICE_URL, API_URL } from 'config.js';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import moment from 'moment';
import { catImageLivePath, itemImageLivePath } from 'constants.js';
import { toast } from 'react-toastify';
import Layout from '../../../../layout/Layout';

const FeedBackDetail = () => {
  const title = 'Feedback Detail';
  const description = 'Feedback Detail Page';
  const [data, setData] = useState([]);
  const [guestData, setGuestData] = useState([]);
  const { id } = useParams();
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

  const fetchData = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}events/rsvp_detail`, { params: { orderId: id } });

    setTimeout(() => {
      const { result } = response.data;
      // console.log(response.data);
      setData(response.data);
      if (result[0].totalguest > 0) {
        fetchGuestData(result[0].rsvp_id);
      }
      document.body.classList.remove('spinner');
    }, 1000);
  }, [id, fetchGuestData]);

  useEffect(() => {
    fetchData();
  }, []);
  const changeStatus = React.useCallback(async ({ ids, orderstatus }) => {
    // console.log();
    document.body.classList.add('spinner');
    const response = await axios.post(`${API_URL}events/rsvp_status_update`, { ids, orderstatus });
    setTimeout(() => {
      toast.success('Feedback Status Updated Successfully', {
        position: 'top-right',
      });
      fetchData();
      document.body.classList.remove('spinner');
    }, 1000);
  }, []);
  const changeTagSelectedItems = (ids, tag) => {
    changeStatus({ ids, orderstatus: tag });
  };

  return (
    <>
      <HtmlHead title={title} description={description} />
      <Layout>
        <div className="page-title-container">
          <Row className="g-0">
            {/* Title Start */}
            <Col className="col-auto mb-3 mb-sm-0 me-auto">
              <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/admin/events/ManageOrder">
                <CsLineIcons icon="chevron-left" size="13" />
                <span className="align-middle text-small ms-1">Bookings</span>
              </NavLink>
              <h1 className="mb-0 pb-0 display-4" id="title">
                {title}
              </h1>
            </Col>
            {/* Title End */}

            {/* Top Buttons Start */}
            <Col xs="12" sm="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
              <Dropdown className="w-100 w-md-auto">
                <Dropdown.Toggle className="w-100 w-md-auto" variant="outline-primary">
                  {data.result && data.result[0].order_status == '0'
                    ? 'Booked'
                    : // eslint-disable-next-line no-else-return
                    data.result && data.result[0].order_status == '1'
                    ? 'Confirmed'
                    : // eslint-disable-next-line no-else-return
                    data.result && data.result[0].order_status == '2'
                    ? 'Cancelled'
                    : // eslint-disable-next-line no-else-return
                      'Status'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={(event) => {
                      event.preventDefault();
                      changeTagSelectedItems(id, '0');
                    }}
                  >
                    Booked
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(event) => {
                      event.preventDefault();
                      changeTagSelectedItems(id, '1');
                    }}
                  >
                    Confirmed
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(event) => {
                      event.preventDefault();
                      changeTagSelectedItems(id, '2');
                    }}
                  >
                    Cancelled
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            {/* Top Buttons End */}
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
                <h2 className="small-title">Feedback Details</h2>
                <Card className="mb-5">
                  <Card.Body className="mb-n5">
                    <div className="mb-5">
                      <>
                        <Row className="g-0 mb-2">
                          <Col xs="auto">
                            <div className="me-1">Booking Status</div>
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
                            <div className="me-1">Booked Date</div>
                          </Col>
                          <Col className="text-alternate">{data.result ? moment(data.resulta[0].created_date).format('DD/MMM/YYYY hh:mm A') : ''}</Col>
                        </Row>
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
                            <th scope="row">{index}</th>
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
      </Layout>
    </>
  );
};

export default FeedBackDetail;
