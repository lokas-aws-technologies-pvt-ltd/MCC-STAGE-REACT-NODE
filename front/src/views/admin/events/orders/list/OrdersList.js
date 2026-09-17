/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { Badge, Col, Form, Row, NavLink } from 'react-bootstrap';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect, useRowState, useAsyncDebounce } from 'react-table';
import axios from 'axios';
import HtmlHead from 'components/html-head/HtmlHead';
import { toast } from 'react-toastify';
import Layout from 'layout/Layout';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { SERVICE_URL, API_URL } from 'config.js';
import ButtonsCheckAll from './ButtonsCheckAll';
import ControlsPageSize from '../../../../interface/plugins/datatables/ServerSide/components/ControlsPageSize';
import ControlsDelete from './ControlsDelete';
import ControlsSearch from '../../../../interface/plugins/datatables/ServerSide/components/ControlsSearch';
import Table from '../../../../interface/plugins/datatables/ServerSide/components/Table';
import TablePagination from '../../../../interface/plugins/datatables/ServerSide/components/TablePagination';

const OrdersList = () => {
  const title = 'Events Booking List';
  const description = 'Events Booking List Page';
  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: '', text: 'Events' },
    { to: '', text: 'Events Booking List' },
  ];

  const columns = React.useMemo(() => {
    return [
      {
        Header: 'Event Booking Id',
        accessor: 'rsvp_id',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ row }) => {
          // console.log(row);
          return (
            <a className="list-item-heading body" href={`/admin/events/OrderDetail/${row.original.rsvp_id}`}>
              {row.original.rsvp_id}
            </a>
          );
        },
      },
      {
        Header: 'Member Code',
        accessor: 'member_code',
        sortable: false,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
      {
        Header: 'Booking Date',
        accessor: 'created_date',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ cell }) => {
          const date = new Date(cell.value);
          return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        },
      },
      { Header: 'Event Name', accessor: 'event_name', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      {
        Header: 'Status',
        accessor: 'rsvp_status',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        // eslint-disable-next-line consistent-return
        Cell: ({ cell }) => {
          if (cell.value == '0') {
            return <Badge bg="outline-primary">Booked</Badge>;
            // eslint-disable-next-line no-else-return
          } else if (cell.value == '1') {
            return <Badge bg="outline-success">Confirmed</Badge>;
            // eslint-disable-next-line no-else-return
          } else if (cell.value == '2') {
            return <Badge bg="outline-warning">Cancelled</Badge>;
            // eslint-disable-next-line no-else-return
          }
        },
      },
      {
        Header: '',
        id: 'action',
        headerClassName: 'empty w-10',
        Cell: ({ row }) => {
          const { checked, onChange } = row.getToggleRowSelectedProps();
          return <Form.Check className="form-check float-end mt-1" type="checkbox" checked={checked} onChange={onChange} />;
        },
      },
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
      initialState: { pageIndex: 0, sortBy: [{ id: 'rsvp_id', desc: false }], hiddenColumns: [] },
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
    const response = await axios.get(`${API_URL}events/rsvp_get`, { params: { term, sortBy, pageSize, pageIndex } });

    setTimeout(() => {
      const { result } = response.data;
      // console.log('response', response.data);
      setData(result);
      setPageCount(response.data.pageCount);
      document.body.classList.remove('spinner');
    }, 1000);
  }, [sortBy, pageIndex, pageSize, term]);
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
toast.success('Event Booking Status Updated Successfully', {
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
toast.success('Event Booking Deleted Successfully', {
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
                  <ButtonsCheckAll tableInstance={tableInstance}  deleteItems={deleteItems} changeStatus={changeStatus} />
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
                    <ControlsDelete tableInstance={tableInstance} deleteItems={deleteItems} />
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

export default OrdersList;
