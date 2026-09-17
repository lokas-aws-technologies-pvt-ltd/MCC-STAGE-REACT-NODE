/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { catImageLivePath, itemImageLivePath } from 'constants.js';
import { Row, Col, Card, Button, Form, InputGroup, Alert, Modal } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import Clamp from 'components/clamp';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
// import ItemCounter from './components/ItemCounter';
import axios from 'axios';
import { SERVICE_URL, API_URL } from 'config.js';
import { toast } from 'react-toastify';
import Layout from '../../../../layout/Layout';
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart, completeCart } from './cartSlice';

const Cart = () => {
  const title = 'Current Order';
  const description = 'F&B Current order Page';
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [staticBackdropExample, setStaticBackdropExample] = useState(false);
  const [memberinitiate, setmemberinitiate] = useState(false);
  const roundToNearest30 = (date = new Date()) => {
    const minutes = 30;
    const ms = 1000 * 60 * minutes;

    return new Date(Math.round(date.getTime() / ms) * ms);
  };
  const [startDate, setStartDate] = useState(roundToNearest30(new Date()));
  const [dateError, setDateError] = useState('');
  const { isLogin, currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const onInput = (event, previousvalue, product) => {
    // console.log('enteredvalue', event.target.value);
    // console.log('previousvalue', previousvalue);
    if (event.target.value <= 0) {
      dispatch(removeFromCart(product));
    } else if (event.target.value < previousvalue) {
      dispatch(decreaseCart(product));
    } else if (event.target.value > previousvalue) {
      dispatch(addToCart(product));
    }
  };
  const placeOrder = React.useCallback(async () => {
    document.body.classList.add('spinner');
    // console.log('selectedDate', startDate);
    if (startDate != null) {
      const newTime = moment(startDate).format('hh:mm a');
      console.log('newTime', newTime);
      const formData = {};
      formData.cart = cart;
      formData.currentUser = currentUser;
      formData.clubPickup = 1;
      if (memberinitiate)
        formData.clubPickup = 2;
      formData.selectedTime = newTime;
      await axios
        .post(`${API_URL}restaurant/order_add`, formData)
        .then((response) => {
          // console.log(response);
          toast.success('Your order has been Place successfully', {
            position: 'top-right',
          });
          dispatch(completeCart());
          setStaticBackdropExample(false);
          document.body.classList.remove('spinner');
          setTimeout(() => {
            history.push('/member/foodordering/orders/list');
          }, 1000);
          // return true // pass to finish
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setDateError('Please select Pickup Time');
      toast.error('Please select your Pickup Time', {
        position: 'top-right',
      });
      setStaticBackdropExample(true);
    }
  }, [cart, currentUser, dispatch, history, startDate, memberinitiate]);
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
  }, []);
  return (
    <>
      <HtmlHead title={title} description={description} />
      <Layout>
        {/* Title Start */}
        <div className="page-title-container">
          <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/member/foodordering/home">
            <CsLineIcons icon="chevron-left" size="13" />
            <span className="align-middle text-small ms-1">F&B</span>
          </NavLink>
          <h1 className="mb-0 pb-0 display-4" id="title">
            {title}
          </h1>
        </div>
        {/* Title End */}
        {cart.cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is currently empty</p>
            <div className="start-shopping">
              <NavLink to="/member/foodordering/home">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
                <span>Start Shopping</span>
              </NavLink>
            </div>
          </div>
        ) : (
          <Row>
            <Col xs="12" lg="8" className="order-1 order-lg-0">
              {/* Items Start */}
              <h2 className="small-title">Items</h2>
              <div className="mb-5">
                {cart.cartItems &&
                  cart.cartItems.map(function (cartItem) {
                    // eslint-disable-next-line eqeqeq
                    const catid = catData.filter((p) => p.id == cartItem.cat_id);
                    return (
                      <Card key={cartItem.item_id} className="mb-2">
                        <Row className="g-0 sh-18 sh-md-14">
                          {/* <Col xs="auto">
                         <img
                            src={cartItem.item_image ? `${itemImageLivePath}${cartItem.item_image}` : '/img/product/small/default.png'}
                            className="card-img card-img-horizontal h-100 sw-9 sw-sm-13 sw-md-15"
                            alt="thumb"
                          /> 
                        </Col> */}
                          <Col className="position-relative h-100">
                            <Card.Body>
                              <Row className="h-100">
                                <Col md="6" className="mb-2 mb-md-0 d-flex align-items-center">
                                  <div className="pt-0 pb-0 pe-2">
                                    <div className="h6 mb-0">
                                      <Clamp tag="span" clamp="1">
                                        {cartItem.varient === 'V' ? (
                                          <img src="/assets/images/veg.svg" alt="veg" />
                                        ) : (
                                          <img src="/assets/images/non_veg.svg" alt="non-veg" />
                                        )}
                                        &nbsp;
                                        {cartItem.item_name}
                                      </Clamp>
                                    </div>
                                    <div className="text-muted text-small">
                                      {' '}
                                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{catid && Array.isArray(catid) && catid.length > 0 ? `${catid[0].name}` : ''}
                                    </div>
                                    <div className="mb-0 sw-19">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x20B9;. {cartItem.price}</div>
                                  </div>
                                </Col>
                                <Col xs="6" md="3" className="pe-0 d-flex align-items-center">
                                  <InputGroup className="spinner sw-11">
                                    <InputGroup.Text id="basic-addon1">
                                      <button type="button" className="spin-down single px-2" onClick={() => handleDecreaseCart(cartItem)}>
                                        -
                                      </button>
                                    </InputGroup.Text>
                                    <Form.Control
                                      value={cartItem.cartQuantity}
                                      onInput={(e) => {
                                        onInput(e, cartItem.cartQuantity, cartItem);
                                      }}
                                      placeholder="Count"
                                      className="text-center"
                                    />
                                    <InputGroup.Text id="basic-addon2">
                                      <button type="button" className="spin-up single px-2" onClick={() => handleAddToCart(cartItem)}>
                                        +
                                      </button>
                                    </InputGroup.Text>
                                  </InputGroup>
                                </Col>
                                <Col xs="6" md="3" className="d-flex justify-content-end justify-content-md-start align-items-center">
                                  <div className="h6 mb-0">&#x20B9;. {cartItem.price * cartItem.cartQuantity}</div>
                                </Col>
                              </Row>
                              <Button
                                onClick={() => handleRemoveFromCart(cartItem)}
                                size="sm"
                                className="btn-icon btn-icon-only position-absolute t-2 e-2"
                                variant="foreground-alternate"
                              >
                                <CsLineIcons icon="error-hexagon" />
                              </Button>
                            </Card.Body>
                          </Col>
                        </Row>
                      </Card>
                    );
                  })}
              </div>
              {/* Items End */}
            </Col>

            <Col xs="12" lg="4" className="order-0 order-lg-1">
              <h2 className="small-title">
                Summary
                <span style={{ marginLeft: '5%' }}>
                  <Button className="btn-icon btn-icon-end" variant="danger" onClick={() => handleClearCart()}>
                    <span>Remove All</span> <CsLineIcons icon="error-hexagon" />
                  </Button>
                </span>
              </h2>
              <br />

              <Card className="mb-5 w-100 sw-lg-35">
                <Card.Body>
                  <div className="mb-4">
                    <div className="mb-2">
                      <p className="text-small text-muted mb-1">ITEMS</p>
                      <p>
                        <span className="text-alternate">
                          {cart.cartTotalQuantity > 1 ? `${cart.cartTotalQuantity} items` : `${cart.cartTotalQuantity} item`}
                        </span>
                      </p>
                    </div>
                    <div className="mb-2">
                      <p className="text-small text-muted mb-1">TOTAL</p>
                      <p>
                        <span className="text-alternate">
                          <span className="text-small text-muted">&#x20B9;.</span>
                          {cart.cartTotalAmount}
                        </span>
                      </p>
                    </div>
                    <div className="mb-2">
                      <p className="text-small text-muted mb-1">GRAND TOTAL</p>
                      <div className="cta-2">
                        <span>
                          <span className="text-small text-muted cta-2">&#x20B9;.</span>
                          {cart.cartTotalAmount}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button type="button" onClick={() => setStaticBackdropExample(true)} className="btn btn-info btn-icon btn-icon-end w-100">
                    <span style={{ fontSize: 14 }}>Take Away</span> <CsLineIcons icon="chevron-right" />
                  </button>
                  <p> </p>
                  {/* <button type="button" onClick={() => {setmemberinitiate(true); setStaticBackdropExample(true);}} className="btn btn-info btn-icon btn-icon-end w-100">
                    <span style={{ fontSize: 14 }}>Member Initiated</span> <CsLineIcons icon="chevron-right" />
                  </button>
                  <p> </p>
                  <NavLink to="/member/foodordering/checkout" className="btn btn-primary btn-icon btn-icon-end w-100">
                    <span style={{ fontSize: 14 }}>Delivery</span> <CsLineIcons icon="chevron-right" />
                  </NavLink> */}

                  <hr
                    style={{
                      background: '#000000',
                      color: '#000000',
                      borderColor: '#000000',
                      height: '1px',
                    }}
                  />
                  <div style={{ textAlign: "left", marginBottom: '5px' }}><small >Home delivery by</small></div>

                  <NavLink to={{
                    pathname: '/member/foodordering/checkout',
                    state: { memberinitiate: true }
                  }} className="btn btn-primary btn-icon btn-icon-end w-100">
                    <span style={{ fontSize: 14 }}>Member</span> <CsLineIcons icon="chevron-right" />
                  </NavLink>
                  <p> </p>
                  <NavLink to={{
                    pathname: '/member/foodordering/checkout',
                    state: { memberinitiate: false }
                  }} className="btn btn-primary btn-icon btn-icon-end w-100">
                    <span style={{ fontSize: 14 }}>MCC</span> <CsLineIcons icon="chevron-right" />
                  </NavLink>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
        <Modal backdrop="static" keyboard={false} show={staticBackdropExample} onHide={() => setStaticBackdropExample(false)}>
          <Modal.Header closeButton>
            <Modal.Title id="staticBackdropLabel">Pickup Time</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DatePicker
              className="form-control"
              dateFormat="h:mm aa"
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              minTime={startDate > new Date().setHours(7, 30, 0) ? startDate : new Date().setHours(7, 30, 0)}
              maxTime={new Date().setHours(22, 30, 59)}
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setStaticBackdropExample(false)}>
              Close
            </Button>
            <Button onClick={placeOrder}>Will Pickup On This Time</Button>
          </Modal.Footer>
        </Modal>
      </Layout>
    </>
  );
};

export default Cart;
