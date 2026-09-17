/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
import React, { useEffect, useState,useRef  } from 'react';
import { Badge, Col, Form, Row, NavLink, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect, useRowState, useAsyncDebounce } from 'react-table';
import axios from 'axios';
import HtmlHead from 'components/html-head/HtmlHead';
import { toast } from 'react-toastify';
import Layout from 'layout/Layout';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { SERVICE_URL, API_URL } from 'config.js';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import Select from 'react-select';
import { CSVLink, CSVDownload } from "react-csv";

import ControlsPageSize from '../../interface/plugins/datatables/ServerSide/components/ControlsPageSize';
import Table from '../../interface/plugins/datatables/ServerSide/components/Table';
import TablePagination from '../../interface/plugins/datatables/ServerSide/components/TablePagination';

const PaymentList = () => {
  const title = 'Event Booking List';
  const description = 'Event Booking List Page';
  const breadcrumbs = [
    { to: '', text: 'Home' },
    
    { to: '/admin/report/event', text: 'Event Booking List' },
  ];

  const columns = React.useMemo(() => {
    return [
      {
        Header: 'Event Name',
        accessor: 'Event_Name',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-20',
      },
      {
        Header: 'Booking id',
        accessor: 'Booking_Id',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
      {
        Header: 'Member Code',
        accessor: 'Member_Code',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
      {
        Header: 'Member Name',
        accessor: 'Member_Name',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      },
      
      
      {
        Header: 'Spouse Name',
        accessor: 'Spouse_Name',
        sortable: true,
        headerClassName: 'text-muted text-small text-uppercase w-10',
       
      },

      {
        Header: 'Total Dependents',
        accessor: 'Total_Dependents',
        sortable: false,
        headerClassName: 'text-muted text-small text-uppercase w-10',
      
        },

        {
          Header: 'Total Guest',
          accessor: 'Total_Guest',
          sortable: false,
          headerClassName: 'text-muted text-small text-uppercase w-10',
        
          },

          {
            Header: 'Non-veg Buffet',
            accessor: 'NonVeg',
            sortable: false,
            headerClassName: 'text-muted text-small text-uppercase w-10',
          
            },

            {
              Header: 'Veg Buffet',
              accessor: 'Veg',
              sortable: false,
              headerClassName: 'text-muted text-small text-uppercase w-10',
            
              },

              {
                Header: 'Total Buffet',
                accessor: 'Total_Buffet',
                sortable: false,
                headerClassName: 'text-muted text-small text-uppercase w-10',
              
                },

                {
                  Header: 'Table Book Detail',
                  accessor: 'Table_Book_Detail',
                  sortable: false,
                  headerClassName: 'text-muted text-small text-uppercase w-10',
                
                  }, {
                    Header: 'Admin Tablebook Response',
                    accessor: 'Admin_Tablebook_Response',
                    sortable: false,
                    headerClassName: 'text-muted text-small text-uppercase w-10',
                  
                    },
        
        
      /* { 
        Header: '',
        id: 'action',
        headerClassName: 'empty w-10',
        Cell: ({ row }) => {
          const { checked, onChange } = row.getToggleRowSelectedProps();
          return <Form.Check className="form-check float-end mt-1" type="checkbox" checked={checked} onChange={onChange} />;
        },
       }, */
    ];
  }, []);

  const [data, setData] = useState([]);
  const [eventdetail, seteventdetail] = useState([]);
  const [eventSelected, seteventSelected] = useState([]);
  const [eventid, seteventid] = useState([]);
  const [totdata, settotData] = useState([]);
  const [pageCount, setPageCount] = React.useState(3);
  // const [pageSize, setPageSize] = React.useState('1');
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [term, setTerm] = useState('');
  const csvLink = useRef()
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
      initialState: { pageIndex: 0, sortBy: [{ id: 'a.rsvp_id', desc: false }], hiddenColumns: [] },
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

  
  const handleSearchInputChange = (selectedOptionObj) => {
    seteventSelected(selectedOptionObj.label);
    seteventid(selectedOptionObj.value);
    // console.log("selectedOptionObj", selectedOptionObj);
  };

  const handleSearchInputChangeevent = (event) => {
    seteventSelected(event.target.label);
    seteventid(event.target.value);
  };

  const fetchevent = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}events/get_lastoneyear_events`, { params: {  } });

    setTimeout(() => {
      // const { result } = response.data.result;
      // console.log('response', response.data);
      seteventdetail(response.data.result);
      
      document.body.classList.remove('spinner');

      

    }, 1000);
  }, []);

  const fetchData = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}events/event_booking_report`, { params: { term, sortBy, pageSize, pageIndex,eventid } });

    setTimeout(() => {
      // const { result } = response.data.result;
      // console.log('response', response.data);
      setData(response.data.result);
      setPageCount(response.data.pageCount);
      document.body.classList.remove('spinner');

      

    }, 1000);

    const responsetot = await axios.get(`${API_URL}events/event_booking_report`, { params: { term, sortBy, eventid } });
    setTimeout(() => {
      // const { result } = response.data.result;
      // console.log('response', response.data);
      settotData(responsetot.data.result);
      

      

    }, 1000);
  }, [sortBy, pageIndex, pageSize, term,eventid]);
  const uploadConfig = {
    /* headers: { 'Accept': 'application/json',
     'Content-Type': 'multipart/form-data',
     } */
  };
  

  const searchItem = useAsyncDebounce((val) => {
    setTerm(val || undefined);
  }, 200);

  const getTransactionData = async () => {
    // 'api' just wraps axios with some setting specific to our app. the important thing here is that we use .then to capture the table response data, update the state, and then once we exit that operation we're going to click on the csv download link using the ref
    
    csvLink.current.link.click()
  }


  useEffect(() => {
    fetchevent();
  }, []);


  useEffect(() => {
    fetchData();
  }, [sortBy, fetchData, pageIndex, pageSize, term,eventid]);
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
                  {/* <ButtonsCheckAll tableInstance={tableInstance}  deleteItems={deleteItems} changeStatus={changeStatus} /> */}
                </Col>
              </Row>
            </div>

            <div>
              <Row className="mb-3">
              {/* <Col sm="12" md="5" lg="3" xxl="2">
                  <div className="d-inline-block float-md-start me-1 mb-1 mb-md-0 search-input-container w-100 shadow bg-foreground">
                    <ControlsSearch tableInstance={tableInstance} onChange={searchItem} />
                  </div>
                </Col> */}
                <Col sm="12" md="5" lg="3" xxl="4">
               
                  <p>Select Event</p>
                  
                    {/* <Select
                    className="select" 
                    classNamePrefix="react-select "
                      placeholder={eventSelected}
                      options={
                        eventdetail.map((item, index) => {
                           return {
                            
                            label: item.event_name,
                              value: item.id,
                              key: index
                           }
                        })
                     }
                      value={eventSelected}
                      onChange={handleSearchInputChange}
                      
                    >
                     
                    </Select> */}
                  
                    <Form.Select
                        value={eventSelected}
                        name="event_name"
                        onChange={(e) => {
                          handleSearchInputChangeevent(e);
                          
                        }}
                       
                      >
                        <option key="" value="">
                          ALL
                        </option>

                        {eventdetail.map(function (Items) {
                          return (
                            <option value={Items.id} key={Items.id} >
                              {Items.event_name}
                            </option>
                          )
                        })}
                        
                      </Form.Select>
                  {/* <CSVLink data={data}/> */}

                  
                  <CSVLink
         data={totdata}
         filename='event_booking_report.csv'
         className='hidden'
         ref={csvLink}
         target='_blank'
      />
                 
                </Col>
                <Col sm="12" md="7" lg="9" xxl="7" className="text-end">
                  
                  <div className="d-inline-block me-0 me-sm-3 float-start float-md-none">
                    <Button onClick={getTransactionData}>Download</Button>
                    {/*  <ControlsDelete tableInstance={tableInstance} deleteItems={deleteItems} /> */}
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

export default PaymentList;