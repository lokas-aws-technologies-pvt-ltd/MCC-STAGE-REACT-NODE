/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Card,Table } from 'react-bootstrap';
import axios from 'axios';
import { SERVICE_URL, API_URL } from 'config.js';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { catImageLivePath, itemImageLivePath } from 'constants.js';
import { toast } from 'react-toastify';
import Layout from '../../../../../layout/Layout';


const OrdersDetail = () => {
  const title = 'Order Detail';
  const description = 'Banquet Booking Detail Page';
  const [data, setData] = useState([]);
  const { id } = useParams();
  const fetchData = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}banquet/banquet_book_get`, { params: { id,pageSize:1 } });

    setTimeout(() => {
      /// const { result } = response.data;
      setData(response.data.result);

      document.body.classList.remove('spinner');
    }, 1000);
  }, [id]);
  
  useEffect(() => {
    fetchData();
    
  }, []);
  const changeStatus = React.useCallback(async ({ ids, orderstatus }) => {
    // console.log();
    document.body.classList.add('spinner');
    const response = await axios.post(`${API_URL}restaurant/order_status_update`, { ids, orderstatus });
    setTimeout(() => {
      toast.success('Order Status Updated Successfully', {
        position: 'top-right',
      });
      fetchData();
      document.body.classList.remove('spinner');
    }, 1000);
  }, []);
 
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
                            <img src="/assets/images/banquet.png" alt="" className="img-fluid" />
                        </Col>
                    </Row>

                </div>
      <div className="page-title">
                    <Row>
                        <Col>
                            <h2>Banquets Booking Detail</h2>
                        </Col>
                    </Row>
                </div>
      {data&&data.length>0?
      <div className="row">
                                    

                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                    <br/>
                                   
                                    <Table striped hover variant="Primary" className='table-warning' style={{ border: 'solid 0px #FFD382'}} >
                                            <tbody>
                                            <tr>
                                                    <td>Booking Id :  </td>
                                                    <td><b>&nbsp;&nbsp;{data[0].id}</b></td></tr>
                                                <tr>
                                                    <td>Member Code :  </td>
                                                    <td><b>&nbsp;&nbsp;{data[0].member_id}</b></td></tr>
                                                <tr>
                                                    <td>Member Name : </td>
                                                    <td><b>&nbsp;&nbsp;{data[0].first_name}</b></td></tr>
                                                <tr>
                                                    <td>Number of guest :</td>
                                                    <td><b>&nbsp;&nbsp;{data[0].no_guest}</b></td></tr>
                                                <tr>
                                                    <td>Date of Occassion :</td>
                                                    <td><b>&nbsp;&nbsp;{data[0].book_date.toLocaleString()}</b></td></tr>
                                                <tr>
                                                    <td>Hall :</td>
                                                  
                                                        <td ><b>&nbsp;&nbsp;{data[0].banquet_hall_name}</b></td>
                                                   </tr>
                                                <tr>
                                                    <td>Hours :</td>
                                                    <td><b>&nbsp;&nbsp;{data[0].hours}</b></td>
                                                </tr>

                                                <tr>
                                                    <td>Projector :</td>
                                                    {data[0].Projector && data[0].Projector === 'Y' ? <td><b>&nbsp;&nbsp;Yes</b></td> : <td><b>&nbsp;&nbsp;No</b></td>}
                                                </tr>
                                                <tr>
                                                    <td>Music System :</td>
                                                    {data[0].music && data[0].music === 'Y' ? <td><b>&nbsp;&nbsp;Yes</b></td> : <td><b>&nbsp;&nbsp;No</b></td>}
                                                </tr>
                                                <tr>
                                                    <td>Menu Name :</td>

                                                   
                                                        <td ><b>&nbsp;&nbsp;{data[0].menu_name}</b></td>
                                                   
                                                </tr>
                                                <tr>
                                                    <td>Fish Addon :</td>
                                                    {data[0].fish_addon && data[0].fish_addon === 'true' ? <td><b>&nbsp;&nbsp;Yes</b></td> : <td><b>&nbsp;&nbsp;No</b></td>}
                                                </tr>
                                                <tr>
                                                    <td>Chicken Biryani :</td>
                                                    {data[0].chicken_biryani && data[0].chicken_biryani === 'true' ? <td><b>&nbsp;&nbsp;Yes</b></td> : <td><b>&nbsp;&nbsp;No</b></td>}</tr>
                                                <tr>
                                                    <td>Mutton Biryani :</td>
                                                    {data[0].mutton_biryani && data[0].mutton_biryani === 'true' ? <td><b>&nbsp;&nbsp;Yes</b></td> : <td><b>&nbsp;&nbsp;No</b></td>}</tr>
                                                    <br/><br/>
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                    <br/>
                                        <Table striped hover variant="Primary" className='table-warning' style={{ border: 'solid 0px #FFD382'}} >
                                            <tbody>
                                                <tr><td>Banquet Hall Cost :  </td>
                                                    <td><b>&nbsp;&nbsp;Rs.{data[0].hall_cost}</b></td></tr>
                                                <tr><td>Projector Cost : </td>
                                                    <td><b>&nbsp;&nbsp;Rs.{data[0].projector_cost}</b></td></tr>
                                                <tr><td>Music System cost :</td>
                                                    <td><b>&nbsp;&nbsp;Rs.{data[0].music_cost}</b></td></tr>
                                                <tr><td>Menu cost :</td>
                                                    <td><b>&nbsp;&nbsp;Rs.{data[0].menu_cost}</b></td></tr>
                                                <tr><td>Fish Addon cost :</td>
                                                    <td><b>&nbsp;&nbsp;Rs.{data[0].fish_addon_cost}</b></td></tr>
                                                <tr><td>Chicken Biryani cost :</td>
                                                    {data[0].chicken_biryani && data[0].chicken_biryani === 'true' ? <td><b>&nbsp;&nbsp;Rs.{data[0].chicken_biryani_cost}</b></td> : <td><b>&nbsp;&nbsp;-</b></td>}
                                                </tr>
                                                <tr><td>Mutton Biryani cost :</td>
                                                    {data[0].mutton_biryani && data[0].mutton_biryani === 'true' ? <td><b>&nbsp;&nbsp;Rs.{data[0].mutton_biryani_cost}</b></td> : <td><b>&nbsp;&nbsp;-</b></td>}
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <br/>
                                        <div className="mb-3 mt-3" style={{textAlign:'center'}}>Total cost : <b>&nbsp;&nbsp;Rs.{data[0].total_cost}</b></div>
                                        {/* <button type="button" className="btn btn-primary main-btn" onClick={() => setDp('2')}>Previous</button>&nbsp;&nbsp;
                                        <button type="submit" className="btn btn-primary main-btn">Submit</button> */}
                                    </div>

                                </div>
                                :''}
      </Layout>
    </>
  );
};

export default OrdersDetail;
