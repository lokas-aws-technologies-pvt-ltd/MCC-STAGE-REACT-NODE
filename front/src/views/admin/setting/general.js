/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Row, Col, Card, ProgressBar, Table, Alert, Spinner, Modal } from 'react-bootstrap';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import HtmlHead from 'components/html-head/HtmlHead';
import { toast } from 'react-toastify';
import Layout from 'layout/Layout';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import axios from 'axios';
import { API_URL } from 'config.js';


const general = () => {
  const title = 'General Settings';
  const description = 'General Settings';
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { isLogin, currentUser } = useSelector((state) => state.auth);
  const emptyItem = { phone: '', email: '', address: '',year:'',clubtime:'',officetime:'' };
  const [data, setData] = useState(emptyItem);
  const lastlogin = '';

  const validationSchema = Yup.object().shape({
    phone: Yup.string().required('Tellphone No is required'),
    email: Yup.string().required('General Email is required').email('Enter Valid Email'),
    address: Yup.string().required('Postal Address is required'),
    year : Yup.string().required('Current Year is required'),
    clubtime : Yup.string().required('Club time is required'),
    officetime : Yup.string().required('Office time is required'),
    
  });
   
  // eslint-disable-next-line consistent-return
  const onSubmit = async (values, { resetForm }) => {
    document.body.classList.add('spinner');
    await axios
      .post(`${API_URL}general/general_update`, values)
      .then((response) => {
        // console.log(response);
        if (response.data.success == '1') {
          toast.success('Data has been updated Successfully', {
            position: 'top-right',
          });
          // dispatch(cpSuccess(response));
          document.body.classList.remove('spinner');
        //   resetForm({ values: '' });
        } else {
          toast.error(response.data.error, {
            position: 'top-right',
          });
          // dispatch(cpFail(response));
          document.body.classList.remove('spinner');
        }
        // return true // pass to finish
      })
      .catch((error) => {
        console.log(error);
        toast.error(error, {
          position: 'top-right',
        });
        document.body.classList.remove('spinner');
        // dispatch(cpFail(error))
      });
  };

  const fetchData = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}general/general_get`, { params: {  } });

    setTimeout(() => {
      
      setData(response.data.result[0]);
      
      document.body.classList.remove('spinner');
    }, 1000);
  }, []);
  useEffect(() => {
    fetchData();
  }, []);

//   useEffect(() => {
//     initialValues=data;   
    
//   }, [data]);
const initialValues = data;
  const currentMonth = new Date().toLocaleString('en', { month: 'long' });
  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange,setFieldValue, values, touched, errors } = formik;
  useEffect(() => {
    if (data) {
      // get user and set form fields
      const fields = ['phone', 'email', 'address', 'year','clubtime','officetime'];
      fields.forEach((field) => {
        // console.log('selectedItem', selectedItem[field]);
        setFieldValue(field, data[field], false);
      });
      // values = selectedItem;
    }
  }, [data]);

  return (
    <>
      <HtmlHead title={title} description={description} />
      <Layout>
        <div className="page-title-container">
          <Row>
            {/* Title Start */}
            <Col md="12">
              <h1 className="mb-0 pb-0 c-text display-3">General Settings</h1>
            </Col>
            {/* Title End */}
          </Row>
        </div>
        {/* Title and Top Buttons End */}

        <h2 className="c-text display-6">Information</h2>
        {/* Bordered Tables Start */}
        <section className="scroll-section" id="borderedTables">
          <Card body className="mb-5">
            <form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 filled form-group tooltip-end-top">
                <Form.Label>Telephone No</Form.Label>
                <Form.Control type="text" name="phone" onChange={handleChange} defaultValue={data ? data.phone : values.phone} />
                {errors.phone && touched.phone && <div className="d-block invalid-tooltip">{errors.phone}</div>}
              </Form.Group>
              <Form.Group className="mb-3 filled form-group tooltip-end-top">
                <Form.Label>General Email</Form.Label>
                <Form.Control type="email" name="email" onChange={handleChange} defaultValue={data ? data.email :values.email} />
                {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
              </Form.Group>
              <Form.Group className="mb-3 filled form-group tooltip-end-top">
                <Form.Label>Postal Address</Form.Label>
                <Form.Control   type="text" as="textarea" name="address" onChange={handleChange} defaultValue={data ? data.address :values.address} />
                {errors.address && touched.address && <div className="d-block invalid-tooltip">{errors.address}</div>}
              </Form.Group>
              <Form.Group className="mb-3 filled form-group tooltip-end-top">
                <Form.Label>Current Year</Form.Label>
                <Form.Control type="text" name="year" onChange={handleChange} defaultValue={data ? data.year : values.year} />
                {errors.year && touched.year && <div className="d-block invalid-tooltip">{errors.year}</div>}
              </Form.Group>

              <Form.Group className="mb-3 filled form-group tooltip-end-top">
                <Form.Label>Club Time</Form.Label>
                <Form.Control type="text" name="clubtime" onChange={handleChange} defaultValue={data ? data.clubtime : values.clubtime} />
                {errors.clubtime && touched.clubtime && <div className="d-block invalid-tooltip">{errors.clubtime}</div>}
              </Form.Group>

              <Form.Group className="mb-3 filled form-group tooltip-end-top">
                <Form.Label>Office Time</Form.Label>
                <Form.Control type="text" name="officetime" onChange={handleChange} defaultValue={data ? data.officetime : values.officetime} />
                {errors.officetime && touched.officetime && <div className="d-block invalid-tooltip">{errors.officetime}</div>}
              </Form.Group>
              <Button type="submit">Submit</Button>
            </form>
          </Card>
        </section>
        {/* Bordered Tables End */}
      </Layout>
    </>
  );
};

export default general;
