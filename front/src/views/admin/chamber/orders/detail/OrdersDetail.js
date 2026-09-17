/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Card, Table } from 'react-bootstrap';
import axios from 'axios';
import { SERVICE_URL, API_URL } from 'config.js';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { catImageLivePath, itemImageLivePath,chamberFilePath } from 'constants.js';
import { toast } from 'react-toastify';
import Layout from '../../../../../layout/Layout';


const OrdersDetail = () => {
    const title = 'Order Detail';
    const description = 'Banquet Booking Detail Page';
    const [data, setData] = useState([]);
    const [item, setitem] = useState([]);
    const { id } = useParams();
    const history = useHistory();
    const fetchData = React.useCallback(async () => {
        document.body.classList.add('spinner');
        const response = await axios.get(`${API_URL}chamber/chamber_get`, { params: { id, pageSize: 1 } });

        setTimeout(() => {
            /// const { result } = response.data;
            setData(response.data.result);

            document.body.classList.remove('spinner');
        }, 1000);
    }, [id]);



    useEffect(() => {
        fetchData();


    }, []);
    
        const handleconfirm = React.useCallback(async () => {
       
            document.body.classList.add('spinner');
            // const response = await axios.get(`http://3.109.198.190:5000/dashboard/get_broadcast`, { params: { term, sortBy, pageSize, pageIndex } });
            const response = await axios.post(`${API_URL}chamber/chamber_book_update_status`, { id,status:'2' });
              setTimeout(() => {
        toast.success('Chamber Booking Request Confirmed...', {
                  position: 'top-right',
                });
                fetchData();
              document.body.classList.remove('spinner');
            }, 1000);
        }, [id]);
      

      
        const handlereject = React.useCallback(async () => {
       
        document.body.classList.add('spinner');
        // const response = await axios.get(`http://3.109.198.190:5000/dashboard/get_broadcast`, { params: { term, sortBy, pageSize, pageIndex } });
        const response =  await axios.post(`${API_URL}chamber/chamber_book_update_status`, { id ,status:'0'});
          setTimeout(() => {
    toast.success('Chamber Booking Request Rejected...', {
              position: 'top-right',
            });
            fetchData();
          document.body.classList.remove('spinner');
        }, 1000);
    
    }, [id]);

    return (
        <>
            <HtmlHead title={title} description={description} />
            <Layout>
                <div className="page-title-container">
                    <Row>
                        <Col>
                            {/* Title Start */}

                            {/* Title End */}
                            { }
                            <img src="/assets/images/chambers.png" alt="" className="img-fluid" />
                        </Col>
                    </Row>

                </div>
                <div className="page-title">
                    <Row>
                        <Col>
                            <h2>Chamber Booking Detail</h2>
                        </Col>
                    </Row>
                </div>
                {data && data.length > 0 ?
                    <div className="row">


                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <br />

                            <Table striped hover variant="Primary" className='table-warning' style={{ border: 'solid 0px #FFD382' }} >
                                <tbody>
                                    <tr>
                                        <td>Booking Id :  </td>
                                        <td><b>&nbsp;&nbsp;{data[0].chamber_book_id}</b></td></tr>
                                    <tr>
                                        <td>Member Code :  </td>
                                        <td><b>&nbsp;&nbsp;{data[0].member_id}</b></td></tr>
                                    <tr>
                                        <td>Member Name : </td>
                                        <td><b>&nbsp;&nbsp;{data[0].member_name}</b></td></tr>
                                    <tr>
                                        <td>Email :</td>
                                        <td><b>&nbsp;&nbsp;{data[0].email}</b></td></tr>
                                    <tr>
                                        <td>Phone :</td>
                                        <td><b>&nbsp;&nbsp;{data[0].phone}</b></td></tr>
                                    <tr>
                                        <td>No of rooms :</td>

                                        <td ><b>&nbsp;&nbsp;{data[0].no_room}</b></td>
                                    </tr>
                                    <tr>
                                        <td>Guest Name :</td>
                                        <td><b>&nbsp;&nbsp;{data[0].guest_name}</b></td>
                                    </tr>


                                    <tr>
                                        <td>Nationality :</td>


                                        <td ><b>&nbsp;&nbsp;{data[0].nationality}</b></td>

                                    </tr>
                                    <tr>
                                        <td>Id Proof :</td>

                                        <td ><b>&nbsp;&nbsp; <a
                                            href={data[0].id_proof ? `${chamberFilePath}${data[0].id_proof}` : '#'}
                                            alt="product"
                                            target="_blank"
                                            className="card-img card-img-horizontal sw-11 h-100"
                                            rel="noreferrer"
                                        >
                                            {/* {data[0].id_proof} */}
                                            View
                                        </a></b></td>
                                       

                                    </tr>

                                    <tr>
                                        <td>Check In Date :</td>


                                        <td ><b>&nbsp;&nbsp;{data[0].check_in_date}</b></td>

                                    </tr>

                                    <tr>
                                        <td>Check Out Date :</td>


                                        <td ><b>&nbsp;&nbsp;{data[0].check_out_date}</b></td>

                                    </tr>
                                    <tr>
                                        <td>Status :</td>

                                        {data[0].status==='2' ? <td><b>&nbsp;&nbsp;Confirmed</b></td> : data[0].status==='1' ? <td><b>&nbsp;&nbsp;Requested</b></td> : <td><b>&nbsp;&nbsp;Rejected</b></td>}
                                      

                                    </tr>
                                    <tr>
                                        <td>Type :</td>

                                        <td ><b>&nbsp;&nbsp;{data[0].type}</b></td>
                                      

                                    </tr>
                                    {data[0].type==='Affiliate'?
                                    <tr>
                                        <td>Club Name :</td>

                                        <td ><b>&nbsp;&nbsp;{data[0].club_name}</b></td>
                                      

                                    </tr>
                                    :''}
                                    {data[0].type==='Affiliate'?
                                    <tr>
                                        <td>Verify Status :</td>

                                       
                                        {data[0].verify_status===1 ? <td><b>&nbsp;&nbsp;Verified</b></td> :  <td><b>&nbsp;&nbsp;Not Verified</b></td>}

                                    </tr>
                                    :''}

                                    <tr>
                                        <td>Number of Days :</td>
                                        <td ><b>&nbsp;&nbsp;{data[0].no_days}</b></td>
                                    </tr>
                                    <br /><br />
                                    <button type="button" className="btn btn-primary main-btn" onClick={() => history.goBack()} >Go Back</button>
                                    <button type="button" className="btn btn-green main-btn" onClick={() => handleconfirm()} >Confirm</button>
                                    <button type="button" className="btn btn-red main-btn" onClick={() => handlereject()} >Reject</button>
                                    <br /><br />
                                </tbody>
                            </Table>
                        </div>


                    </div>
                    : ''}
            </Layout>
        </>
    );
};

export default OrdersDetail;
