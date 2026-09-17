/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Col, Form, Row, NavLink } from 'react-bootstrap';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect, useRowState, useAsyncDebounce } from 'react-table';
import axios from 'axios';
import HtmlHead from 'components/html-head/HtmlHead';
import Layout from 'layout/Layout';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { SERVICE_URL, API_URL } from 'config.js';

import ControlsPageSize from '../../../../interface/plugins/datatables/ServerSide/components/ControlsPageSize';

import ControlsSearch from '../../../../interface/plugins/datatables/ServerSide/components/ControlsSearch';
import Table from '../../../../interface/plugins/datatables/ServerSide/components/Table';
import TablePagination from '../../../../interface/plugins/datatables/ServerSide/components/TablePagination';

const OrdersList = () => {
  const title = 'My Orders';
  const description = 'F&B Orders List Page';
  const { isLogin, currentUser } = useSelector((state) => state.auth);
  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: '', text: 'F&B' },
    { to: '', text: 'Order List' },
  ];

  const columns = React.useMemo(() => {
    return [
      {
        Header: 'Order Id',
        accessor: 'order_id',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ row }) => {
          // console.log(row);
          return (
            <a className="list-item-heading body" href={`/member/foodordering/orders/detail/${row.original.order_id}`}>
              {row.original.order_id}
            </a>
          );
        },
      },
      {
        Header: 'Purchased Date',
        accessor: 'order_time',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ cell }) => {
          const date = new Date(cell.value);
          return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        },
      },
      { Header: 'Total Item', accessor: 'total_items', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      {
        Header: 'Total Amount',
        accessor: 'final_price',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ cell }) => {
          return <span>&#8377;. {cell.value}</span>;
        },
      },
      {
        Header: 'Pickup / Delivery By',
        accessor: 'is_club_pickup',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ row }) => {
          if (row.original.is_club_pickup === 1) {
            if (row.original.pickup_time != '') {
              return `Pickup (${row.original.pickup_time})`;
            }

            return 'Pickup';

            // eslint-disable-next-line no-else-return
          } else if (row.original.is_club_pickup === 2) {
            if (row.original.pickup_time != '') {
              return `Member (${row.original.pickup_time})`;
            }

            return 'Member';

            // eslint-disable-next-line no-else-return
          } else {
            return 'MCC';
          }
        },
      },
      {
        Header: 'Status',
        accessor: 'order_status',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        // eslint-disable-next-line consistent-return
        Cell: ({ cell }) => {
          if (cell.value === '1') {
            return <Badge bg="outline-primary">Ordered</Badge>;
            // eslint-disable-next-line no-else-return
          } else if (cell.value === '2') {
            return <Badge bg="outline-success">Confirmed</Badge>;
            // eslint-disable-next-line no-else-return
          } else if (cell.value === '3') {
            return <Badge bg="outline-warning">Preparing</Badge>;
            // eslint-disable-next-line no-else-return
          } else if (cell.value === '4') {
            return <Badge bg="outline-info">In Transit</Badge>;
            // eslint-disable-next-line no-else-return
          } else if (cell.value === '5') {
            return <Badge bg="outline-success">Delivered</Badge>;
            // eslint-disable-next-line no-else-return
          } else if (cell.value === '6') {
            return <Badge bg="outline-danger">Cancelled</Badge>;
            // eslint-disable-next-line no-else-return
          }
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
      initialState: { pageIndex: 0, sortBy: [{ id: 'order_id', desc: true }], hiddenColumns: [] },
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
    const response = await axios.get(`${API_URL}restaurant/order_get`, { params: { CurrentUserId, term, sortBy, pageSize, pageIndex } });

    setTimeout(() => {
      const { result } = response.data;
      // console.log('response', response.data);
      setData(result);
      setPageCount(response.data.pageCount);
      document.body.classList.remove('spinner');
    }, 1000);
  }, [sortBy, pageIndex, pageSize, term, currentUser]);
  const uploadConfig = {
    /* headers: { 'Accept': 'application/json',
     'Content-Type': 'multipart/form-data',
     } */
  };

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
            {/* Title Start */}
            <div className="page-title-container">
              <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/member/foodordering/home">
                <CsLineIcons icon="chevron-left" size="13" />
                <span className="align-middle text-small ms-1">F&B</span>
              </NavLink>
              <h1 className="mb-0 pb-0 display-4" id="title">
                {title}
              </h1>
            </div>
            {/* Title End */}

            <div>
              <Row className="mb-3">
                <Col sm="12" md="5" lg="3" xxl="2">
                  <div className="d-inline-block float-md-start me-1 mb-1 mb-md-0 search-input-container w-100 shadow bg-foreground">
                    <ControlsSearch tableInstance={tableInstance} onChange={searchItem} />
                  </div>
                </Col>
                <Col sm="12" md="7" lg="9" xxl="10" className="text-end">
                  <div className="d-inline-block">
                    <ControlsPageSize tableInstance={tableInstance} />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <Table responsive="md" className="react-table rows table-responsive" tableInstance={tableInstance} />
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
        <Row style={{ marginBottom: '10%' }}>
          <Col xs="12" />
        </Row>
      </Layout>
    </>
  );
};

export default OrdersList;
