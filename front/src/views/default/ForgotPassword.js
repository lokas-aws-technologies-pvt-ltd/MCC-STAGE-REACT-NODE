import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
// eslint-disable-next-line import/named
import { forgotPasswordPending, forgotPasswordSuccess, forgotPasswordFail, forgotPasswordReset } from '../../auth/authSlice';
import { forgotPassword } from '../../api/authapi';

const ForgotPassword = () => {
  const title = 'Forgot Password';
  const description = 'Forgot Password Page';
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { isPWLoading, pwSent, pwError } = useSelector((state) => state.auth);
  const validationSchema = Yup.object().shape({
    membercode: Yup.string().required('Member Code is required'),
    email: Yup.string().email().required('Email is required'),
  });
  const initialValues = { email: '', membercode: '' };
  // const onSubmit = (values) => console.log('submit form', values);

  // eslint-disable-next-line consistent-return
  const onSubmit = async (e, { resetForm }) => {
    // 	e.preventDefault();

    // console.log(e);

    dispatch(forgotPasswordPending());

    try {
      // eslint-disable-next-line no-shadow
      const isAuth = await forgotPassword(e);

      if (isAuth.status === 'error') {
        return dispatch(forgotPasswordFail('Please Enter valid Credentials '));
      }
      // console.log('isAuth',isAuth);
      if (isAuth.success === '1') {
        //  console.log('isAuth1',isAuth);
        dispatch(forgotPasswordSuccess());
        resetForm();
      } else {
        return dispatch(forgotPasswordFail('Please Enter valid Credentials '));
        
      }
      setTimeout(() => {
        dispatch(forgotPasswordReset());
        
      }, 3000);
      //	history.push("/dashboard");
      // eslint-disable-next-line no-shadow
    } catch (error) {
      dispatch(forgotPasswordFail('Network Issue Please connect later '));
      setTimeout(() => {
        dispatch(forgotPasswordReset());
      }, 3000);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const leftSide = (
    <div className="min-h-100 d-flex align-items-center">
      <div className="w-100 w-lg-75 w-xxl-50">
        <div>
          <div className="mb-5 h6 text-white lh-1-5 " style={{ width: 'max-content' }}>
            <h1 className="display-3 text-white">Welcome To</h1>
            <h1 className="display-3 text-white">Madras Cricket Club</h1>
          </div>
        </div>
      </div>
    </div>
  );

  const rightSide = (
    <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-50 px-5">
        <div className="sh-11">
          <NavLink to="/home">
            <img src="/assets/images/logo.png" alt="Madras Cricket Club" />
          </NavLink>
        </div>
        <div className="mb-5">
          <h2 className="cta-1 mb-0 text-primary">Password is gone?</h2>
          <h2 className="cta-1 text-primary">Let's reset it!</h2>
        </div>
        <div className="mb-5">
          <p className="h6">Please enter your member code and email to receive a link to reset your password.</p>
          <p className="h6">
            If you are a member, please <NavLink to="/login">login</NavLink>.
          </p>
        </div>
        <div>
          
          <form id="forgotPasswordForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="user" />
              <Form.Control type="text" name="membercode" placeholder="Member Code" value={values.membercode} onChange={handleChange} />
              {errors.membercode && touched.membercode && <div className="d-block invalid-tooltip">{errors.membercode}</div>}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="email" />
              <Form.Control type="text" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
              {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
            </div>
            <Button size="lg" type="submit">
              Send Reset Email
            </Button>
            {isPWLoading && <Spinner variant="primary" animation="border" />}
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <HtmlHead title={title} description={description} />
      <LayoutFullpage left={leftSide} right={rightSide} />
    </>
  );
};

export default ForgotPassword;
