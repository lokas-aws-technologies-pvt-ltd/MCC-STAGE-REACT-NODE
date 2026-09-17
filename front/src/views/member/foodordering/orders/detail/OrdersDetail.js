/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Card } from 'react-bootstrap';
import { catImageLivePath, itemImageLivePath } from 'constants.js';
import axios from 'axios';
import { SERVICE_URL, API_URL } from 'config.js';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { toast } from 'react-toastify';
import Layout from '../../../../../layout/Layout';
import GiveFeedBack from './GiveFeedBack';

const OrdersDetail = () => {
  const title = 'Order Detail';
  const description = 'F&B Order Detail Page';
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [isOpenGiveFeedBackModal, setIsOpenGiveFeedBackModal] = useState(false);

  const fetchData = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}restaurant/orderdetail_get`, { params: { orderId: id } });

    setTimeout(() => {
      /// const { result } = response.data;
      setData(response.data);

      document.body.classList.remove('spinner');
    }, 1000);
  }, [id]);
  const [catData, setCatData] = useState([]);
  const fetchCategoryData = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}restaurant/category_get`);

    setTimeout(() => {
      const { result } = response.data;
      setCatData(result);
      document.body.classList.remove('spinner');
    }, 1000);
  }, []);
  useEffect(() => {
    fetchCategoryData();
    fetchData();
  }, []);
  const feedback = React.useCallback(async ({ evnitem }) => {
    // console.log('additem', item);
    document.body.classList.add('spinner');
    const response = await axios.post(`${API_URL}restaurant/feedback`, evnitem);
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
        <div className="page-title-container">
          <Row className="g-0">
            {/* Title Start */}
            <Col className="col-auto mb-3 mb-sm-0 me-auto">
              <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/member/foodordering/orders/list">
                <CsLineIcons icon="chevron-left" size="13" />
                <span className="align-middle text-small ms-1">Orders</span>
              </NavLink>
              <h1 className="mb-0 pb-0 display-4" id="title">
                {title}
              </h1>
            </Col>
            {/* Title End */}
          </Row>
        </div>

        <Row>
          <Col xl="8" xxl="9">
            {/* Status Start */}
            <h2 className="small-title">Status</h2>
            <Row className="g-2 mb-5">
              <Col sm="6">
                <Card className="sh-13 sh-lg-15 sh-xl-14">
                  <Card.Body className="h-100 py-3 d-flex ">
                    <Row className="g-0">
                      <Col xs="auto" className="pe-3">
                        <div className="border border-primary sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                          <CsLineIcons icon="tag" className="text-primary" />
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex align-items-center lh-1-25">Order Id : </div>
                        <div className="text-primary">{data.result ? data.result[0].order_id : ''}</div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm="6">
                <Card className="sh-13 sh-lg-15 sh-xl-14">
                  <Card.Body className="h-100 py-3 d-flex">
                    <Row className="g-0 ">
                      <Col xs="auto" className="pe-3">
                        <div className="border border-primary sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                          <CsLineIcons icon="clipboard" className="text-primary" />
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex align-items-center lh-1-25">Order Status : </div>
                        <div className="text-primary">
                          {data.result && data.result[0].order_status === '1'
                            ? 'Ordered'
                            : // eslint-disable-next-line no-else-return
                            data.result && data.result[0].order_status === '2'
                            ? 'Confirmed'
                            : // eslint-disable-next-line no-else-return
                            data.result && data.result[0].order_status === '3'
                            ? 'Preparing'
                            : // eslint-disable-next-line no-else-return
                            data.result && data.result[0].order_status === '4'
                            ? 'In Transit'
                            : // eslint-disable-next-line no-else-return
                            // eslint-disable-next-line no-nested-ternary
                            data.result && data.result[0].order_status === '5'
                            ? 'Delivered'
                            : // eslint-disable-next-line no-else-return
                            data.result && data.result[0].order_status === '6'
                            ? 'Cancelled'
                            : // eslint-disable-next-line no-else-return
                              'Status'}
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            {/* Status End */}

            {/* Cart Start */}
            <h2 className="small-title" style={{ marginBottom: '0.6rem' }}>
              Cart{' '}
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
            </h2>
            <Card className="mb-5">
              <Card.Body>
                <div className="mb-5">
                  {data.resulta ? (
                    data.resulta.map(function (values) {
                      // console.log('details', values.detalis);
                      const finalData = values.detalis.replace(/\\/g, '');
                      const itemInfo = JSON.parse(finalData);
                      // eslint-disable-next-line eqeqeq
                      const catid = catData.filter((p) => p.id == itemInfo.cat_id);

                      return (
                        <Row className="g-0 sh-9 mb-3" style={{ marginBottom: '4px' }} key={values.in_order_id}>
                          <Col xs="auto">
                            {/* <img
                              src={itemInfo.item_image !== '' ? `${itemImageLivePath}${itemInfo.item_image}` : '/img/product/small/default.png'}
                              className="card-img rounded-md h-100 sw-13"
                              alt="thumb"
                            /> */}
                            <img src="/img/product/small/default.png" className="card-img rounded-md h-100 sw-13" alt="thumb" />
                          </Col>
                          <Col>
                            <div className="ps-4 pt-0 pb-0 pe-0 h-100">
                              <Row className="g-0 h-100 align-items-start align-content-center">
                                <Col xs="12" className="d-flex flex-column mb-2">
                                  <div>{`${itemInfo.item_name}`}</div>
                                  <div className="text-muted text-small">{catid && Array.isArray(catid) && catid.length > 0 ? `${catid[0].name}` : ''}</div>
                                </Col>
                                <Col xs="12" className="d-flex flex-column mb-md-0 pt-1">
                                  <Row className="g-0">
                                    <Col xs="6" className="d-flex flex-row pe-2 align-items-end text-alternate">
                                      <span>{`${values.quantity}`}</span>
                                      <span className="text-muted ms-1 me-1">x</span>
                                      <span>
                                        <span className="text-small">&#x20B9;</span>
                                        {`${values.item_price}`}
                                      </span>
                                    </Col>
                                    <Col xs="6" className="d-flex flex-row align-items-end justify-content-end text-alternate">
                                      <span>
                                        <span className="text-small">&#x20B9;</span>
                                        {`${values.price}`}
                                      </span>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      );
                    })
                  ) : (
                    <Row className="g-0 sh-9 mb-3">
                      <Col xs="auto">No Products</Col>
                    </Row>
                  )}
                </div>
                <div>
                  <Row className="g-0 mb-2">
                    <Col xs="auto" className="ms-auto ps-3 text-muted">
                      Total
                    </Col>
                    <Col xs="auto" className="sw-13 text-end">
                      <span>
                        <span className="text-small text-muted">&#x20B9;</span>
                        {data.result ? data.result[0].price : ''}
                      </span>
                    </Col>
                  </Row>

                  <Row className="g-0 mb-2">
                    <Col xs="auto" className="ms-auto ps-3 text-muted">
                      Grand Total
                    </Col>
                    <Col xs="auto" className="sw-13 text-end">
                      <span>
                        <span className="text-small text-muted">&#x20B9;</span>
                        {data.result ? data.result[0].final_price : ''}
                      </span>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xl="4" xxl="3">
            {/* Address Start */}
            <h2 className="small-title">Address</h2>
            <Card className="mb-5">
              <Card.Body className="mb-n5">
                <div className="mb-5">
                  <p className="text-small text-muted mb-2">DELIVERY ADDRESS</p>

                  {
                    // eslint-disable-next-line eqeqeq
                    data.result && data.result[0].is_club_pickup == '1' ? (
                      <>
                        <Row className="g-0 mb-2">
                          <Col xs="auto">
                            <div className="sw-3 me-1">
                              <CsLineIcons icon="pin" size="17" className="text-primary" />
                            </div>
                          </Col>
                          <Col className="text-alternate">Club PickUp</Col>
                        </Row>
                        <Row className="g-0 mb-2">
                          <Col xs="auto">
                            <div className="sw-3 me-1">
                              <CsLineIcons icon="clock" size="17" className="text-primary" />
                            </div>
                          </Col>
                          <Col className="text-alternate">{data.result[0].pickup_time}</Col>
                        </Row>
                      </>
                    ) : (
                      <>
                        <Row className="g-0 mb-2">
                          <Col xs="auto">
                            <div className="sw-3 me-1">
                              <CsLineIcons icon="user" size="17" className="text-primary" />
                            </div>
                          </Col>
                          <Col className="text-alternate">
                            {data.resultb ? `${data.resultb[0].first_name} ${data.resultb[0].last_name} (${data.resultb[0].member_code})` : ''}
                          </Col>
                        </Row>
                        <Row className="g-0 mb-2">
                          <Col xs="auto">
                            <div className="sw-3 me-1">
                              <CsLineIcons icon="pin" size="17" className="text-primary" />
                            </div>
                          </Col>
                          <Col className="text-alternate">{data.result ? `${data.result[0].delivery_address}` : ''}</Col>
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
                    )
                  }
                </div>
              </Card.Body>
            </Card>
            {/* Address End */}
          </Col>
        </Row>
        <GiveFeedBack
          foodOrders={data}
          feedback={feedback}
          selectedFoodOrder={id}
          isOpenGiveFeedBackModal={isOpenGiveFeedBackModal}
          setIsOpenGiveFeedBackModal={setIsOpenGiveFeedBackModal}
        />
      </Layout>
    </>
  );
};

export default OrdersDetail;
