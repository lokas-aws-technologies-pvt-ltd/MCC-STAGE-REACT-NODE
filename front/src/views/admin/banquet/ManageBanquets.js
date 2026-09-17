/* eslint-disable no-plusplus  */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { Badge, Col, Form, Row, NavLink } from 'react-bootstrap';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect, useRowState, useAsyncDebounce } from 'react-table';
import axios from 'axios';
import HtmlHead from 'components/html-head/HtmlHead';
import { catImageLivePath, itemImageLivePath } from 'constants.js';
import { toast } from 'react-toastify';
import Layout from 'layout/Layout';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { SERVICE_URL, API_URL } from 'config.js';
import ButtonsCheckAll from '../../interface/plugins/datatables/ServerSide/components/ButtonsCheckAll';
import ButtonsAddNew from '../../interface/plugins/datatables/ServerSide/components/ButtonsAddNew';
import ControlsPageSize from '../../interface/plugins/datatables/ServerSide/components/ControlsPageSize';
import ControlsAdd from '../../interface/plugins/datatables/ServerSide/components/ControlsAdd';
import ControlsEdit from '../../interface/plugins/datatables/ServerSide/components/ControlsEdit';
import BanquetControlsDelete from './components/BanquetControlsDelete';
import ControlsSearch from '../../interface/plugins/datatables/ServerSide/components/ControlsSearch';
import BanquetAddEdit from './BanquetAddEdit';
import Table from '../../interface/plugins/datatables/ServerSide/components/Table';
import TablePagination from '../../interface/plugins/datatables/ServerSide/components/TablePagination';

const ManageBanquets = () => {
  const title = 'Manage Banquets';
  const description = '';
  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: '', text: 'Banquet Masters' },
  ];

  const columns = React.useMemo(() => {
    return [
      {
        Header: 'ID',
        accessor: 'banquet_id',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ cell }) => {
          return (
            <a
              className="list-item-heading body"
              href="#!"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {cell.value}
            </a>
          );
        },
      },
      {
        Header: 'Banquet Name',
        accessor: 'banquet_name',
        sortable: false,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        
      },
      { Header: 'Capacity', accessor: 'capacity', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      { Header: 'Cost/4hrs', accessor: 'cost_4_hrs', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      { Header: 'Cost/8hrs', accessor: 'cost_8_hrs', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      { Header: 'Electricity/4hrs', accessor: 'electricity_4_hrs', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      { Header: 'Electricity/8hrs', accessor: 'electricity_8_hrs', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      { Header: 'Projector', accessor: 'projector', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      { Header: 'Valet / driver', accessor: 'valet_per_driver', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      {
        Header: 'Status',
        accessor: 'banquet_status',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ cell }) => {
          if (cell.value === 1) {
            return 'Available';
            // eslint-disable-next-line no-else-return
          } else {
            return 'Unavailable';
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
      initialState: { pageIndex: 0, sortBy: [{ id: 'banquet_id', desc: true }], hiddenColumns: ['banquet_id'] },
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
    const response = await axios.get(`${API_URL}banquet/banquet_get`, { params: { term, sortBy, pageSize, pageIndex } });

    setTimeout(() => {
      const { result } = response.data;
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
  const addItem = React.useCallback(
    async ({ item }) => {
      // console.log('additem',item);
      document.body.classList.add('spinner');

    
      const response = await axios.post(`${API_URL}banquet/banquet_add`, item, uploadConfig);
      setTimeout(() => {
        toast.success('Food Menu Category Added Successfully', {
          position: 'top-right',
        });

        setTerm('');
        fetchData();
        document.body.classList.remove('spinner');
      }, 1000);
    },
    [sortBy, pageIndex, pageSize]
  );

  const editItem = React.useCallback(
    async ({ item }) => {
      document.body.classList.add('spinner');
      // eslint-disable-next-line camelcase

      const response = await axios.post(`${API_URL}banquet/banquet_update`, item, uploadConfig);
      setTimeout(() => {
        toast.success('Food Menu Category Updated Successfully', {
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
      const response = await axios.post(`${API_URL}banquet/banquet_delete`, { ids });
      setTimeout(() => {
        toast.success('Food Menu Category Deleted Successfully', {
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
                  <ButtonsAddNew tableInstance={tableInstance} />
                  <ButtonsCheckAll tableInstance={tableInstance} />
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
                    <ControlsAdd tableInstance={tableInstance} /> <ControlsEdit tableInstance={tableInstance} />{' '}
                    <BanquetControlsDelete tableInstance={tableInstance} deleteItems={deleteItems} />
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
            <BanquetAddEdit tableInstance={tableInstance} addItem={addItem} editItem={editItem} />
          </Col>
        </Row>
        <Row />
        <br />
        <br />
      </Layout>
    </>
  );
};

export default ManageBanquets;
