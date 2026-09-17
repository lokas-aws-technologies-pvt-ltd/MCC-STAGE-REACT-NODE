/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Badge, Col, Form, Row } from 'react-bootstrap';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect, useRowState, useAsyncDebounce } from 'react-table';
import axios from 'axios';
import HtmlHead from 'components/html-head/HtmlHead';
import Layout from 'layout/Layout';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { SERVICE_URL, API_URL } from 'config.js';
import ButtonsCheckAll from '../../interface/plugins/datatables/ServerSide/components/ButtonsCheckAll';
import ButtonsAddNew from '../../interface/plugins/datatables/ServerSide/components/ButtonsAddNew';
import ControlsPageSize from '../../interface/plugins/datatables/ServerSide/components/ControlsPageSize';
import ControlsAdd from '../../interface/plugins/datatables/ServerSide/components/ControlsAdd';
import ControlsEdit from '../../interface/plugins/datatables/ServerSide/components/ControlsEdit';
import ControlsDelete from '../../interface/plugins/datatables/ServerSide/components/ControlsDelete';
import ControlsSearch from '../../interface/plugins/datatables/ServerSide/components/ControlsSearch';
import SubCategoryAddEdit from './SubCategoryAddEdit';
import Table from '../../interface/plugins/datatables/ServerSide/components/Table';
import TablePagination from '../../interface/plugins/datatables/ServerSide/components/TablePagination';

const ManageSubCategory = () => {
  const title = 'Manage Sub Categories';
  const description = '';
  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: '', text: 'Restaurant Masters' },
  ];
  const { id } = useParams();
  const [catData, setCatData] = useState([]);
 
  const fetchCategoryData = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}restaurant/category_get`);

    setTimeout(() => {
      const { result } = response.data;
      setCatData(result);
      document.body.classList.remove('spinner');
    }, 1000);
  }, []);
  useEffect(() => {
    fetchCategoryData();
  }, []);
  const columns = React.useMemo(() => {
    return [
      {
        Header: 'ID',
        accessor: 'sub_id',
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
        Header: 'Category',
        accessor: 'cat_id',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ cell }) => {
          // eslint-disable-next-line eqeqeq
          const catid = catData.filter((p) => p.id == cell.value);
          // console.log()
          if (catid[0]) {
            return catid[0].name;
          }
          return '';
          // return catData[catid].name;
        },
      },
      { Header: 'Sub Category', accessor: 'sub_name', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      { Header: 'Description', accessor: 'sub_desc', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      {
        Header: 'Status',
        accessor: 'active',
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
  }, [catData]);

  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = React.useState(3);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [term, setTerm] = useState('');
  const [currentCat] = useState(id);

  const tableInstance = useTable(
    {
      columns,
      data,
      setData,
      currentCat,
      isOpenAddEditModal,
      setIsOpenAddEditModal,
      manualPagination: true,
      manualFilters: true,
      manualSortBy: true,
      autoResetPage: false,
      autoResetSortBy: false,
      pageCount,
      catData,
      initialState: { pageIndex: 0, sortBy: [{ id: 'name', desc: false }], hiddenColumns: ['sub_id'] },
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
    const response = await axios.get(`${API_URL}restaurant/sub_category_get`, { params: { catid: id, term, sortBy, pageSize, pageIndex } });

    setTimeout(() => {
      const { result } = response.data;
      setData(result);
      setPageCount(1);
      document.body.classList.remove('spinner');
    }, 1000);
  }, [sortBy, id, pageIndex, pageSize, term]);

  const addItem = React.useCallback(
    async ({ item }) => {
      document.body.classList.add('spinner');
      const response = await axios.post(`${API_URL}restaurant/sub_category_add`, { item });
      setTimeout(() => {
        fetchData();
        document.body.classList.remove('spinner');
      }, 1000);
    },
    [sortBy, pageIndex, pageSize]
  );

  const editItem = React.useCallback(
    async ({ item }) => {
      document.body.classList.add('spinner');
      const response = await axios.post(`${API_URL}restaurant/sub_category_update`, { item });
      setTimeout(() => {
        fetchData();
        document.body.classList.remove('spinner');
      }, 1000);
    },
    [sortBy, pageIndex, pageSize]
  );

  const deleteItems = React.useCallback(
    async ({ ids }) => {
      document.body.classList.add('spinner');
      const response = await axios.post(`${API_URL}restaurant/sub_category_delete`, { ids });
      setTimeout(() => {
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
            <SubCategoryAddEdit tableInstance={tableInstance} addItem={addItem} editItem={editItem} />
          </Col>
        </Row>
        <Row />
        <br />
        <br />
      </Layout>
    </>
  );
};

export default ManageSubCategory;
