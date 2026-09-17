/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { Badge, Col, Form, Row } from 'react-bootstrap';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect, useRowState, useAsyncDebounce } from 'react-table';
import axios from 'axios';
import HtmlHead from 'components/html-head/HtmlHead';
import { toast } from 'react-toastify';
import Layout from 'layout/Layout';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { SERVICE_URL, API_URL } from 'config.js';
import { magazineFilePath } from 'constants.js';
import ButtonsCheckAll from './ButtonsCheckAll';
import ButtonsAddNew from '../../interface/plugins/datatables/ServerSide/components/ButtonsAddNew';
import ControlsPageSize from '../../interface/plugins/datatables/ServerSide/components/ControlsPageSize';
import ControlsAdd from '../../interface/plugins/datatables/ServerSide/components/ControlsAdd';
import ControlsEdit from '../../interface/plugins/datatables/ServerSide/components/ControlsEdit';
import ControlsDelete from '../../interface/plugins/datatables/ServerSide/components/ControlsDelete';
import ControlsSearch from '../../interface/plugins/datatables/ServerSide/components/ControlsSearch';
import ClubmanAddEdit from './ClubmanAddEdit';
import Table from '../../interface/plugins/datatables/ServerSide/components/Table';
import TablePagination from '../../interface/plugins/datatables/ServerSide/components/TablePagination';

const ManageClubmans = () => {
  const title = 'Manage Club Magazine';
  const description = 'Manage Club Magazine';
  const breadcrumbs = [{ to: '', text: 'Home' }];

  const columns = React.useMemo(() => {
    return [
      {
        Header: 'ID',
        accessor: 'id',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-30',
      },
      { Header: 'Issue No', accessor: 'issue_no', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      { Header: 'Issue Date', accessor: 'issue_date', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      {
        Header: 'Magazine',
        accessor: 'pdf_document',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-30',
        Cell: ({ cell }) => {
          return (
            <a
              href={cell.value ? `${magazineFilePath}${cell.value}` : '#'}
              alt="product"
              target="_blank"
              className="card-img card-img-horizontal sw-11 h-100"
              rel="noreferrer"
            >
              {cell.value}
            </a>
          );
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
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [term, setTerm] = useState('');

  const tableInstance = useTable(
    {
      columns,
      data,
      setData,
      isOpenAddEditModal,
      setIsOpenAddEditModal,
      manualPagination: true,
      manualFilters: true,
      manualSortBy: true,
      autoResetPage: false,
      autoResetSortBy: false,
      autoResetGlobalFilter: false,
      pageCount,
      initialState: {
        pageIndex: 0,
        sortBy: [{ id: 'id', desc: true }],
        hiddenColumns: ['id'],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowState
  );
  const {
    state: { pageIndex, pageSize, sortBy },
  } = tableInstance;

  const fetchData = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}magazine/get_magazines`, { params: { term, sortBy, pageSize, pageIndex } });

    setTimeout(() => {
      // const { items, pageCount: pCount } = response.data;
      // console.log('memberdata', response.data.result);
      setData(response.data.result);
      setPageCount(response.data.pageCount);
      document.body.classList.remove('spinner');
    }, 1000);
  }, [sortBy, pageIndex, pageSize, term]);

  const searchItem = useAsyncDebounce((val) => {
    setTerm(val || undefined);
  }, 200);

  const uploadConfig = {
    headers: {
      // 'Accept': 'application/json',
      // 'Content-Type': 'multipart/form-data',
      //	'Access-Control-Allow-Origin':'*',
      //	'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
  };
  const addItem = React.useCallback(
    async ({ item }) => {
      // console.log('additem', item);
      document.body.classList.add('spinner');
      // document.body.classList.add('spinner');
      // eslint-disable-next-line vars-on-top
      const formData = new FormData();
      Object.keys(item).forEach((fieldName) => {
        // console.log(fieldName, item[fieldName]);
        formData.append(fieldName, item[fieldName]);
      });
      // console.log('formData', formData);
      const response = await axios.post(`${API_URL}magazine/create_magazine`, formData, uploadConfig);
      setTimeout(() => {
        toast.success('Magazine Added Successfully', {
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
      // console.log('edititem',item);
      document.body.classList.add('spinner');
      const formDataOne = new FormData();
      Object.keys(item).forEach((fieldName) => {
        // console.log(fieldName, item[fieldName]);
        formDataOne.append(fieldName, item[fieldName]);
      });
      const response = await axios.post(`${API_URL}magazine/update_magazine`, formDataOne, uploadConfig);
      setTimeout(() => {
        toast.success('Magazine Updated Successfully', {
          position: 'top-right',
        });
        setTerm('');
        searchItem('');
        fetchData();
        document.body.classList.remove('spinner');
      }, 1000);
    },
    [sortBy, pageIndex, pageSize]
  );

  const deleteItems = React.useCallback(
    async ({ ids }) => {
      const choice = window.confirm('Are you sure you want to delete this?');
      if (choice) {
        document.body.classList.add('spinner');
        const response = await axios.post(`${API_URL}magazine/magazine_delete`, { ids });
        setTimeout(() => {
          toast.success('Magazine Deleted Successfully', {
            position: 'top-right',
          });
          setTerm('');
          fetchData();
        }, 1000);
        document.body.classList.remove('spinner');
      }
    },
    [sortBy, pageIndex, pageSize]
  );

  useEffect(() => {
    fetchData();
  }, [sortBy, fetchData, pageIndex, pageSize, term]);
  // console.log('tableInstance', tableInstance);
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
                  <ButtonsAddNew tableInstance={tableInstance} /> <ButtonsCheckAll tableInstance={tableInstance} />
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
            <ClubmanAddEdit key="abcd" tableInstance={tableInstance} addItem={addItem} editItem={editItem} />
          </Col>
        </Row>
        <Row />
        <br />
        <br />
      </Layout>
    </>
  );
};

export default ManageClubmans;
