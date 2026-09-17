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
import BarCategoryAddEdit from './BarCategoryAddEdit';
import Table from '../../interface/plugins/datatables/ServerSide/components/Table';
import TablePagination from '../../interface/plugins/datatables/ServerSide/components/TablePagination';

const BarManageCategory = () => {
  const title = 'Manage Bar Menu Categories';
  const description = '';
  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: '', text: 'Bar Masters' },
  ];

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
      {
        Header: 'Category Image',
        accessor: 'image',
        sortable: false,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ cell }) => {
          return (
            <img
              src={cell.value ? `${catImageLivePath}${cell.value}` : '/img/product/small/product-1.webp'}
              alt="product"
              className="card-img card-img-horizontal sw-11 h-100"
            />
          );
        },
      },
      { Header: 'Category Name', accessor: 'name', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      { Header: 'Description', accessor: 'description', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
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
        Header: 'Sub Categories', 
        id:"subCatagories",
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell:({row}) => {
          // console.log(row);
          return ( <a
          className="list-item-heading body"
          href={`/admin/restaurant/ManageBarSubCategory/${row.original.id}`}
          onClick={(e) => {
           //  e.preventDefault();
          }}
        >
          Click here
        </a>
  );
          // return <NavLink to={`/admin/restaurant/ManageBarSubCategory/${row.id}`} className="heading stretched-link d-block"> Click</NavLink>
        }
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
      initialState: { pageIndex: 0, sortBy: [{ id: 'name', desc: false }], hiddenColumns: ['id'] },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowState
  );
  const {
    state: { pageSize, pageIndex,  sortBy },
  } = tableInstance;

  const fetchData = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}bar/category_get`, { params: { term, sortBy, pageSize, pageIndex } });

    setTimeout(() => {
      const { result } = response.data;
      setData(result);
      setPageCount( response.data.pageCount);
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

      const formData = new FormData();
      Object.keys(item).forEach((fieldName) => {
        console.log(fieldName, item[fieldName]);
        formData.append(fieldName, item[fieldName]);
      });
      const response = await axios.post(`${API_URL}bar/category_add`,formData, uploadConfig);
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

      const formDataOne = new FormData();
      Object.keys(item).forEach((fieldName) => {
        // console.log(fieldName, item[fieldName]);
        formDataOne.append(fieldName, item[fieldName]);
      });
// console.log('formDataOne',formDataOne);
      const response = await axios.post(`${API_URL}bar/category_update`, formDataOne, uploadConfig);
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
      const response = await axios.post(`${API_URL}bar/category_delete`, { ids });
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
            <BarCategoryAddEdit tableInstance={tableInstance} addItem={addItem} editItem={editItem} />
          </Col>
        </Row>
        <Row />
        <br />
        <br />
      </Layout>
    </>
  );
};

export default BarManageCategory;
