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
  const title = 'F&B Orders List';
  const description = 'F&B Orders List Page';
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
            <a className="list-item-heading body" href={`/admin/restaurant/BarOrderDetail/${row.original.order_id}`}>
              {row.original.order_id}
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
      { Header: 'Purchased Date', accessor: 'order_time', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
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
        Header: 'Pickup / Delivery',
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
          } else {
            return 'Delivery';
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
          }else if (cell.value === '6') {
            return <Badge bg="outline-danger">Cancelled</Badge>;
            // eslint-disable-next-line no-else-return
          }
        },
      },
      /* { 
        Header: 'Sub Categories', 
        id:"subCatagories",
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell:({row}) => {
          // console.log(row);
          return ( <a
          className="list-item-heading body"
          href={`/admin/bar/ManageSubCategory/${row.original.id}`}
          onClick={(e) => {
           //  e.preventDefault();
          }}
        >
          Click here
        </a>
  );
          // return <NavLink to={`/admin/restaurant/ManageSubCategory/${row.id}`} className="heading stretched-link d-block"> Click</NavLink>
        }
      }, */
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
    const response = await axios.get(`${API_URL}bar/order_get`, { params: { term, sortBy, pageSize, pageIndex } });

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
      const response = await axios.post(`${API_URL}bar/order_status_update`, { ids, orderstatus });
      setTimeout(() => {
toast.success('Order Status Updated Successfully', {
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
      const response = await axios.post(`${API_URL}bar/order_delete`, { ids });
      setTimeout(() => {
toast.success('Order Deleted Successfully', {
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
