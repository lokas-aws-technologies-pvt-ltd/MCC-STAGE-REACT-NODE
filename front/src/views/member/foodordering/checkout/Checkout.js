import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Col, Form, Row } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import axios from 'axios';
import { SERVICE_URL, API_URL } from 'config.js';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import DeliveryAddressAddEdit from './DeliveryAddressAddEdit';
import Layout from '../../../../layout/Layout';
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart, completeCart } from '../cart/cartSlice';

const Categories = () => {
  const title = 'Checkout';
  const description = 'F&B Checkout Page';
  const cart = useSelector((state) => state.cart);
  const { isLogin, currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const validationSchema = Yup.object().shape({
    selectedaddress: Yup.string().required('Please select your delivery address'),
    /* firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    phone: Yup.number().required('Phone No is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    zipcode: Yup.number().required('Pincode is required'),
    address: Yup.string().required('Address is required'), 
    terms: Yup.boolean().oneOf([true], 'Please accept the terms and conditions'), */
  });
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const optionsState = [{ value: 'Tamil Nadu', label: 'Tamil Nadu' }];
  const [address, setAddress] = useState([]);
  const [currentAddress, setCurrentAddress] = useState(0);
  const [editableAddress, setEditableAddress] = useState([]);
  const [staticBackdropExample, setStaticBackdropExample] = useState(false);
  const [selectValueState, setSelectValueState] = useState({ value: 'Tamil Nadu', label: 'Tamil Nadu' });
  const optionsCity = [{ value: 'Chennai', label: 'Chennai' }];
  const [selectValueCity, setSelectValueCity] = useState({ value: 'Chennai', label: 'Chennai' });

 const [checkval, setcheckval] = useState(false);
  const initialValues = {
    selectedaddress: 0,
    firstname: '',
    lastname: '',
    phone: '',
    state: 'Tamil Nadu',
    city: 'Chennai',
    zipcode: '',
    address: '',
    terms: false,
  };

  async function placeOrder(values) {
    document.body.classList.add('spinner');
    // eslint-disable-next-line vars-on-top
    const response = await axios.post(`${API_URL}restaurant/order_add`, values);
    setTimeout(() => {
      document.body.classList.remove('spinner');
      toast.success('Your order has been Place successfully', {
        position: 'top-right',
      });
      dispatch(completeCart());
      document.body.classList.remove('spinner');
      setTimeout(() => {
        history.push('/member/foodordering/orders/list');
      }, 1000);
    }, 1000);
  }
  const onSubmit = (values, { resetForm }) => {
    console.log('values', values);
    // document.body.classList.add('spinner');
    const formData = {};
    formData.cart = cart;
    formData.currentUser = currentUser;
    formData.clubPickup = 0;
    if (location.state.memberinitiate)
    formData.clubPickup = 2;
    const seladress = address[currentAddress];
    // console.log('seladress',seladress);
    const deladdress = `${seladress.first_name} ${seladress.last_name}, ${seladress.address}, ${seladress.city}, ${seladress.state} - ${seladress.zipcode}. Phone ${seladress.phone}`;
    formData.delivery_address = deladdress;
    // console.log('formData', formData);
    placeOrder(formData);
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  function getAddress() {
    // console.log('currentUser.member_code', currentUser);
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${API_URL}restaurant/address_get`, { params: { member_code: currentUser.membercode } });

        resolve(res.data);
        if (res.data.status === 'success') {
          resolve(res.data);
        }
      } catch (error) {
        // eslint-disable-next-line prettier/prettier
          // eslint-disable-next-line prefer-promise-reject-errors
        reject({ status: 'error', message: error.error });
      }
    });
  }
  const getAddressList = () => {
    getAddress()
      .then((res) => {
        setAddress(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addItem = React.useCallback(
    async ({ item }) => {
      document.body.classList.add('spinner');
      item.member_code = currentUser.membercode;
      const response = await axios.post(`${API_URL}restaurant/address_add`, { item });
      setTimeout(() => {
        getAddressList();
        setCurrentAddress(0);
        toast.success('Delivery Address Added Successfully', {
          position: 'top-right',
        });
        setStaticBackdropExample(false);
        document.body.classList.remove('spinner');
      }, 1000);
    },
    [currentUser]
  );
  const addAddress = () => {
    // setCurrentAddress('');
    setEditableAddress([]);
    setStaticBackdropExample(true);
  };

  const editItem = React.useCallback(async ({ item }) => {
    //  console.log('item', item);
    document.body.classList.add('spinner');
    const response = await axios.post(`${API_URL}restaurant/address_update`, { item });
    setTimeout(() => {
      getAddressList();
      toast.success('Delivery Address Updated Successfully', {
        position: 'top-right',
      });
      setStaticBackdropExample(false);
      document.body.classList.remove('spinner');
    }, 1000);
  });
  const editAddress = (ids, addkey) => {
    setEditableAddress(address[addkey]);
    setCurrentAddress(addkey);
    setStaticBackdropExample(true);
  };
  const deleteAddress = (ids, addkey) => {
    document.body.classList.add('spinner');
    const response = axios.post(`${API_URL}restaurant/address_delete`, { ids });
    setTimeout(() => {
      toast.success('Delivery Address Deleted Successfully', {
        position: 'top-right',
      });
      getAddressList();
      if (currentAddress === addkey) {
        setCurrentAddress(0);
      }
      document.body.classList.remove('spinner');
    }, 1000);
  };
  useEffect(() => {
    getAddressList();
  }, []);
  const { handleSubmit, setFieldValue, values, touched, errors } = formik;
const handleChange = (e) => {
    setcheckval(!checkval);
  };

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

        <Row>
          <Col xs="12" className="col-lg order-1 order-lg-0">
            {/* Address Start */}
            <h2 className="small-title">
              Pick Delivery Address{' '}
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  addAddress();
                }}
              >
                Add
              </button>
            </h2>
            <Form>
              <Row>
                {address.length === 0 && (
                  <Col xs="6" style={{ marginTop: '15px', marginBottom: '15px' }}>
                    <h5 className="form-check custom-card w-100 position-relative p-0 m-0">
                      You don't have any delivery address. Please Add Address to Proceed
                    </h5>
                  </Col>
                )}
                {address &&
                  address.map(function (add, a) {
                    // console.log('add', add);
                    return (
                      <Col xs="12" md="6" lg="6" sm="6" key={a} style={{ marginTop: '15px', marginBottom: '15px' }}>
                        <label className="form-check custom-card w-100 position-relative p-0 m-0">
                          <input
                            type="radio"
                            value={a}
                            className="form-check-input position-absolute e-2 t-2 z-index-1"
                            name="selectedaddress"
                            checked={a === currentAddress}
                            onChange={() => {
                              setCurrentAddress(a);
                            }}
                          />
                          <span className="card form-check-label w-100 " style={{ marginBottom: '0px' }}>
                            <span className="card-body text-center">
                              <CsLineIcons icon="pin" className="cs-icon icon text-primary" />
                              <span className="heading mt-3 text-body text-primary d-block">{`${add.first_name} ${add.last_name}`}</span>
                              <span className="fw-medium text-muted d-block">{`${add.address}`}</span>
                              <span className="fw-medium text-muted d-block">{`${add.city} ${add.state} - ${add.zipcode}`}</span>
                              <span className="fw-medium text-muted d-block">
                                <CsLineIcons icon="phone" className="cs-icon icon text-primary" />
                                {`${add.phone}`}
                              </span>
                            </span>
                          </span>
                          <span className="fw-medium text-center d-block">
                            <br/>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => {
                                editAddress(add.id, a);
                              }}
                            >
                              Edit
                            </button>
                            &nbsp;
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => {
                                deleteAddress(add.id, a);
                              }}
                            >
                              Delete
                            </button>
                          </span>
                        </label>
                      </Col>
                    );
                  })}
                {errors.selectedaddress && touched.selectedaddress && (
                  <div style={{ position: 'inherit', transform: 'initial' }} className="d-block invalid-tooltip">
                    {errors.selectedaddress}
                  </div>
                )}
              </Row>
            </Form>

            {/* Address End */}
          </Col>
          <Col lg="auto" className="order-0 order-lg-1">
            <h2 className="small-title">Summary</h2>
            <Card className="mb-5 w-100 sw-lg-35">
              <Card.Body>
                <div className="mb-3">
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
                        <span className="text-small text-muted">&#x20B9;.</span> {cart.cartTotalAmount}
                      </span>
                    </p>
                  </div>

                  <div className="mb-2">
                    <p className="text-small text-muted mb-1">GRAND TOTAL</p>
                    <div className="cta-2">
                      <span>
                        <span className="text-small text-muted cta-2">&#x20B9;.</span> {cart.cartTotalAmount}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="form-check mb-4">

<br/>
                  <div className="text-small">1. GST / Other taxes are additional to the cost indicated in the Cart section,<br/> and will reflect in the final Billing</div>
                  <div className="text-small">2. Dunzo Delivery Charges will be extra as applicable for your Order,<br/> and will reflect in the final Billing</div>
                  <div className="text-small">3. Packaging Charges for Take away Orders will be charged extra as applicable<br/> for your Order, and will reflect in the final Billing</div>
                  <input type="checkbox" className="form-check-input" name="terms" onChange={handleChange} />
                   <label className="form-check-label">
                    I have read and accept the{' '}
                    {/* <NavLink to="/" target="_blank"> */}
                      terms and conditions.
                    {/* </NavLink> */}
                  </label>

                 {/*  {errors.terms && touched.terms && (
                    <div style={{ position: 'inherit', transform: 'initial' }} className="d-block invalid-tooltip">
                      {errors.terms}
                    </div>
                  )} */}
                </div>
                {address.length > 0 ? (
                  <Button disabled={!checkval} className="btn-icon btn-icon-end w-100" variant="primary" type="Submit" onClick={handleSubmit}>
                    <span>Place Order</span> <CsLineIcons icon="chevron-right" />
                  </Button>
                ) : (
                  ''
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <DeliveryAddressAddEdit
          currentAdress={editableAddress}
          addItem={addItem}
          editItem={editItem}
          staticBackdropExample={staticBackdropExample}
          setStaticBackdropExample={setStaticBackdropExample}
        />
	<Row style={{marginBottom:"10%"}}>
	<col />
	</Row>
      </Layout>
    </>
  );
};

export default Categories;
