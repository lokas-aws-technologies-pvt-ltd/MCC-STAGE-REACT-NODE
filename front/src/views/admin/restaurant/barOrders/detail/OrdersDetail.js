/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Card, InputGroup, Form } from 'react-bootstrap';
import axios from 'axios';
import { SERVICE_URL, API_URL } from 'config.js';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { catImageLivePath, itemImageLivePath } from 'constants.js';
import { toast } from 'react-toastify';
import Layout from '../../../../../layout/Layout';

const OrdersDetail = () => {
  const title = 'Order Detail';
  const description = 'F&B Order Detail Page';
  const [data, setData] = useState([]);
  const { id } = useParams();
  const fetchData = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}bar/orderdetail_get`, { params: { orderId: id } });

    setTimeout(() => {
      /// const { result } = response.data;
      setData(response.data);

      document.body.classList.remove('spinner');
    }, 1000);
  }, [id]);
  const [catData, setCatData] = useState([]);
  const fetchCategoryData = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}bar/category_get`);

    setTimeout(() => {
      const { result } = response.data;
      setCatData(result);
      document.body.classList.remove('spinner');
    }, 1000);
  }, []);
  useEffect(() => {
    fetchData();
    fetchCategoryData();
  }, []);
  const changeStatus = React.useCallback(async ({ ids, orderstatus }) => {
    // console.log();
    document.body.classList.add('spinner');
    const response = await axios.post(`${API_URL}bar/order_status_update`, { ids, orderstatus });
    setTimeout(() => {
      toast.success('Order Status Updated Successfully', {
        position: 'top-right',
      });
      fetchData();
      document.body.classList.remove('spinner');
    }, 1000);
  }, []);
  const changeTagSelectedItems = (ids, tag) => {
    changeStatus({ ids, orderstatus: tag });
  };
  const handleRemoveFromCart = (itemId) => {
    const choice = window.confirm('Are you sure you want to delete this?');
    if (choice) {
      // console.log('itemId', itemId);
      const itemData = data.resulta;
      document.body.classList.add('spinner');
      const response = axios.post(`${API_URL}bar/order_remove_single_item`, { itemId, itemData });
      setTimeout(() => {
        toast.success('Order Updated Successfully', {
          position: 'top-right',
        });
        fetchData();
      }, 1000);
      document.body.classList.remove('spinner');
    }
  };

  const handleCartChange = (quant, itemId) => {
    const itemData = data.resulta;
    const quantity = quant;
    if (quantity > 0) {
      // console.log('itemId', itemId );
      document.body.classList.add('spinner');
      const response = axios.post(`${API_URL}bar/order_update_single_item_quantity`, { quantity, itemId, itemData });
      setTimeout(() => {
        toast.success('Order Updated Successfully', {
          position: 'top-right',
        });
        fetchData();
      }, 1000);

      document.body.classList.remove('spinner');
    } else {
      handleRemoveFromCart(itemId);
    }
  };
  return (
    <>
      <HtmlHead title={title} description={description} />
      <Layout>
        <div className="page-title-container">
          <Row className="g-0">
            {/* Title Start */}
            <Col className="col-auto mb-3 mb-sm-0 me-auto">
              <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/admin/restaurant/BarManageOrder">
                <CsLineIcons icon="chevron-left" size="13" />
                <span className="align-middle text-small ms-1">Bar Orders</span>
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
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={(event) => {
                      event.preventDefault();
                      changeTagSelectedItems(id, '1');
                    }}
                  >
                    Ordered
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(event) => {
                      event.preventDefault();
                      changeTagSelectedItems(id, '2');
                    }}
                  >
                    Confirmed
                  </Dropdown.Item>
                  {/* <Dropdown.Item
                    onClick={(event) => {
                      event.preventDefault();
                      changeTagSelectedItems(id, '3');
                    }}
                  >
                    Preparing
                  </Dropdown.Item> */}
                  <Dropdown.Item
                    onClick={(event) => {
                      event.preventDefault();
                      changeTagSelectedItems(id, '4');
                    }}
                  >
                    In Transit
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(event) => {
                      event.preventDefault();
                      changeTagSelectedItems(id, '5');
                    }}
                  >
                    Delivered
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(event) => {
                      event.preventDefault();
                      changeTagSelectedItems(id, '6');
                    }}
                  >
                    Cancelled
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* <Dropdown className="ms-1">
                <Dropdown.Toggle className="btn-icon btn-icon-only dropdown-toggle-no-arrow" variant="outline-primary">
                  <CsLineIcons icon="more-horizontal" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Edit</Dropdown.Item>
                  <Dropdown.Item>View Invoice</Dropdown.Item>
                  <Dropdown.Item>Track Package</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
            </Col>
            {/* Top Buttons End */}
          </Row>
        </div>

        <Row>
          <Col xl="8" xxl="9">
            {/* Status Start */}
            <h2 className="small-title">Details</h2>
            <Row className="g-2 mb-5">
              <Col sm="6">
                <Card className="sh-13 sh-lg-15 sh-xl-14">
                  <Card.Body className="h-100 py-3 d-flex">
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
                  <Card.Body className="h-100 py-3 d-flex ">
                    <Row className="g-0">
                      <Col xs="auto" className="pe-3">
                        <div className="border border-primary sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                          <CsLineIcons icon="clipboard" className="text-primary" />
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex align-items-center lh-1-25">Order Status : </div>
                        <div className="text-primary">
                          {' '}
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
            <h2 className="small-title">Cart</h2>
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
                            /> 
                            <img src="/img/product/small/default.png" className="card-img rounded-md h-100 sw-13" alt="thumb" /> */}
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
                                      <span>
                                        {data.result && data.result[0].order_status === '1' ? (
                                          <>
                                            <InputGroup className="spinner sw-11">
                                              <Form.Control value={values.quantity} readOnly placeholder="0" className="text-center" />
                                              <InputGroup.Text id="basic-addon1">
                                                <button
                                                  type="button"
                                                  className="spin-down single px-2"
                                                  onClick={() => {
                                                    handleCartChange(values.quantity - 1, values.in_order_id);
                                                  }}
                                                >
                                                  -
                                                </button>
                                              </InputGroup.Text>
                                            </InputGroup>
                                          </>
                                        ) : (
                                          values.quantity
                                        )}
                                      </span>
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
                                      <span>
                                        <span className="text-small"> </span>
                                        {data.result && data.result[0].order_status === '1' ? (
                                          <Button
                                            onClick={() => handleRemoveFromCart(values.in_order_id)}
                                            size="sm"
                                            className="btn-icon btn-icon-only t-2 e-2"
                                            variant="foreground-alternate"
                                          >
                                            <CsLineIcons icon="error-hexagon" />
                                          </Button>
                                        ) : (
                                          ' '
                                        )}
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
            {/* Cart End */}
          </Col>

          <Col xl="4" xxl="3">
            {/* Address Start */}
            <h2 className="small-title">Address</h2>
            <Card className="mb-5">
              <Card.Body className="mb-n5">
                <div className="mb-5">
                  <p className="text-small text-muted mb-2">MEMBER DETAILS</p>

                  <Row className="g-0 mb-2">
                    <Col xs="auto">
                      <div className="sw-3 me-1">
                        <CsLineIcons icon="user" size="17" className="text-primary" />
                      </div>
                    </Col>
                    <Col className="text-alternate">
                      {data.resultb ? `${data.resultb[0].first_name} ${data.resultb[0].last_name} (${data.resultb[0].member_code})` : ''}{' '}
                    </Col>
                  </Row>
                  <Row className="g-0 mb-2">
                    <Col xs="auto">
                      <div className="sw-3 me-1">
                        <CsLineIcons icon="email" size="17" className="text-primary" />
                      </div>
                    </Col>
                    <Col className="text-alternate">{data.resultb ? `${data.resultb[0].email}` : ''}</Col>
                  </Row>
                  <Row className="g-0 mb-2">
                    <Col xs="auto">
                      <div className="sw-3 me-1">
                        <CsLineIcons icon="phone" size="17" className="text-primary" />
                      </div>
                    </Col>
                    <Col className="text-alternate">{data.resultb ? `${data.resultb[0].mobile_no}` : ''}</Col>
                  </Row>
                </div>
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
      </Layout>
    </>
  );
};

export default OrdersDetail;
