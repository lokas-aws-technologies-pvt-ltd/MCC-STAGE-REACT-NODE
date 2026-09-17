/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Row, Col, Card, ProgressBar, Table, Alert, Spinner,Modal } from 'react-bootstrap';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { moment } from 'moment';
import axios from 'axios';
import { SERVICE_URL, API_URL } from 'config.js';

import { toast } from 'react-toastify';
import HtmlHead from 'components/html-head/HtmlHead';
import Layout from 'layout/Layout';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { loginPending, loginSuccess, loginFail } from '../../auth/authSlice';
import { orderLoading, orderSuccess, orderFail, paymentSuccess, paymentFail } from '../../razorpayment/razorSlice';
import { razorOrder, razorPayment } from '../../api/razorpayapi';
import { viewStatementmonth, getCurrentMonthTxn, getMemberViewStatement } from '../../api/memberViewStatement';
import {
  viewStatementmonthPending,
  viewStatementmonthSuccess,
  viewStatementmonthFail,
  getCurrentMonthTxnPending,
  getCurrentMonthTxnFail,
  getCurrentMonthTxnSuccess,
  getMemberViewStatementFail,
  getMemberViewStatementPending,
  getMemberViewStatementSuccess,
} from './viewStatementSlice';

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const ViewStatement = () => {
  const title = 'View Statement';
  const description = 'View Statement';
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { razorisLoading, razorerror } = useSelector((state) => state.razor);
  const { isLogin, currentUser } = useSelector((state) => state.auth);
  const { isLoading, error, memberStatementmonth, memberTranscation, memberViewStatement } = useSelector((state) => state.memberStatement);
  const [show, setShow] = useState(false);
  const [mcode, setmcode] = useState('');
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const memberCode = currentUser.membercode;
    // const newmemcodetest = 'AM046';
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    // eslint-disable-next-line consistent-return
    /* async function fetchStatementData(memberCode,year, month) {
      dispatch(viewStatementmonthPending());
      try {
        // eslint-disable-next-line no-shadow
        const statement = await viewStatementmonth(memberCode, year, month);
        if (statement.status === 'error') {
          return dispatch(viewStatementmonthFail('Please Enter valid Credentials '));
        }
  
        if (statement.success === 1) {
          dispatch(viewStatementmonthSuccess(statement));
        } else {
          dispatch(viewStatementmonthFail('Unable to fetch Member Statement'));
        }
        // dispatch(getUserProfile());
        //	history.push("/dashboard");
        // eslint-disable-next-line no-shadow
      } catch (error) {
        dispatch(viewStatementmonthFail('Network Issue Please connect later '));
      }
    }
    // eslint-disable-next-line consistent-return
    async function fetchTransactionData(memberCode) {
      dispatch(getCurrentMonthTxnPending());
      try {
        // eslint-disable-next-line no-shadow
        const CurrentMonthTxn = await getCurrentMonthTxn(memberCode);
        console.log('CurrentMonthTxn', CurrentMonthTxn);
        if (CurrentMonthTxn.status === 'error') {
          return dispatch(getCurrentMonthTxnFail('Please Enter valid Credentials '));
        }
  
        if (CurrentMonthTxn.success === 1) {
          dispatch(getCurrentMonthTxnSuccess(CurrentMonthTxn));
        } else {
          return dispatch(getCurrentMonthTxnFail('Please Enter valid Credentials '));
        }
        // dispatch(getUserProfile());
        //	history.push("/dashboard");
        // eslint-disable-next-line no-shadow
      } catch (error) {
        dispatch(getCurrentMonthTxnFail('Network Issue Please connect later '));
      }
    } */

    async function fetchMemberViewStatementData() {
      dispatch(getMemberViewStatementPending());
      try {
        // eslint-disable-next-line no-shadow
        const CurrentMonthTxn = await getMemberViewStatement(memberCode);
        // console.log('CurrentMonthTxn', CurrentMonthTxn.success);
        if (CurrentMonthTxn.status === 'error') {
          return dispatch(getMemberViewStatementFail('Please Enter valid Credentials '));
        }

        if (CurrentMonthTxn.success == 1) {
          dispatch(getMemberViewStatementSuccess(CurrentMonthTxn));
        } else {
          return dispatch(getMemberViewStatementFail('Please Enter valid Credentials '));
        }
        // dispatch(getUserProfile());
        //	history.push("/dashboard");
        // eslint-disable-next-line no-shadow
      } catch (error) {
        dispatch(getMemberViewStatementFail('Network Issue Please connect later '));
      }
    }
    // fetchStatementData(memberCode, year, month);
    // fetchTransactionData(memberCode);
    fetchMemberViewStatementData();
  }, [currentUser, dispatch]);

  useEffect(() => {
    //  console.log('currentUser', currentUser);
    if (!currentUser.membercode) {
      history.push('/');
    } else if (currentUser.type !== 'U') {
      history.push('/InvalidAccess');
    }
  }, [currentUser, history]);
  let lastlogin = '';
  if (currentUser.last_login) {
    lastlogin = new Date(currentUser.last_login).toLocaleString('en-IN');
    // console.log('lastlogin ', lastlogin.toString());
  }

  const validationSchema = Yup.object().shape({
    amount: Yup.number().positive().integer().min(100).required('Amount is requied is required'),
    memdescription: Yup.string().required('Description is required'),
  });
  const initialValues = { amount: '', memdescription: '', membercode: currentUser.membercode, payname: 'Razor Pay' };
  // eslint-disable-next-line consistent-return
  const onSubmit = async (e, { resetForm }) => {
    // 	e.preventDefault();
    dispatch(orderLoading());

    try {
      // eslint-disable-next-line no-shadow
      const orderdetail = await razorOrder(e);
      // console.log('orderdetail', orderdetail);
      if (orderdetail.status === 'error') {
        return dispatch(orderFail('Unable to process your payment. Please try again '));
      }
      if (orderdetail.id !== '') {
        dispatch(orderSuccess(orderdetail));
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

        if (!res) {
          alert('Razorpay SDK failed to load. Are you online?');
          return '';
        }

        const options = {
          key: 'rzp_live_e70DpTn3LMWHM2',
          currency: orderdetail.currency,
          amount: orderdetail.amount.toString() * 100,
          order_id: orderdetail.id,
          name: currentUser.membercode,
          description: 'Thank you for nothing. Please give us some money',
          image: 'http://staging.madrascricketclub.org/assets/images/logo.png',
          handler(response) {
            // console.log(response);
            dispatch(paymentSuccess(response));
            razorPayment({ transactionid: res.transactionid, razorpay_order_id: res.razorpay_order_id });
            alert('Payment Completed Successfully');
            resetForm({ e: '' });
          },
          prefill: {
            // eslint-disable-next-line no-restricted-globals
            name: currentUser.name,
            email: currentUser.email,
            contact: currentUser.mobile_no,
          },
          notes: {
            address: currentUser.postal_address,
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }
      // dispatch(getUserProfile());
      //	history.push("/dashboard");
      // eslint-disable-next-line no-shadow
    } catch (error) {
      dispatch(orderFail('Network Issue Please connect later '));
    }
  };
  const currentMonth = new Date().toLocaleString('en', { month: 'long' });
  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;
  /* console.log('memberStatementmonth', memberStatementmonth);
  console.log('isLoading', isLoading);
  console.log('error', error);
  console.log('memberTranscation', memberTranscation); */
  // console.log('memberViewStatement', memberViewStatement);
  let memberStatementmonthview = [];
  let memberTranscationview = [];
  let mnt = '';
  let LastMonth = '';
  let thisMonth = '';
  if (memberViewStatement) {
    memberStatementmonthview = memberViewStatement.result;
    memberTranscationview = memberViewStatement.getCurrentMonthTxn;
    mnt = memberViewStatement.mnt;
    LastMonth  = memberViewStatement.LastMonth;
    thisMonth = memberViewStatement.thisMonth;
  }

  const handleClose = () => 
  {
        setShow(false);
  }
  const handleShow = () => {

    setShow(true);
   
  }

  

  const handlechangemembercode = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const admincode=currentUser.createdby;
    // const response = await axios.get(`http://3.109.198.190:5000/dashboard/get_broadcast`, { params: { term, sortBy, pageSize, pageIndex } });
    const response = await axios.post(`${API_URL}member/membercodeavailable`, {  mcode,admincode  });

    setTimeout(() => {
     
      if (response.data.success === '1') {
         dispatch(loginSuccess(response.data));
         setShow(false);
      }
      else
      {
        toast.success('Please Enter valid Member Code', {
          position: 'top-right',
        });
        // return dispatch(loginFail('Please Enter valid Member Code '));
      }
     
      document.body.classList.remove('spinner');
    }, 1000);
  }, [mcode]);
  return (
    <>
      <HtmlHead title={title} description={description} />
      <Layout>
        <div className="page-title-container">

        
            {/* Title Start */}
            {/* {currentUser.membercode != currentUser.createdby && currentUser.access=='yes' &&
           <div align="right">
            <Button onClick={handleShow} >Change Member</Button>
            
            </div>
            } */}
            {/* Title End */}
            <br/>
          <Row>
            {/* Title Start */}
            <Col md="12">
              <h1 className="mb-0 pb-0 c-text display-3">Welcome {currentUser.name}</h1>
              <h1 className="mb-0 pb-0 c-text display-6">Your code is {currentUser.membercode} </h1>
              <h5 className="mb-0 pb-0 c-text display-8">Last login {lastlogin}</h5>
            </Col>
            {/* Title End */}
          </Row>
        </div>
        {/* Title and Top Buttons End */}

        <h2 className="c-text display-6">
          View Statement For
          {mnt !='' ? mnt : LastMonth}
        </h2>
        {/* Bordered Tables Start */}
        <section className="scroll-section" id="borderedTables">
          <Card body className="mb-5">
            <Table bordered>
              <thead>
                <tr>
                  <th scope="col">Opening Balance</th>
                  <th scope="col">Bill Amount</th>
                  <th scope="col">Received Amount</th>
                  <th scope="col">Closing Balance</th>
                </tr>
              </thead>
              <tbody>
                {memberStatementmonthview && memberStatementmonthview.length ? (
                  memberStatementmonthview.map((item) => {
                    return (
                      <tr key={item.billdate}>
                        <td>&#8377; {item.opening_balance_state}</td>
                        <td>&#8377; {item.bill_amount}</td>
                        <td>&#8377; {item.received_amount}</td>
                        <td>&#8377; {item.closing_amount_state}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="c-text">
                      <b>No Data</b>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card>
        </section>
        {/* Bordered Tables End */}

        <Row className="gy-5">
          {/* Recent Ratings Start */}
          <Col lg="12">
            {/* Latest Registrations Start */}

            <h2 className="small-title c-text display-6">Pay with Razor Pay</h2>
            <br />
            <Card body className="mb-5">
              {razorerror && <Alert variant="danger">{razorerror}</Alert>}
              <form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 filled form-group tooltip-end-top">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control type="text" name="amount" onChange={handleChange} value={values.amount} />
                  {errors.amount && touched.amount && <div className="d-block invalid-tooltip">{errors.amount}</div>}
                </Form.Group>
                <Form.Group className="mb-3 filled form-group tooltip-end-top">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" as="textarea" name="memdescription" onChange={handleChange} value={values.memdescription} />
                  {errors.memdescription && touched.memdescription && <div className="d-block invalid-tooltip">{errors.memdescription}</div>}
                </Form.Group>
                <Button type="submit">Pay</Button>
                {razorisLoading && <Spinner variant="primary" animation="border" />}
              </form>
            </Card>
          </Col>
          {/* Latest Registrations End */}
        </Row>

        <Row className="gy-5">
          {/* Recent Ratings Start */}
          <Col lg="12">
            <h2 className="small-title c-text display-6">
              Transactions For {thisMonth}
            </h2>
            <br />
            <div className="mb-n2">
              {/* Always Responsive Start */}
              <section className="scroll-section" id="alwaysResponsive">
                <Card body className="mb-5">
                  <Table>
                    <thead>
                      <tr>
                        <th scope="col">Transaction Date and Time</th>
                        <th scope="col">Order Id</th>
                        <th scope="col">Transaction Id</th>
                        <th scope="col">Transaction Amount (Rs.)</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead> 
                    <tbody>
                      {memberTranscationview && memberTranscationview.length ? (
                        memberTranscationview.map((item) => {
                          return (
                            <tr key={item.orderId}>
                              <td>{item.Txn_DateTime}</td>
                              <td>{item.orderId}</td>
                              <td>{item.transactionId}</td>
                              <td>&#8377; {item.transactionAmount}</td>
                              <td>
                                {/* item.status === '0' ? 'Pending' : 'Completed' */}
                                {item.status}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="5" className="c-text">
                            <b>No Data</b>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Card>
              </section>
              {/* Always Responsive End */}
            </div>
          </Col>
          {/* Recent Ratings End */}
        </Row>

        <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Change Member</Modal.Title>
              </Modal.Header>
              {/* <Modal.Body>(Same Template message)</Modal.Body> */}
              <Modal.Body>Member Code : <input type="text" name="member_code" id="member_code"  onChange={(e) => {
                      setmcode(e.target.value);
                    }}/></Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handlechangemembercode}>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>
      </Layout>
    </>
  );
};

export default ViewStatement;