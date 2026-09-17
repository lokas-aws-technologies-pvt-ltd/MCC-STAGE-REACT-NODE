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
import BanquetMenuControlsDelete from './components/BanquetMenuControlsDelete';
import ControlsSearch from '../../interface/plugins/datatables/ServerSide/components/ControlsSearch';
import BanquetMenuItemAddEdit from './BanquetMenuItemAddEdit';
import Table from '../../interface/plugins/datatables/ServerSide/components/Table';
import TablePagination from '../../interface/plugins/datatables/ServerSide/components/TablePagination';

const ManageBanquetMenu = () => {
  const title = 'Manage Menu Item';
  const description = '';
  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: '', text: 'Banquet Master' },
  ];
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = React.useState(3);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [term, setTerm] = useState('');
  const [banmenu, setbanmenu] = useState([]);
  const fetchBanquetmenu= React.useCallback(async () => {
    document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}banquet/banquet_menu_get`);

    setTimeout(() => {
      const { result } = response.data.result;
      setbanmenu(response.data.result);
      document.body.classList.remove('spinner');
    }, 1000);
  }, []);

  const columns = React.useMemo(() => {
    return [
      {
        Header: 'ID',
        accessor: 'banquet_menu_id',
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
      { Header: 'Banquet Menu Name', accessor: 'banquet_menu_name', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      {
        Header: 'Cost Per Plate',
        accessor: 'banquet_menu_cost',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
      {
        Header: 'No of Veg Dishes',
        accessor: 'no_veg_dish',
        sortable: false,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
      {
        Header: 'No of Non-Veg Dishes',
        accessor: 'no_non_veg_dish',
        sortable: false,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
      {
        Header: 'Fish Addon Cost',
        accessor: 'fish_addon_cost',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
      {
        Header: 'Status',
        accessor: 'banquet_menu_status',
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

  const tableInstance = useTable(
    {
      columns,
      data,
      setData,
      banmenu,
      isOpenAddEditModal,
      setIsOpenAddEditModal,
      manualPagination: true,
      manualFilters: true,
      manualSortBy: true,
      autoResetPage: false,
      autoResetSortBy: false,
      pageCount,
      initialState: { pageIndex: 0, sortBy: [{ id: 'banquet_menu_id', desc: true }], hiddenColumns: ['item_id', 'availability_time'] },
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
    const response = await axios.get(`${API_URL}banquet/banquet_menu_get`, { params: { term, sortBy, pageSize, pageIndex } });

    setTimeout(() => {
      // console.log('response', response);
      const { result } = response.data;
      //  console.log('result', result);
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
      document.body.classList.add('spinner');

      const response = await axios.post(`${API_URL}banquet/banquet_menu_add`, item, uploadConfig);
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

      const response = await axios.post(`${API_URL}banquet/banquet_menu_update`, item, uploadConfig);
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

  useEffect(() => {
    fetchBanquetmenu();
   
  }, []);

  const deleteItems = React.useCallback(
    async ({ ids }) => {
      // console.log('ids', ids);
      document.body.classList.add('spinner');
      const response = await axios.post(`${API_URL}banquet/banquet_menu_delete`, { ids });
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
                  {/* <ButtonsAddNew tableInstance={tableInstance} /> */} <ButtonsCheckAll tableInstance={tableInstance} />
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
                    {/* <ControlsAdd tableInstance={tableInstance} /> */} <ControlsEdit tableInstance={tableInstance} />{' '}
                    {/* <BanquetMenuControlsDelete tableInstance={tableInstance} deleteItems={deleteItems} /> */}
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
            <BanquetMenuItemAddEdit tableInstance={tableInstance} addItem={addItem} editItem={editItem} />
          </Col>
        </Row>
        <Row />
        <br />
        <br />
      </Layout>
    </>
  );
};

export default ManageBanquetMenu;
