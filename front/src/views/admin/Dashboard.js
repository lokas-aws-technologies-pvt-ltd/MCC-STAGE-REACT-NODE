/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { Row, Col, Card, Nav, Tab, Dropdown, Table } from 'react-bootstrap';
import classNames from 'classnames';
import { useWindowSize } from 'hooks/useWindowSize';
import HtmlHead from 'components/html-head/HtmlHead';
import Layout from 'layout/Layout';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import {
  chamberOrderInfoFail,
  chamberOrderInfoPending,
  chamberOrderInfoSuccess,
  chamberRequestInfoFail,
  chamberRequestInfoPending,
  chamberRequestInfoSuccess,
  reportInfoFail,
  reportInfoPending,
  reportInfoSuccess,
  txnInfoFail,
  txnInfoPending,
  txnInfoSuccess,
  dashboardInfoFail,
  dashboardInfoPending,
  dashboardInfoSuccess,
} from './dashboardSlice';
import { getTxninfo, getChambeReqrinfo, getOrderrinfo, viewReports, viewDashboard } from '../../api/adminDashboard';

const MoreItemToggle = React.forwardRef(({ onClick, parentClassname }, ref) => (
  <a
    ref={ref}
    className={classNames('btn btn-icon btn-icon-only', {
      'btn-foreground mt-2': parentClassname.indexOf('nav-tabs-title') === -1,
      'btn-background pt-0 bg-transparent pe-0': parentClassname.indexOf('nav-tabs-title') > -1,
    })}
    href="#/"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <CsLineIcons icon="more-horizontal" size="20" />
  </a>
));

MoreItemToggle.displayName = 'MoreItemToggle';

