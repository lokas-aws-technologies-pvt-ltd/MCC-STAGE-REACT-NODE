/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { Badge, Col, Form, Row, NavLink,Button,Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
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
  const title = 'My Booking';
  const description = 'My Booking';
  const breadcrumbs = [{ to: '', text: 'Home' }];
  const { isLogin, currentUser } = useSelector((state) => state.auth);
  const {membercode}=currentUser;
  const [show, setShow] = useState(false);
  const [deleteid, setdeleteid] = useState('');


  const handleShow = (event,id) => {
    setdeleteid(id);
    setShow(true);
   
  }
  const columns = React.useMemo(() => {
    return [
      {
        Header: 'ID',
        accessor: 'id',        
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ row }) => {
          // console.log(row);
          return (
            <a className="list-item-heading body" href={`/admin/banquet/OrderDetail/${row.original.id}`}>
              {row.original.id}
            </a>
          );
        },
      },
      { Header: 'Member Code', accessor: 'member_id', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      { Header: 'Banquet Hall Name', accessor: 'banquet_hall_name', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      {
        Header: 'Booking Date',
        accessor: 'book_date',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
        // Cell: ({ cell }) => {
        //   const date = new Date(cell.value);
        //   return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        // },
      },
      { Header: 'Guest', accessor: 'no_guest', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      // { Header: 'Hours', accessor: 'hours', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      { Header: 'Menu Name', accessor: 'menu_name', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-20' },
      // { Header: 'Hall Cost', accessor: 'hall_cost', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      // { Header: 'Projector Cost', accessor: 'projector_cost', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      // { Header: 'Menu Cost', accessor: 'menu_cost', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      // { Header: 'Music Cost', accessor: 'music_cost', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      // { Header: 'Fish Addoncost', accessor: 'fish_addon_cost', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      // { Header: 'Chicken Biryani', accessor: 'chicken_biryani_cost', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      // { Header: 'Mutton Biryani', accessor: 'mutton_biryani_cost', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' },
      { Header: 'Total Cost', accessor: 'total_cost', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10' }, 
      { Header: 'Status', accessor: 'status', sortable: true, headerClassName: 'text-muted text-small text-uppercase w-10',
       Cell: ({ cell }) => {
        if (cell.value === '1') {
          return <Badge bg="outline-primary">Booked</Badge>;
          // eslint-disable-next-line no-else-return
        } else if (cell.value === '0') {
          return <Badge bg="outline-success">Cancelled</Badge>;
          // eslint-disable-next-line no-else-return
        } else if (cell.value === '2') {
          return <Badge bg="outline-warning">Confirmed</Badge>;
          // eslint-disable-next-line no-else-return
        } 
        return <Badge bg="outline-warning">  </Badge>;
      }, },
      {
        width: 300,
        Header: "Action",       
        //  accessor: "id", 
        sortable: false, headerClassName: 'text-muted text-small text-uppercase w-10',
        Cell: ({ row }) => {
          // <button value={original.name} onClick={props.handleClickGroup}>
         if(row.original.status==0) 
         {
         return <Button variant="primary" disabled onClick={(e) => {
           
            handleShow(e,row.original.id);
          }} >
            Cancel 
          </Button>
         }
        
          return <Button variant="primary"  onClick={(e) => {
           
            handleShow(e,row.original.id);
          }} >
            Cancel 
          </Button>
         
          
        }
      }
     
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
        // hiddenColumns: ['id'],
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
    
    const response = await axios.get(`${API_URL}banquet/banquet_book_get`, { params: { term, sortBy, pageSize, pageIndex } });

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
  const deleteitem = React.useCallback(async () => {
    document.body.classList.add('spinner');
    // const response = await axios.get(`http://3.109.198.190:5000/dashboard/get_broadcast`, { params: { term, sortBy, pageSize, pageIndex } });
    const response = await axios.post(`${API_URL}banquet/banquet_book_update_status`, { deleteid });
      setTimeout(() => {
toast.success('Banquet Booking Request Cancelled Successfully....', {
          position: 'top-right',
        });
setdeleteid('');
        fetchData();
      document.body.classList.remove('spinner');
    }, 1000);
  }, [deleteid]);
  const handleClose = () => 
  {
    
    // setmodule('');
    setdeleteid('');
    setShow(false);
  }
 
  const handleconfirmClose = () => {

    deleteitem();
    setShow(false);
  }

 
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

      
      <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Confirmation Message</Modal.Title>
              </Modal.Header>
              <Modal.Body>Do You want to cancel the banquet booking...?</Modal.Body>
              
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleconfirmClose}>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>
    </>
  );
};

export default OrdersList;
