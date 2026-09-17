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
import { cpLoading, cpSuccess, cpFail } from './ChangePasswordSlice';

const ChangePassword = () => {
  const title = 'Change Password';
  const description = 'Change Password';
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { isLogin, currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    // console.log('currentUser', currentUser);
    if (!currentUser.membercode) {
      history.push('/');
    } else if (currentUser.type !== 'U') {
      history.push('/InvalidAccess');
    }
  }, [currentUser, history]);
  const lastlogin = '';

  const validationSchema = Yup.object().shape({
    oldpassword: Yup.string().required('old password is required'),
    newpassword: Yup.string().required('new password is required'),
    confirmpassword: Yup.string()
      .required('confirm password is required')
      .oneOf([Yup.ref('newpassword'), null], 'Passwords must match'),
  });
  const initialValues = { oldpassword: '', newpassword: '', confirmpassword: '', membercode: currentUser.membercode };
  // eslint-disable-next-line consistent-return
  const onSubmit = async (values, { resetForm }) => {
    document.body.classList.add('spinner');
    await axios
      .post(`${API_URL}member/changePassword`, values)
      .then((response) => {
        // console.log(response);
        if (response.data.success == '1') {
          toast.success('Your password has been updated Successfully', {
            position: 'top-right',
          });
          // dispatch(cpSuccess(response));
          document.body.classList.remove('spinner');
          resetForm({ values: '' });
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
  const currentMonth = new Date().toLocaleString('en', { month: 'long' });
  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  return (
    <>
      <HtmlHead title={title} description={description} />
      <Layout>
        <div className="page-title-container">
          <Row>
            {/* Title Start */}
            <Col md="12">
              <h1 className="mb-0 pb-0 c-text display-3">Welcome {currentUser.name}</h1>
            </Col>
            {/* Title End */}
          </Row>
        </div>
        {/* Title and Top Buttons End */}

        <h2 className="c-text display-6">Change Password</h2>
        {/* Bordered Tables Start */}
        <section className="scroll-section" id="borderedTables">
          <Card body className="mb-5">
            <form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 filled form-group tooltip-end-top">
                <Form.Label>Old Password</Form.Label>
                <Form.Control type="password" name="oldpassword" onChange={handleChange} value={values.oldpassword} />
                {errors.oldpassword && touched.oldpassword && <div className="d-block invalid-tooltip">{errors.oldpassword}</div>}
              </Form.Group>
              <Form.Group className="mb-3 filled form-group tooltip-end-top">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" name="newpassword" onChange={handleChange} value={values.newpassword} />
                {errors.newpassword && touched.newpassword && <div className="d-block invalid-tooltip">{errors.newpassword}</div>}
              </Form.Group>
              <Form.Group className="mb-3 filled form-group tooltip-end-top">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" name="confirmpassword" onChange={handleChange} value={values.confirmpassword} />
                {errors.confirmpassword && touched.confirmpassword && <div className="d-block invalid-tooltip">{errors.confirmpassword}</div>}
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

export default ChangePassword;