// eslint-disable-next-line no-unused-vars
const ResponsiveNav = React.forwardRef(({ className, children }, ref) => {
  const innerRef = React.createRef();
  const [collapseIndex, setCollapseIndex] = useState(children.length);
  const [childSteps, setChildSteps] = useState([]);
  const { width } = useWindowSize();

  const setSteps = () => {
    const steps = [];
    const currentChildren = innerRef.current.children;
    let totalWidth = 0;
    for (let i = 0; i < currentChildren.length; i += 1) {
      totalWidth += currentChildren[i].clientWidth;
      steps.push(totalWidth);
    }
    setChildSteps(steps);
  };
  const checkCollapseIndex = () => {
    const navWidth = innerRef.current.clientWidth;
    let checkedCollapseIndex = childSteps.filter((x) => x < navWidth).length;
    if (checkedCollapseIndex < children.length) {
      checkedCollapseIndex = childSteps.filter((x) => x < navWidth - 50).length;
    }
    if (checkedCollapseIndex !== collapseIndex) {
      setCollapseIndex(checkedCollapseIndex);
    }
  };
  useEffect(() => {
    setSteps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (width && childSteps.length > 0) {
      checkCollapseIndex();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    <div ref={innerRef} className={className}>
      {children.slice(0, collapseIndex)}
      {collapseIndex !== children.length && (
        <Dropdown className={classNames('nav-item ms-auto pe-0')} alignRight>
          <Dropdown.Toggle as={MoreItemToggle} parentClassname={className} />
          <Dropdown.Menu>{children.slice(collapseIndex, children.length)}</Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
});

ResponsiveNav.displayName = 'ResponsiveNav';

const Dashboard = () => {
  const title = 'Admin :: Dashboard';
  const description = 'Admin :: Dashboard';
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { isLogin, currentUser } = useSelector((state) => state.auth);
  const [currentTab, setcurrentTab] = useState('chamberinfo');

  const {
    txnInfoLoading,
    txnInfoerror,
    chamberRequestInfoLoading,
    chamberRequestInfoerror,
    chamberOrderInfoLoading,
    chamberOrderInfoerror,
    reportInfoLoading,
    reportInfoerror,
    txnInfo,
    chamberRequestInfo,
    chamberOrderInfo,
    reportInfo,
    dashboardInfo,
    dashboardInfoLoading,
  } = useSelector((state) => state.adminDashboard);

  const breadcrumbs = [{ to: '', text: 'Home' }];
  useEffect(() => {
    // console.log('currentUser', currentUser);
    if (!currentUser.membercode) {
      history.push('/');
    } else if (currentUser.type !== 'A') {
      history.push('/unauthorized');
    }
  }, [currentUser, history]);

  useEffect(() => {
    /*  // eslint-disable-next-line consistent-return
    async function fetchChamberOrderInfo() {
      dispatch(chamberOrderInfoPending());
      try {
        // eslint-disable-next-line no-shadow
        const statement = await getOrderrinfo();

        if (statement.status === 'error') {
          return dispatch(chamberOrderInfoFail('Please Enter valid Credentials '));
        }

        if (statement.success === 1) {
          // console.log('statement', statement.result);

          dispatch(chamberOrderInfoSuccess(statement.result));
        } else {
          dispatch(chamberOrderInfoFail('Unable to fetch Member Statement'));
        }
        // dispatch(getUserProfile());
        //	history.push("/dashboard");
        // eslint-disable-next-line no-shadow
      } catch (error) {
        dispatch(chamberOrderInfoFail('Network Issue Please connect later '));
      }
    }
    // eslint-disable-next-line consistent-return
    async function fetchTransactionInfo() {
      dispatch(txnInfoPending());
      try {
        // eslint-disable-next-line no-shadow
        const CurrentMonthTxn = await getTxninfo();

        if (CurrentMonthTxn.status === 'error') {
          return dispatch(txnInfoFail('Please Enter valid Credentials '));
        }

        if (CurrentMonthTxn.success === 1) {
          // console.log('trasinfo', CurrentMonthTxn);
          dispatch(txnInfoSuccess(CurrentMonthTxn.result));
        } else {
          return dispatch(txnInfoFail('Please Enter valid Credentials '));
        }
        // dispatch(getUserProfile());
        //	history.push("/dashboard");
        // eslint-disable-next-line no-shadow
      } catch (error) {
        dispatch(txnInfoFail('Network Issue Please connect later '));
      }
    }
    // eslint-disable-next-line consistent-return
    async function fetchChamberReqInfo() {
      dispatch(chamberRequestInfoPending());
      try {
        // eslint-disable-next-line no-shadow
        const CurrentMonthTxn = await getChambeReqrinfo();

        if (CurrentMonthTxn.status === 'error') {
          return dispatch(chamberRequestInfoFail('Please Enter valid Credentials '));
        }

        if (CurrentMonthTxn.success === 1) {
          dispatch(chamberRequestInfoSuccess(CurrentMonthTxn.result));
        } else {
          return dispatch(chamberRequestInfoFail('Please Enter valid Credentials '));
        }
        // dispatch(getUserProfile());
        //	history.push("/dashboard");
        // eslint-disable-next-line no-shadow
      } catch (error) {
        dispatch(chamberRequestInfoFail('Network Issue Please connect later '));
      }
    }
    // eslint-disable-next-line consistent-return
    async function fetchReportInfo() {
      dispatch(reportInfoPending());
      try {
        // eslint-disable-next-line no-shadow
        const CurrentMonthTxn = await viewReports();

        if (CurrentMonthTxn.status === 'error') {
          return dispatch(reportInfoFail('Please Enter valid Credentials '));
        }

        if (CurrentMonthTxn.success === 1) {
          dispatch(reportInfoSuccess(CurrentMonthTxn.result));
        } else {
          return dispatch(reportInfoFail('Please Enter valid Credentials '));
        }
        // dispatch(getUserProfile());
        //	history.push("/dashboard");
        // eslint-disable-next-line no-shadow
      } catch (error) {
        dispatch(reportInfoFail('Network Issue Please connect later '));
      }
    } */

    async function fetchAdminDashboardData() {
      dispatch(dashboardInfoPending());
      try {
        // eslint-disable-next-line no-shadow
        const CurrentMonthTxn = await viewDashboard(currentUser.membercode, currentUser.type);
        // console.log('CurrentMonthTxn', CurrentMonthTxn);
        if (CurrentMonthTxn.status === 'error') {
          return dispatch(dashboardInfoFail('Please Enter valid Credentials '));
        }

        if (CurrentMonthTxn.success == 1) {
          dispatch(dashboardInfoSuccess(CurrentMonthTxn));
        } else {
          return dispatch(dashboardInfoFail('Please Enter valid Credentials '));
        }
        // dispatch(getUserProfile());
        //	history.push("/dashboard");
        // eslint-disable-next-line no-shadow
      } catch (error) {
        dispatch(dashboardInfoFail('Network Issue Please connect later '));
      }
    }
    // fetchStatementData(memberCode, year, month);
    // fetchTransactionData(memberCode);
    fetchAdminDashboardData();

    /* if (currentTab === 'chamberinfo') {
      fetchChamberReqInfo();
      fetchChamberOrderInfo();
    } else if (currentTab === 'transactioninfo') {
      fetchTransactionInfo();
    } else if (currentTab === 'lastfileinfo') {
      fetchReportInfo();
    } */
  }, []);

  const handleSelect = (e) => {
    setcurrentTab(e);
    // console.log(e);
  };
  const currentMonth = new Date().toLocaleString('en', { month: 'long' });
  const date = new Date();
  const previousMonth = new Date(date.getFullYear(), date.getMonth() - `${1}`).toLocaleString('en', { month: 'long' });
  /* console.log('chamberOrderInfo', chamberOrderInfo);
  console.log('chamberRequestInfo',chamberRequestInfo); 
   console.log('reportInfo',reportInfo); 
console.log('txnInfo', txnInfo); */
  // console.log(current(state));
  // console.log('dashboardInfo', dashboardInfo);
  const arr = [];
  if(dashboardInfo.data){
    Object.keys(dashboardInfo.data).forEach((key) => arr.push({ name: key, value: dashboardInfo.data[key] }));
  }
  // console.log('arra', arr);
  return (
    <>
      <HtmlHead title={title} description={description} />
      <Layout>
        <div className="page-title-container">
          <Row>
            {/* Title Start */}
            <Col md="7">
              <h1 className="mb-0 pb-0 display-4">{title}</h1>
              <BreadcrumbList items={breadcrumbs} />
            </Col>
            {/* Title End */}
          </Row>
        </div>
        {/* Title and Top Buttons End */}
	<div>
		<Row>
			<Col>
				<p style={{textAlign:'center'}}><h1>Welcome Back Admin</h1></p> 
			</Col>

		</Row>
	</div>
      </Layout>
    </>
  );
};

export default Dashboard;
