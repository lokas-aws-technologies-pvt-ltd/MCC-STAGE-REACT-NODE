/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { Badge, Col, Form, Row } from 'react-bootstrap';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect, useRowState, useAsyncDebounce } from 'react-table';
import axios from 'axios';
import HtmlHead from 'components/html-head/HtmlHead';
import { toast } from 'react-toastify';
import Layout from 'layout/Layout';
import { catImageLivePath, itemImageLivePath } from 'constants.js';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { SERVICE_URL, API_URL } from 'config.js';
import ButtonsCheckAll from '../../interface/plugins/datatables/ServerSide/components/ButtonsCheckAll';
import ButtonsAddNew from '../../interface/plugins/datatables/ServerSide/components/ButtonsAddNew';
import ControlsPageSize from '../../interface/plugins/datatables/ServerSide/components/ControlsPageSize';
import ControlsAdd from '../../interface/plugins/datatables/ServerSide/components/ControlsAdd';
import ControlsEdit from '../../interface/plugins/datatables/ServerSide/components/ControlsEdit';
import MenuControlsDelete from './components/MenuControlsDelete';
import ControlsSearch from '../../interface/plugins/datatables/ServerSide/components/ControlsSearch';
import MenuAddEdit from './MenuAddEdit';
import Table from '../../interface/plugins/datatables/ServerSide/components/Table';
import TablePagination from '../../interface/plugins/datatables/ServerSide/components/TablePagination';

const ManageMenu = () => {
  const title = 'Manage Menu';
  const description = '';
  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: '', text: 'Restaurant Masters' },
  ];
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = React.useState(3);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [term, setTerm] = useState('');
  const [catData, setCatData] = useState([]);
  const [catSubData, setCatSubData] = useState([]);
  const [banData, setbanData] = useState([]);
  const fetchCategoryData = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}restaurant/category_get`);

    setTimeout(() => {
      const { result } = response.data;
      setCatData(result);
      document.body.classList.remove('spinner');
    }, 1000);
  }, []);
  const fetchSubCategoryData = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}restaurant/sub_category_get`);

    setTimeout(() => {
      const { result } = response.data;
      setCatSubData(result);
      document.body.classList.remove('spinner');
    }, 1000);
  }, []);
  const fetchBanquetcourse = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}banquet/banquet_menu_course_get_all`);

    setTimeout(() => {
      
      setbanData( response.data.result);
      document.body.classList.remove('spinner');
    }, 1000);
  }, []);

  const columns = React.useMemo(() => {
    return [
      {
        Header: 'ID',
        accessor: 'item_id',
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
        Header: 'Available Time',
        accessor: 'availability_time',
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
        Header: 'Menu Image',
        accessor: 'item_image',
        sortable: false,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ cell }) => {
          return (
            <img
              src={cell.value ? `${itemImageLivePath}${cell.value}` : '/img/product/small/default.png'}
              alt="product"
              className="card-img card-img-horizontal sw-11 h-100"
            />
          );
        },
      },
      { Header: 'Menu Name', accessor: 'item_name', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      {
        Header: 'Category',
        accessor: 'cat_id',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ cell }) => {
          // eslint-disable-next-line eqeqeq
          const catid = catData.filter((p) => p.id == cell.value);
          if (catid && Array.isArray(catid) && catid.length > 0) {
            // console.log('catid', catid);
            return catid[0].name;
            // return '';
            // eslint-disable-next-line prettier/prettier
          // eslint-disable-next-line no-else-return
          } else {
            // return catData[catid].name;
            return '';
          }
        },
      },
      {
        Header: 'Sub category',
        accessor: 'sub_cat_id',
        sortable: false,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ cell }) => {
          // eslint-disable-next-line eqeqeq
          const catSubid = catSubData.filter((a) => a.sub_id == cell.value);
          if (catSubid && Array.isArray(catSubid) && catSubid.length > 0) {
            // console.log('catSubid',catSubid);
            return catSubid[0].sub_name;
            // return catData[catid].name;
          }
          return '';
        },
      },
      {
        Header: 'Variant',
        accessor: 'varient',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ cell }) => {
          // eslint-disable-next-line eqeqeq
          if (cell.value == 'N') {
            return 'Non-Veg';
          }
          return 'Veg';
        },
      },

      { Header: 'Description', accessor: 'description', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      { Header: 'Cost', accessor: 'price', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
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

  const tableInstance = useTable(
    {
      columns,
      data,
      setData,
      catData,
      catSubData,
      banData,
      isOpenAddEditModal,
      setIsOpenAddEditModal,
      manualPagination: true,
      manualFilters: true,
      manualSortBy: true,
      autoResetPage: false,
      autoResetSortBy: false,
      pageCount,
      initialState: { pageIndex: 0, sortBy: [{ id: 'item_id', desc: true }], hiddenColumns: ['item_id', 'availability_time'] },
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
    // console.log(`${API_URL}/restaurant/item_get`);
    // const response = await axios.get(`${SERVICE_URL}/datatable`, { params: { term, sortBy, pageSize, pageIndex } });
    const response = await axios.get(`${API_URL}restaurant/item_get`, { params: { term, sortBy, pageSize, pageIndex } });

    setTimeout(() => {
      // console.log('response', response);
      const { result } = response.data;
      //  console.log('result', result);
      setData(result);
      setPageCount(response.data.pageCount);
      document.body.classList.remove('spinner');
    }, 1000);
  }, [sortBy, catData, pageIndex, pageSize, term]);
  const uploadConfig = {
    /* headers: { 'Accept': 'application/json',
     'Content-Type': 'multipart/form-data',
     } */
  };
  const addItem = React.useCallback(
    async ({ item }) => {
      document.body.classList.add('spinner');
      // eslint-disable-next-line vars-on-top
      const formData = new FormData();
      Object.keys(item).forEach((fieldName) => {
        // console.log(fieldName, item[fieldName]);
        formData.append(fieldName, item[fieldName]);
      });

      const response = await axios.post(`${API_URL}restaurant/item_add`, formData, uploadConfig);
      setTimeout(() => {
        toast.success('Food Menu Item Added Successfully', {
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
      const response = await axios.post(`${API_URL}restaurant/item_update`, formDataOne, uploadConfig);
      setTimeout(() => {
        toast.success('Food Menu Item Updated Successfully', {
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
      // console.log('ids', ids);
      document.body.classList.add('spinner');
      const response = await axios.post(`${API_URL}restaurant/item_delete`, { ids });
      setTimeout(() => {
        toast.success('Food Menu Items Deleted Successfully', {
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
    fetchCategoryData();
    fetchSubCategoryData();
    fetchBanquetcourse();
  }, []);
  useEffect(() => {
    fetchData();
  }, [sortBy, catData, fetchData, pageIndex, pageSize, term]);

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
                    <MenuControlsDelete tableInstance={tableInstance} deleteItems={deleteItems} />
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
            <MenuAddEdit tableInstance={tableInstance} addItem={addItem} editItem={editItem} />
          </Col>
        </Row>
        <Row />
        <br />
        <br />
      </Layout>
    </>
  );
};

export default ManageMenu;
