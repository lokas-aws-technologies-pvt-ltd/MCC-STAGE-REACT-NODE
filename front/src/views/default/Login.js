// eslint-disable-next-line no-unused-vars
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
import { loginPending, loginSuccess, loginFail } from '../../auth/authSlice';
import { userLogin } from '../../api/authapi';

const Login = () => {
  const title = 'Login';
  const description = 'Login Page';
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { isLoading, isAuth, error, currentUser } = useSelector((state) => state.auth);
  const validationSchema = Yup.object().shape({
    membercode: Yup.string().required('Member Code is required'),
    // password: Yup.string().required('Password is required'),
    pin: Yup.number().positive().integer().required('Pin Number is required'),
  });
  const initialValues = { membercode: '', password: '', pin: '' };
  useEffect(() => {
     // console.log('currentUser', currentUser);
    if (currentUser.membercode) {
      if (currentUser.type === 'U') {
        history.push('/member/viewStatement');
      }
      if (currentUser.type === 'A') {
        history.push('/admin/dashboard');
      }
    }
  }, [currentUser, history]);
  // eslint-disable-next-line consistent-return

  // eslint-disable-next-line consistent-return
  const onSubmit = async (e) => {
    // 	e.preventDefault();

   // console.log(e);

    dispatch(loginPending());

    try {
      // eslint-disable-next-line no-shadow
      const isAuth = await userLogin(e);

      if (isAuth.status === 'error') {
        return dispatch(loginFail('Please Enter valid Credentials '));
      }

      if (isAuth.success === '1') {
        dispatch(loginSuccess(isAuth));
        // console.log('isAuth', isAuth);
        if (isAuth.type === 'U') {
          history.push('/member/viewStatement');
        }
        if (isAuth.type === 'A') {
          history.push('/admin/dashboard');
        }
      } else {
        return dispatch(loginFail('Please Enter valid Credentials '));
      }
      // dispatch(getUserProfile());
      //	history.push("/dashboard");
      // eslint-disable-next-line no-shadow
    } catch (error) {
      dispatch(loginFail('Network Issue Please connect later '));
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
        <div>
          <form id="loginForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="user" />
              <Form.Control type="text" name="membercode" placeholder="Member Code" value={values.membercode} onChange={handleChange} />

              {errors.membercode && touched.membercode && <div className="d-block invalid-tooltip">{errors.membercode}</div>}
            </div>
            {/* <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="lock-off" />
              <Form.Control type="password" name="password" onChange={handleChange} value={values.password} placeholder="Password" />
              <NavLink className="text-small position-absolute t-3 e-3" to="/forgot-password">
                Forgot?
              </NavLink>
              {errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
            </div> */}
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="building" />
              <Form.Control type="text" name="pin" onChange={handleChange} value={values.pin} placeholder="Pin" />
              <NavLink className="text-small position-absolute t-3 e-3" to="/forgot-pin">
                Forgot?
              </NavLink>
              {errors.pin && touched.pin && <div className="d-block invalid-tooltip">{errors.pin}</div>}
            </div>
            <Button size="lg" type="submit">
              Login
            </Button>
            {isLoading && <Spinner variant="primary" animation="border" />}
            <div className="mb-5">
              <h2 className="cta-1">
                if you have error logging in <NavLink to="/loginTrouble">Click here</NavLink>.
              </h2>
            </div>

            <div className="mb-5">
              <p className="h6">Member Code should start with character followed by numeric, Example : INST326, A001</p>
              {/* <p className="h6">First time member, Please use the member first time login to get password.</p>
              <p className="h6">If Member first time login password sent by MCC not working, Please use forgot password link.</p> */}
              <p className="h6">If Member first time login pin sent by MCC not working, Please use forgot pin link.</p>
            </div>
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

export default Login;
