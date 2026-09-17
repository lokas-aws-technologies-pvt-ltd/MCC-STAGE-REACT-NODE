import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import { loginTroubleFail, loginTroublePending, loginTroubleSuccess } from '../../auth/authSlice';
import { loginTrouble } from '../../api/authapi';

const LoginTrouble = () => {
  const title = 'Login Trouble';
  const description = 'Forgot Password Page';

  const dispatch = useDispatch();

  const { isLTLoading, ltSent, ltError } = useSelector((state) => state.auth);
  const validationSchema = Yup.object().shape({
    membercode: Yup.string().required('Member Code is required'),
    email: Yup.string().email().required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
  });
  const initialValues = { email: '', membercode: '', subject: 'MCC - Trouble login', message: '' };
  // eslint-disable-next-line consistent-return
  const onSubmit = async (e, { resetForm }) => {
    // 	e.preventDefault();
    // dispatch(loginTroublePending());

    try {
      // eslint-disable-next-line no-shadow
      const logint = await loginTrouble(e);

      if (logint.status === 'error') {
        return dispatch(loginTroubleFail('Please Enter correct details '));
      }
      // console.log('isAuth',isAuth);
      if (logint.success === '1') {
        //  console.log('isAuth1',isAuth);
        dispatch(loginTroubleSuccess());
        resetForm({ e: '' });
      } else {
        return dispatch(loginTroubleFail('Please Enter correct details '));
      }
      // dispatch(getUserProfile());
      //	history.push("/dashboard");
      // eslint-disable-next-line no-shadow
    } catch (error) {
      dispatch(loginTroubleFail('Network Issue Please connect later '));
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
          <h2 className="cta-1 mb-0 text-primary">Error logged in support</h2>
        </div>
        <div className="mb-5">
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
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="cs-file-text" />
              <Form.Control type="text" name="subject" placeholder="Subject" value={values.subject} onChange={handleChange} />
              {errors.subject && touched.subject && <div className="d-block invalid-tooltip">{errors.subject}</div>}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <Form.Control type="text" as="textarea" name="message" placeholder="Message" value={values.message} onChange={handleChange} />
              {errors.message && touched.message && <div className="d-block invalid-tooltip">{errors.message}</div>}
            </div>
            <Button size="lg" type="submit">
              Send Email
            </Button>
            {isLTLoading && <Spinner variant="primary" animation="border" />}
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

export default LoginTrouble;
