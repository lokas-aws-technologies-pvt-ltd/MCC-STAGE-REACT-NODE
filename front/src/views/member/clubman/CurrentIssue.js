/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-danger */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import { useHistory, useLocation, NavLink } from 'react-router-dom';

import HtmlHead from 'components/html-head/HtmlHead';
import Layout from 'layout/Layout';
// import Page from 'http://localhost:3000/magazine/index.html';

const CurrentIssue = () => {
  const title = 'Current Issue';
  const description = 'Current Issue';
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  console.log('location', window.location.origin);
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

  return (
    <>
      <HtmlHead title={title} description={description} />
      <Layout>
        {/* Bordered Tables Start */}
        <iframe
          src={`${window.location.origin}/magazine/index.html`}
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          width="100%"
          height="100vh"
          title="Clubman"
          style={{ border: 'none', width: '100%', height: '3000px' }}
        />
        {/* Bordered Tables End */}
      </Layout>
    </>
  );
};

export default CurrentIssue;
