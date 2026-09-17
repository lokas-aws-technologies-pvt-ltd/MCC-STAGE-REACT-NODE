/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Col, Form, Row, NavLink, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect, useRowState, useAsyncDebounce } from 'react-table';
import axios from 'axios';
import HtmlHead from 'components/html-head/HtmlHead';
import { toast } from 'react-toastify';
import Layout from 'layout/Layout';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { SERVICE_URL, API_URL } from 'config.js';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import ButtonsCheckAll from './ButtonsCheckAll';
import ControlsPageSize from '../../../interface/plugins/datatables/ServerSide/components/ControlsPageSize';
import ControlsDelete from './ControlsDelete';
import ControlsSearch from '../../../interface/plugins/datatables/ServerSide/components/ControlsSearch';
import Table from '../../../interface/plugins/datatables/ServerSide/components/Table';
import TablePagination from '../../../interface/plugins/datatables/ServerSide/components/TablePagination';

const FeedBacksList = () => {
  const title = 'Feedback List';
  const description = 'Feedback List Page';
  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: '', text: 'Feedback' },
    { to: '', text: 'Feedback List' },
  ];
  const { isLogin, currentUser } = useSelector((state) => state.auth);
  const columns = React.useMemo(() => {
    return [
      {
        Header: 'Feedback Id',
        accessor: 'feedback_id',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
      {
        Header: 'Member Code',
        accessor: 'member_code',
        sortable: false,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
      {
        Header: 'Given Date',
        accessor: 'submited_on',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ cell }) => {
          const date = new Date(cell.value);
          return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        },
      },
      { Header: 'Category', accessor: 'feedback_category', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      {
        Header: 'Reference Id',
        accessor: 'ref_id',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ row }) => {
          // console.log(row);
          let comp;
          if (row.original.feedback_category == 'eventsorder') {
            comp = (
              <a className="list-item-heading body" href={`/member/events/orders/detail/${row.original.ref_id}`}>
                {' '}
                {row.original.ref_id}{' '}
              </a>
            );
          } else if (row.original.feedback_category == 'f&b') {
            comp = (
              <a className="list-item-heading body" href={`/member/foodordering/orders/detail/${row.original.ref_id}`}>
                {' '}
                {row.original.ref_id}{' '}
              </a>
            );
          } else {
            comp = row.original.ref_id;
          }
          return comp;
        },
      },

      {
        Header: 'Feedback',
        accessor: 'feedback_text',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ cell }) => {
          return (
            /* <OverlayTrigger
              rootClose
              trigger={["hover", "hover"]}
              placement="top"
              overlay={
                <Popover id="popover-basic-top">
                  <Popover.Body>{cell.value}</Popover.Body>
                </Popover>
              }
            >
              <a href="/" onClick={(event) => event.preventDefault()}>
                <CsLineIcons icon="info-hexagon" />
              </a>
            </OverlayTrigger> */
            cell.value
          );
        },
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
  const [pageCount, setPageCount] = React.useState(3);
  // const [pageSize, setPageSize] = React.useState('1');
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [term, setTerm] = useState('');

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
      initialState: { pageIndex: 0, sortBy: [{ id: 'feedback_id', desc: true }], hiddenColumns: [] },
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

  const fetchData = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const CurrentUserId = currentUser.membercode;
    const response = await axios.get(`${API_URL}feedbacks/feedback_get`, { params: { CurrentUserId, term, sortBy, pageSize, pageIndex } });

    setTimeout(() => {
      const { result } = response.data;
      // console.log('response', response.data);
      setData(result);
      setPageCount(response.data.pageCount);
      document.body.classList.remove('spinner');
    }, 1000);
  }, [currentUser, term, sortBy, pageSize, pageIndex]);
  const uploadConfig = {
    /* headers: { 'Accept': 'application/json',
     'Content-Type': 'multipart/form-data',
     } */
  };
  const changeStatus = React.useCallback(
    async ({ ids, orderstatus }) => {
      document.body.classList.add('spinner');
      const response = await axios.post(`${API_URL}events/rsvp_status_update`, { ids, orderstatus });
      setTimeout(() => {
        toast.success('Feedback Status Updated Successfully', {
          position: 'top-right',
        });
        setTerm('');
        fetchData();
        document.body.classList.remove('spinner');
      }, 1000);
    },
    [sortBy, pageIndex, pageSize]
  );
  const deleteItems = React.useCallback(
    async ({ ids }) => {
      document.body.classList.add('spinner');
      const response = await axios.post(`${API_URL}events/rsvp_delete`, { ids });
      setTimeout(() => {
        toast.success('Feedback Deleted Successfully', {
          position: 'top-right',
        });
        setTerm('');
        fetchData();
        document.body.classList.remove('spinner');
      }, 1000);
    },
    [sortBy, pageIndex, pageSize]
  );

  const searchItem = useAsyncDebounce((val) => {
    setTerm(val || undefined);
  }, 200);

  useEffect(() => {
    fetchData();
  }, [sortBy, fetchData, pageIndex, pageSize, term]);
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
                <Col sm="12" md="5" lg="3" xxl="2">
                  <div className="d-inline-block float-md-start me-1 mb-1 mb-md-0 search-input-container w-100 shadow bg-foreground">
                    <ControlsSearch tableInstance={tableInstance} onChange={searchItem} />
                  </div>
                </Col>
                <Col sm="12" md="7" lg="9" xxl="10" className="text-end">
                  <div className="d-inline-block me-0 me-sm-3 float-start float-md-none">
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

export default FeedBacksList;
