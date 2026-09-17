/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
import React, { useEffect, useState,useRef  } from 'react';
import { Badge, Col, Form, Row, NavLink, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect, useRowState, useAsyncDebounce } from 'react-table';
import axios from 'axios';
import HtmlHead from 'components/html-head/HtmlHead';
import { toast } from 'react-toastify';
import Layout from 'layout/Layout';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { SERVICE_URL, API_URL } from 'config.js';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import Select from 'react-select';
import { CSVLink, CSVDownload } from "react-csv";

import ControlsPageSize from '../../interface/plugins/datatables/ServerSide/components/ControlsPageSize';
import Table from '../../interface/plugins/datatables/ServerSide/components/Table';
import TablePagination from '../../interface/plugins/datatables/ServerSide/components/TablePagination';

const PaymentList = () => {
  const title = 'Payment List';
  const description = 'Payment List Page';
  const breadcrumbs = [
    { to: '', text: 'Home' },
    
    { to: '/admin/report/payment', text: 'Payment List' },
  ];

  const columns = React.useMemo(() => {
    return [
      {
        Header: 'Member Code',
        accessor: 'memberCode',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
      {
        Header: 'Member Name',
        accessor: 'name',
        sortable: false,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
      {
        Header: 'Pay Date',
        accessor: 'create_date',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ cell }) => {
          const date = new Date(cell.value);
          return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        },
      },
      
      {
        Header: 'Transaction Amount',
        accessor: 'transactionAmount',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
       
      },

      {
        Header: 'Orderid',
        accessor: 'mccorderId',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      
        },
        
        
      /* { 
        Header: '',
        id: 'action',
        headerClassName: 'empty w-10',
        Cell: ({ row }) => {
          const { checked, onChange } = row.getToggleRowSelectedProps();
          return <Form.Check className="form-check float-end mt-1" type="checkbox" checked={checked} onChange={onChange} />;
        },
       }, */
    ];
  }, []);

  const [data, setData] = useState([]);
  const [totdata, settotData] = useState([]);
  const [pageCount, setPageCount] = React.useState(3);
  // const [pageSize, setPageSize] = React.useState('1');
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [term, setTerm] = useState('');
  const csvLink = useRef()
  const tableInstance = useTable(
    {
      columns,
      data,
      setData,
      // setPageSize,
      isOpenAddEditModal,
      setIsOpenAddEditModal,
      manualPagination: true,
      manualFilters: true,
      manualSortBy: true,
      autoResetPage: false,
      autoResetSortBy: false,
      pageCount,
      initialState: { pageIndex: 0, sortBy: [{ id: 'a.id', desc: false }], hiddenColumns: [] },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowState
  );
  const {
    state: { pageSize, pageIndex, sortBy },
  } = tableInstance;

  const current = new Date();
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const getGivenMonth = (monthVal, diffVal, subtract) => {
    const makeDate = new Date(monthVal);

    if (subtract) {
      makeDate.setMonth(makeDate.getMonth() - diffVal);
    }
    if (!subtract) {
      makeDate.setMonth(makeDate.getMonth() + diffVal);
    }
    const monReturn = `${month[makeDate.getMonth()]} - ${makeDate.getFullYear()}`;
    // console.log('After subtracting a month: ', monReturn);
    return monReturn;
  };

  const options = [
    { value: getGivenMonth(current, 3, true), label: getGivenMonth(current, 3, true) },
    { value: getGivenMonth(current, 2, true), label: getGivenMonth(current, 2, true) },
    { value: getGivenMonth(current, 1, true), label: getGivenMonth(current, 1, true) },
    { value: getGivenMonth(current, 0, false), label: getGivenMonth(current, 0, false) },
    { value: getGivenMonth(current, 1, false), label: getGivenMonth(current, 1, false) },
    { value: getGivenMonth(current, 2, false), label: getGivenMonth(current, 2, false) },
    { value: getGivenMonth(current, 3, false), label: getGivenMonth(current, 3, false) },
  ];
  const [monthSelected, setMonthSelected] = useState(getGivenMonth(current, 0, false));
  const handleSearchInputChange = (selectedOptionObj) => {
    setMonthSelected(selectedOptionObj.value);
    // console.log("selectedOptionObj", selectedOptionObj);
  };

  const fetchData = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}dashboard/payment_report`, { params: { term, sortBy, pageSize, pageIndex,monthSelected } });

    setTimeout(() => {
      // const { result } = response.data.result;
      // console.log('response', response.data);
      setData(response.data.result);
      setPageCount(response.data.pageCount);
      document.body.classList.remove('spinner');

      

    }, 1000);

    const responsetot = await axios.get(`${API_URL}dashboard/payment_report`, { params: { term, sortBy, monthSelected } });
    setTimeout(() => {
      // const { result } = response.data.result;
      // console.log('response', response.data);
      settotData(responsetot.data.result);
      

      

    }, 1000);
  }, [sortBy, pageIndex, pageSize, term,monthSelected]);
  const uploadConfig = {
    /* headers: { 'Accept': 'application/json',
     'Content-Type': 'multipart/form-data',
     } */
  };
  

  const searchItem = useAsyncDebounce((val) => {
    setTerm(val || undefined);
  }, 200);

  const getTransactionData = async () => {
    // 'api' just wraps axios with some setting specific to our app. the important thing here is that we use .then to capture the table response data, update the state, and then once we exit that operation we're going to click on the csv download link using the ref
    
    csvLink.current.link.click()
  }

  useEffect(() => {
    fetchData();
  }, [sortBy, fetchData, pageIndex, pageSize, term,monthSelected]);
  return (
    <>
      <HtmlHead title={title} description={description} />
      <Layout>
        <Row>
          <Col>
            <div className="page-title-container">
              <Row>
                <Col xs="12" md="7">
                  <h1 className="mb-0 pb-0 display-4">{title}</h1>
                  <BreadcrumbList items={breadcrumbs} />
                </Col>
                <Col xs="12" md="5" className="d-flex align-items-start justify-content-end">
                  {/* <ButtonsCheckAll tableInstance={tableInstance}  deleteItems={deleteItems} changeStatus={changeStatus} /> */}
                </Col>
              </Row>
            </div>

            <div>
              <Row className="mb-3">
              {/* <Col sm="12" md="5" lg="3" xxl="2">
                  <div className="d-inline-block float-md-start me-1 mb-1 mb-md-0 search-input-container w-100 shadow bg-foreground">
                    <ControlsSearch tableInstance={tableInstance} onChange={searchItem} />
                  </div>
                </Col> */}
                <Col sm="12" md="5" lg="3" xxl="2">
               
               
                    <Select
                      className="select" 
                      classNamePrefix="react-select "
                      options={options}
                      value={monthSelected}
                      onChange={handleSearchInputChange}
                      placeholder={monthSelected}
                    />
                  {/* <CSVLink data={data}/> */}

                  
                  <CSVLink
         data={totdata}
         filename='transactions.csv'
         className='hidden'
         ref={csvLink}
         target='_blank'
      />
                 
                </Col>
                <Col sm="12" md="7" lg="9" xxl="10" className="text-end">
                  
                  <div className="d-inline-block me-0 me-sm-3 float-start float-md-none">
                    <Button onClick={getTransactionData}>Download</Button>
                    {/*  <ControlsDelete tableInstance={tableInstance} deleteItems={deleteItems} /> */}
                  </div>
                  <div className="d-inline-block">
                    <ControlsPageSize tableInstance={tableInstance} />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <Table className="react-table rows" tableInstance={tableInstance} />
                </Col>
                <Col xs="12">
                  <TablePagination tableInstance={tableInstance} />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row />
        <br />
        <br />
      </Layout>
    </>
  );
};

export default PaymentList;