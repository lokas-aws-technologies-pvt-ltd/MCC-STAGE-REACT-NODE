/* eslint-disable eqeqeq */
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
import ControlsDelete from '../../interface/plugins/datatables/ServerSide/components/ControlsDelete';
import ControlsSearch from '../../interface/plugins/datatables/ServerSide/components/ControlsSearch';
import CategoryAddEdit from './CategoryAddEdit';
import Table from '../../interface/plugins/datatables/ServerSide/components/Table';
import TablePagination from '../../interface/plugins/datatables/ServerSide/components/TablePagination';

const ManageCategory = () => {
  const title = 'Manage Event Categories';
  const description = '';
  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: '', text: 'Events' },
  ];
  const [data, setData] = useState([]);
  const [parentCats, setParentCats] = React.useState([]);
  const columns = React.useMemo(() => {
    return [
      {
        Header: 'ID',
        accessor: 'id',
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

      { Header: 'Category Name', accessor: 'cat_name', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      {
        Header: 'Parent Category',
        accessor: 'parent_id',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ row }) => {
          // console.log('cellvalue', row);

          if (row.values.parent_id == 0) {
            return 'No Parent';
            // eslint-disable-next-line no-else-return
          } else {
            // console.log('parentCats', parentCats);
            // const existingIndex = cart.cartItems.findIndex((item) => item.item_id === product.item_id);
            if (parentCats && Object.keys(parentCats).length > 0) {
              const parent = parentCats.findIndex((item) => item.id === row.original.parent_id);
              const parentName = parentCats[parent].cat_name;
              // console.log('parent', parentCats[parent].cat_name);
              // return 'Not Parent';
              return parentName;
            }
            return 'Not Parent';
          }
        },
      },
      { Header: 'Description', accessor: 'cat_description', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      {
        Header: 'Status',
        accessor: 'cat_status',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ cell }) => {
          if (cell.value === 1) {
            return 'Active';
            // eslint-disable-next-line no-else-return
          } else {
            return 'Inactive';
          }
        },
      },

      {
        Header: '',
        id: 'action',
        headerClassName: 'empty w-10',
        Cell: ({ row }) => {
          // if (row.values.parent_id != 0) {
          const { checked, onChange } = row.getToggleRowSelectedProps();
          return <Form.Check className="form-check float-end mt-1" type="checkbox" checked={checked} onChange={onChange} />;
          // }
          // return '';
        },
      },
    ];
  }, [parentCats]);

  const [pageCount, setPageCount] = React.useState(3);
  // const [pageSize, setPageSize] = React.useState('1');

  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [term, setTerm] = useState('');

  const tableInstance = useTable(
    {
      columns,
      data,
      parentCats,
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
      initialState: { pageIndex: 0, sortBy: [{ id: 'id', desc: false }], hiddenColumns: ['id'] },
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
    const response = await axios.get(`${API_URL}events/category_get`, { params: { term, sortBy, pageSize, pageIndex } });

    setTimeout(() => {
      const { result, parentData } = response.data;
      setData(result);
      setParentCats(parentData);
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

      const response = await axios.post(`${API_URL}events/category_add`, item);
      setTimeout(() => {
        toast.success('Events Category Added Successfully', {
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
      console.log('item recieved', item);
      const response = await axios.post(`${API_URL}events/category_update`, item);
      setTimeout(() => {
        toast.success('Events Category Updated Successfully', {
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
      const response = await axios.post(`${API_URL}events/category_delete`, { ids });
      setTimeout(() => {
        toast.success('Events Category Deleted Successfully', {
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
            <CategoryAddEdit tableInstance={tableInstance} addItem={addItem} editItem={editItem} />
          </Col>
        </Row>
        <Row />
        <br />
        <br />
      </Layout>
    </>
  );
};

export default ManageCategory;
