/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-danger */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Modal, Container, Row, Col, Form, Table } from 'react-bootstrap';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { API_URL } from 'config.js';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import * as Yup from 'yup';
import Layout from 'layout/Layout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';


const Booking = () => {
    const title = 'Banquet Hall Booking';
    const description = 'Banquet Hall Booking';
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    // console.log('location', window.location.origin);
    const { isLogin, currentUser } = useSelector((state) => state.auth);

    const [banquetHalls, setBanquetHalls] = useState([]);
    const [banquetMenus, setBanquetMenus] = useState([]);
    const [menuitems, setmenuitems] = useState([]);
    const [selectedmenulist, setselectedmenulist] = React.useState([]);
    const [selectedmenu, setselectedmenu] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [selectedhall, sethall] = useState('');
    const [dp, setDp] = useState('1');
    const [hallcostval, sethallcost] = useState('0');
    const [projectorval, setprojector] = useState('0');
    const [musicval, setmusic] = useState('0');
    const [fishaddval, setfishaddval] = useState('0');
    const [totalcostval, settotalcostval] = useState('0');
    const [checkboxselect, setcheckboxselect] = useState(-1);


    const validationSchema = Yup.object().shape({
        banquethall: Yup.string().required('Banquet Hall is required'),
        noguest: Yup.string().required('No of guest is required'),
        // banquetdate: Yup.string().required('Date of Occassion is required'),
        banquetdate: Yup.string()
            .required('Date of Occassion is required')
            .test(
                'Available Date',
                'Hall is not available on this date', // <- key, message   values.banquethall 
                function (value) {
                    return new Promise((resolve, reject) => {
                        axios
                            .get(`${API_URL}banquet/check_banquet_hall_date`, { params: { member_code: currentUser.membercode, selecteddate: startDate, hall: selectedhall } })
                            .then((res) => {
                                // console.log('res', res.data.success);
                                if (res.data.success == '0') {
                                    resolve(true);
                                } else {
                                    resolve(false);
                                }
                            })
                            .catch((error) => {
                                // if (error.response.data.content === 'The email has already been taken.') {
                                resolve(false);
                                // }
                            });
                    });
                }
            ),
        banquethour: Yup.string().required('Hours Booking is required'),
        Projector: Yup.string().required('Projector Required is required'),
        music: Yup.string().required('Music System is required'),
        menuid: Yup.string().when([], { is: () => dp == '2', then: Yup.string().required('Please Select the Menu...') }),

        //  menuid: Yup.string().required('Menu is required'),

        // checkerror: Yup.string().when([], { 
        //     is: () => dp == '2' && checkboxselect>-1, then: Yup.string().required("Please don't exceed the limit...") }),


        // itemschild: Yup.array().when([], {
        //     is: () => dp == '2',
        //     then: Yup.array().of(
        //         Yup.object().shape({
        //             itemschildval: Yup.string().required('Item is required'),

        //         })
        //     ),
        // }),
    });


    useEffect(() => {
        // console.log('currentUser', currentUser);
        if (!currentUser.membercode) {
            history.push('/');
        } else if (currentUser.type !== 'U') {
            history.push('/InvalidAccess');
        }
    }, [currentUser, history]);
    const getBanquetHalls = React.useCallback(async () => {
        document.body.classList.add('spinner');
        const response = await axios.get(`${API_URL}banquet/banquet_get`);

        setTimeout(() => {
            const { result } = response.data;
            // let catloop = [];
            setBanquetHalls(result);
            document.body.classList.remove('spinner');
        }, 1000);
    }, []);
    const getBanquetMenus = React.useCallback(async () => {
        document.body.classList.add('spinner');
        const response = await axios.get(`${API_URL}banquet/banquet_menu_get_items`);

        setTimeout(() => {
            const { result } = response.data;
            // let catloop = [];
            setBanquetMenus(result);
            document.body.classList.remove('spinner');
        }, 1000);
    }, []);

    const fetchmenuitem = React.useCallback(async () => {
        //   document.body.classList.add('spinner');
        setselectedmenulist([]);
        const type = selectedmenu.banquet_menu_type;
        const menuid = selectedmenu.banquet_menu_id;
        const response = await axios.get(`${API_URL}banquet/banquet_menu_selected_course_get`, { params: { type, menuid } });

        setTimeout(() => {
            // const { result } = response.data.result;
            // console.log('response', response.data);
            setmenuitems(response.data.result);
            setcheckboxselect(-1);
            // document.body.classList.remove('spinner');



        }, 1000);

    }, [selectedmenu]);
    const updateStateList = (e, id, value, courseid, limit, y) => {
        // function updateStateList(e, value){
        console.log(e.target.checked)
        const items = selectedmenulist;
        const filteritems = [];
        const myObject = {
            'cid': courseid,
            'itemval': value,
        };
        if (e.target.checked) {
            // setselectedmenulist([...items, value]);
            //    const filteritems= items.filter(item => item.cid = courseid){return item;};


            items.forEach(function (item) {
                if (item.cid == courseid) {
                    filteritems.push(item);
                }
            });
            if (filteritems.length < limit) {

                setselectedmenulist([...items, myObject]);
                console.log('response');
                setcheckboxselect(-1);
            }
            else {
                e.target.checked = false;
                setcheckboxselect(y);
                setTimeout(() => {
                    setcheckboxselect(-1);
                }, 3000);
                // alert("Don't exceed the limit...")
            }
        } else {
            if (items.length > 0) {
                const lastIndex = items.length - 1;
                // setselectedmenulist(items.filter(item => item.item_id !== id));
                setselectedmenulist(items.filter(item => item.itemval.item_id !== id));
                setcheckboxselect(-1);
            }
            console.log('response');
        }
        console.log(selectedmenulist);
    }

    useEffect(() => {
        getBanquetHalls();
        getBanquetMenus();
    }, []);

    const changemenu = (item) => {
        setselectedmenu(item);
    };

    useEffect(() => {

        if (selectedmenu != null) {
            console.log(selectedmenu);
            fetchmenuitem();
        }

    }, [selectedmenu]);

    useEffect(() => {
        console.log(selectedmenulist);// fetchmenuitem();


    }, [selectedmenulist, dp, checkboxselect,selectedhall]);
    const emptyItem = {
        member_code: currentUser ? currentUser.membercode : '',
        member_name: currentUser ? currentUser.name : '',
        banquethall: '',
        banquetdate: '',
        banquethour: '',
        Projector: '',
        music: '',
        noguest: '',
        menuid: '',
        fish: '',
        cbiryani: '',
        mbiryani: '',

    };
    // const onSubmit = (values, { resetForm }) => {
    //    console.log('submit form', values);

    //   resetForm({ values: '' });

    // };
    const onSubmit = (values) => {
        //  alert('Save');
        const bhallitem = [];
        banquetHalls.forEach(function (item) {
            if (item.banquet_id.toString() == values.banquethall) {
                bhallitem.push(item);
            }
        });

        let totalhallcost = '0'; let hallcost = '0'; let electricity = '0'; let projector = '0'; let music = '0'; let fishadd = "0";
        let cbir = '0'; let mbir = '0'; let totalcost = '0';
        if (values.banquethour == '4') {
            hallcost = bhallitem[0].cost_4_hrs;
            electricity = bhallitem[0].electricity_4_hrs;
        }
        else {
            hallcost = bhallitem[0].cost_8_hrs;
            electricity = bhallitem[0].electricity_8_hrs;
        }
        totalhallcost = Number(hallcost) + Number(electricity);
        if (values.Projector == "Y")
            projector = bhallitem[0].projector;
        if (values.music == "Y")
            music = bhallitem[0].music;
        sethallcost(totalhallcost);
        setprojector(projector);
        setmusic(music);
        if (dp == '1') {
            setDp('2');
        }
        else if (dp == '2') {
            setDp('3');

            if (values.fish == true) {
                fishadd = Number(selectedmenu.fish_addon_cost) * Number(values.noguest);
                setfishaddval(fishadd);
            }
            else {
                setfishaddval(fishadd);
            }
            if (values.cbiryani == true) {
                cbir = '2500';
            }
            if (values.mbiryani == true) {
                mbir = '3350';
            }
            totalcost = Number(totalhallcost) + Number(projector) + Number(music) + Number(fishadd) + Number(cbir) + Number(mbir) + (Number(selectedmenu.banquet_menu_cost) * Number(values.noguest));
            settotalcostval(totalcost);

            menuitems.map((value, index) => {
                const limit = selectedmenu[value.menu_map_column];
                const test = selectedmenulist.find((element) => {

                    return element.cid === value.banquet_menu_course_id;

                });
                console.log(test);
                if (limit == test.length)
                    console.log(limit);
                else
                    console.log(limit);

                return test;
            });


        }
        else if (dp == '3') {
            if (values.fish == true) {
                fishadd = Number(selectedmenu.fish_addon_cost) * Number(values.noguest);
                setfishaddval(fishadd);
            }
            else {
                setfishaddval(fishadd);
            }
            if (values.cbiryani == true) {
                cbir = '2500';
            }
            if (values.mbiryani == true) {
                mbir = '3350';
            }
            totalcost = Number(totalhallcost) + Number(projector) + Number(music) + Number(fishadd) + Number(cbir) + Number(mbir) + (Number(selectedmenu.banquet_menu_cost) * Number(values.noguest));
            settotalcostval(totalcost);
            const menucost = (Number(selectedmenu.banquet_menu_cost) * Number(values.noguest));
            //     const memberid=currentUser.member_code;
            //   const banquethall=values.banquethall;
            //   const noguest=values.noguest;
            const response = axios.post(`${API_URL}banquet/banquet_book_add`, { values, selectedmenulist, totalhallcost, projector, music, menucost, fishadd, totalcost, cbir, mbir });
            setTimeout(() => {
                toast.success('Banquet request created successfully', {
                    position: 'top-right',
                });
                history.push('/member/banquet/myBooking');
                document.body.classList.remove('spinner');
            }, 1000);
        }


        // setDp(!dp);
    }
    // console.log(selectedItem);
    const initialValues = emptyItem;
    const formik = useFormik({ initialValues, validationSchema, onSubmit });
    const { handleSubmit, handleChange, setFieldValue, values, touched, errors } = formik;


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
                            <img src="/assets/images/banquet.JPG" alt="" className="img-fluid" />
                        </Col>
                    </Row>

                </div>
                <div className="page-title">
                    <Row>
                        <Col>
                            <h2>Banquets</h2>
                        </Col>
                    </Row>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Container fluid>
                        <div className="row form-main">
                            <div className="col-lg-7 col-md-7 col-sm-12">
                                {/* <div id='dp' name='dp' value={dp}/> */}

                                {dp == '1' &&
                                    <div>
                                        <div className="mb-3 mt-3">
                                            <Form.Label htmlFor="name">Member Name :</Form.Label>
                                            <Form.Control type="text" className="form-control" id="mname" value={currentUser.name}
                                                name="member-name" readOnly />
                                        </div>

                                        <div className="mb-3 mt-3">
                                            <Form.Label htmlFor="name">Member ID :</Form.Label>
                                            <Form.Control type="text" className="form-control" id="mid" value={currentUser.membercode}
                                                name="member-id" readOnly />
                                        </div>

                                        <div className="mb-3 mt-3">
                                            <Form.Label htmlFor="noguest">No of Guest :</Form.Label>
                                            <Form.Control type="text" className="form-control" id="noguest" value={values.noguest} onChange={handleChange}
                                                name="noguest"
                                                onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                            />
                                            {errors.noguest && touched.noguest && (
                                                <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                                    {errors.noguest}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-3 mt-3">
                                            <Form.Label htmlFor="name">Banquet hall :</Form.Label>
                                            <Form.Select className="form-select" id="banquethall" name="banquethall" defaultValue={values.banquethall}  onChange={(e) => {
                                                   sethall(e.target.value);
                                                   handleChange(e);
                                                    
                                                    

                                                }}>
                                                <option key="0" value="">Select Hall</option>


                                                {banquetHalls.map((x, y) => (
                                                    <option key={x.banquet_id} value={x.banquet_id}>
                                                        {x.banquet_name} (capacity-{x.capacity})
                                                    </option>
                                                ))}

                                            </Form.Select>
                                            {errors.banquethall && touched.banquethall && (
                                                <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                                    {errors.banquethall}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-3 mt-3">
                                            <Form.Label htmlFor="name">Date of Occassion :</Form.Label>
                                            <div className="input-group date" id="datepicker" >

                                                <DatePicker
                                                    className="form-control"
                                                    name="banquetdate"
                                                    minDate={new Date()}
                                                    minTime={new Date().setHours(10, 59, 0, 0)}
                                                    maxTime={new Date().setHours(23, 29, 0, 0)}
                                                    shouldCloseOnSelect
                                                    showTimeSelect
                                                    dateFormat="dd-MM-yyyy hh:mm aa"
                                                    selected={startDate}
                                                    defaultValue={values.banquetdate}
                                                    onChange={(date) => {
                                                        setStartDate(date);
                                                        //  handleChange(date);
                                                        setFieldValue('banquetdate', date);
                                                    }}
                                                />
                                                {errors.banquetdate && touched.banquetdate && (
                                                    <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                                        {errors.banquetdate}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mb-3 mt-3">
                                            <Form.Label htmlFor="name">Hours Booking :</Form.Label>
                                            <Form.Select className="form-select" id="banquethour" name="banquethour" defaultValue={values.banquethour} onChange={handleChange}>
                                                <option key="0" value="">Select Hour</option>
                                                <option key="4" value="4">4 Hours</option>
                                                <option key="8" value="8">8 Hours</option>
                                            </Form.Select>
                                            {errors.banquethour && touched.banquethour && (
                                                <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                                    {errors.banquethour}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-3 mt-3">
                                            <Form.Label htmlFor="name">Projector Required :</Form.Label>
                                            <Form.Select className="form-select" id="Projector" name="Projector" defaultValue={values.Projector} onChange={handleChange}>
                                                <option key="0" value="">Select </option>
                                                <option key="Y" value="Y">Yes</option>
                                                <option key="N" value="N">No</option>
                                            </Form.Select>
                                            {errors.Projector && touched.Projector && (
                                                <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                                    {errors.Projector}
                                                </div>
                                            )}
                                        </div>
                                        <div className="mb-3 mt-3">
                                            <Form.Label htmlFor="name">Music System :</Form.Label>
                                            <Form.Select className="form-select" id="music" name="music" defaultValue={values.music} onChange={handleChange}>
                                                <option key="0" value="">Select </option>
                                                <option key="Y" value="Y">Yes</option>
                                                <option key="N" value="N">No</option>
                                            </Form.Select>
                                            {errors.music && touched.music && (
                                                <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                                    {errors.music}
                                                </div>
                                            )}
                                        </div>
                                        <Button variant="primary" type="submit" >
                                            {/* onClick={() => setDp('2')} */}

                                            Next</Button>
                                        <br /><br /><br /><br /><br /><br />
                                    </div>
                                }

                            </div>

                            {dp == '2' &&
                                <div >
                                    <div className="page-title">
                                        <h2>Menu</h2>
                                        {errors.menuid && touched.menuid && (
                                            <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                                {errors.menuid}
                                            </div>
                                        )}
                                    </div>

                                    <div className="row form-main">
                                        {banquetMenus && banquetMenus.map((bx, y) => (

                                            <div className="col-lg-4 col-md-4 col-sm-12" key={bx.banquet_menu_id}>
                                                <div className="food-list" >
                                                    <h5>{bx.banquet_menu_name}</h5>
                                                    <p>{bx.banquet_menu_desc}<br /><br />
                                                    </p>
                                                    <p> &nbsp;&nbsp;<Form.Check name="menuid" type="radio" id="menuid" value={bx.banquet_menu_id}
                                                        checked={(values && values.menuid == bx.banquet_menu_id)}
                                                        label={`₹ ${bx.banquet_menu_cost}`}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            changemenu(bx);
                                                        }} /></p>
                                                </div>

                                            </div>))}




                                    </div>

                                    <div className="page-title">
                                        <h2>Menu Item</h2>
                                    </div>

                                    <div className="row">

                                        {selectedmenu && menuitems && menuitems.map((x, y) => (
                                            <div className="col-lg-4 col-md-4 col-sm-12" key={x.banquet_menu_course_id} style={{ marginTop: '10px' }}>
                                                <div className="row">

                                                    {/* {errors.checkerror && checkboxselect==y && (
                                            <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                                {errors.checkerror}
                                            </div>
                                        )} */}

                                                    {checkboxselect == y && (
                                                        <div style={{ position: 'relative' }} className="d-block invalid-tooltip" >
                                                            Don't exceed the limit
                                                        </div>
                                                    )}

                                                    <div className="col-lg-8 col-md-8 col-sm-8" style={{ paddingRight: '0px' }}>
                                                        <div className="menu-header">
                                                            <h4>{x.banquet_menu_course_name}</h4>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4" style={{ paddingLeft: '0px', paddingBottom: '5px' }}>
                                                        <div className="menu-option" >
                                                            <h4>Any {selectedmenu[x.menu_map_column]}</h4>
                                                        </div>

                                                    </div>
                                                </div>
                                                <FormikProvider value={formik}>
                                                    <FieldArray
                                                        name="itemschild"
                                                        render={arrayHelpers => (
                                                            <>

                                                                {x.order_items != null && JSON.parse(x.order_items).length > 0 && JSON.parse(x.order_items).map(function (Items, index) {
                                                                    if (Items.menu_course_id == x.banquet_menu_course_id) {
                                                                        return (
                                                                            <div className="item-list" key={Items.item_id}>

                                                                                <div className="form-check">
                                                                                    <input type="checkbox" className="form-check-input" id={x.banquet_menu_course_id} name='itemschildval'

                                                                                        checked={selectedmenulist.length > 0 && selectedmenulist.some(item => item.itemval.item_id === Items.item_id)}
                                                                                        onChange={(e) => {
                                                                                            handleChange(e);
                                                                                            updateStateList(e, Items.item_id, Items, x.banquet_menu_course_id, selectedmenu[x.menu_map_column], y);
                                                                                        }} />
                                                                                    <label className="form-check-label" htmlFor="check1">{Items.item_name}</label>
                                                                                </div>


                                                                            </div>
                                                                        )
                                                                    } return null;
                                                                }
                                                                )}
                                                            </>)} />
                                                </FormikProvider>
                                            </div>)

                                        )}

                                        {selectedmenu && (selectedmenu.banquet_menu_type == 'B' || selectedmenu.banquet_menu_type == 'N') &&

                                            <div className="col-lg-4 col-md-4 col-sm-12" style={{ marginTop: '10px' }}>
                                                <div className="row">
                                                    <div className="col-lg-8 col-md-8 col-sm-8" style={{ paddingRight: '0px' }}>
                                                        <div className="menu-header">
                                                            <h4>Fish</h4>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4" style={{ paddingLeft: '0px', paddingBottom: '5px' }}>
                                                        <div className="menu-option" />


                                                    </div>
                                                </div>
                                                <div className="item-list">

                                                    <div className="form-check">
                                                        <input type="checkbox" className="form-check-input" id="fish" name="fish" value={values.fish}
                                                            checked={(values && values.fish)}
                                                            onChange={(e) => {
                                                                handleChange(e);

                                                            }}
                                                        />
                                                        <label className="form-check-label" htmlFor="fish">Fish Addon</label>
                                                    </div>

                                                </div>
                                            </div>
                                        }

                                    </div>

                                    <br /><br />
                                    <div className="s-food">
                                        <h4>Biryani – (order 48 hours before the Party)</h4>


                                        <div className="form-check">
                                            {/* <input type="checkbox" className="form-check-input" id="check1" name="fish1" value="fish"  />
                                                <label className="form-check-label" htmlFor="check1">Yes</label><br /> */}
                                            <input type="checkbox" className="form-check-input" id="cbiryani" name="cbiryani" value={values.cbiryani}
                                                checked={(values && values.cbiryani)}
                                                onChange={(e) => {
                                                    handleChange(e);

                                                }} />
                                            <label className="form-check-label" htmlFor="cbiryani">Chicken Briyani</label><br />
                                            <input type="checkbox" className="form-check-input" id="mbiryani" name="mbiryani" value={values.mbiryani}
                                                checked={(values && values.mbiryani)}
                                                onChange={(e) => {
                                                    handleChange(e);

                                                }} />
                                            <label className="form-check-label" htmlFor="mbiryani">Mutton Briyani</label>
                                        </div>


                                        <p className="b-text">Chicken Biryani – Minimum 1.5 Kg (Serves 12 people) – Rs 2500 <br />
                                            Mutton Biryani – Minimum 1.5 Kg (Serves 12 people) – Rs 3350</p>

                                        {/* <a href="#" className="sub-btn">submit</a> */}
                                    </div>
                                    <button type="button" className="btn btn-primary main-btn" onClick={() => setDp('1')}>Previous</button>&nbsp;&nbsp;
                                    <button type="submit" className="btn btn-primary main-btn">Next</button>
                                </div>
                            }

                            {dp == '3' &&
                                <div className="row">
                                    

                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                    <br/>
                                    <Table striped hover variant="Primary" className='table-warning' style={{ border: 'solid 0px #FFD382'}} >
                                            <tbody>
                                                <tr>
                                                    <td>Member Code :  </td>
                                                    <td><b>&nbsp;&nbsp;{currentUser.membercode}</b></td></tr>
                                                <tr>
                                                    <td>Member Name : </td>
                                                    <td><b>&nbsp;&nbsp;{currentUser.name}</b></td></tr>
                                                <tr>
                                                    <td>Number of guest :</td>
                                                    <td><b>&nbsp;&nbsp;{values.noguest}</b></td></tr>
                                                <tr>
                                                    <td>Date of Occassion :</td>
                                                    <td><b>&nbsp;&nbsp;{values.banquetdate.toLocaleString()}</b></td></tr>
                                                <tr>
                                                    <td>Hall :</td>
                                                    {banquetHalls.filter(item => item.banquet_id == values.banquethall).map(filtereditem => (
                                                        <td key={filtereditem.banquet_name}><b>&nbsp;&nbsp;{filtereditem.banquet_name}</b></td>
                                                    ))}</tr>
                                                <tr>
                                                    <td>Hours :</td>
                                                    <td><b>&nbsp;&nbsp;{values.banquethour}</b></td>
                                                </tr>

                                                <tr>
                                                    <td>Projector :</td>
                                                    {values.Projector && values.Projector == 'Y' ? <td><b>&nbsp;&nbsp;Yes</b></td> : <td><b>&nbsp;&nbsp;No</b></td>}
                                                </tr>
                                                <tr>
                                                    <td>Music System :</td>
                                                    {values.music && values.music == 'Y' ? <td><b>&nbsp;&nbsp;Yes</b></td> : <td><b>&nbsp;&nbsp;No</b></td>}
                                                </tr>
                                                <tr>
                                                    <td>Menu Name :</td>

                                                    {banquetMenus.filter(item => item.banquet_menu_id == values.menuid).map(filtereditem => (
                                                        <td key={filtereditem.banquet_menu_name}><b>&nbsp;&nbsp;{filtereditem.banquet_menu_name}</b></td>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    <td>Fish Addon :</td>
                                                    {values.fish && values.fish == true ? <td><b>&nbsp;&nbsp;Yes</b></td> : <td><b>&nbsp;&nbsp;No</b></td>}
                                                </tr>
                                                <tr>
                                                    <td>Chicken Biryani :</td>
                                                    {values.cbiryani && values.cbiryani == true ? <td><b>&nbsp;&nbsp;Yes</b></td> : <td><b>&nbsp;&nbsp;No</b></td>}</tr>
                                                <tr>
                                                    <td>Mutton Biryani :</td>
                                                    {values.mbiryani && values.mbiryani == true ? <td><b>&nbsp;&nbsp;Yes</b></td> : <td><b>&nbsp;&nbsp;No</b></td>}</tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                    <br/>
                                        <Table striped hover variant="Primary" className='table-warning' style={{ border: 'solid 0px #FFD382'}} >
                                            <tbody>
                                                <tr><td>Banquet Hall Cost :  </td>
                                                    <td><b>&nbsp;&nbsp;Rs.{hallcostval}</b></td></tr>
                                                <tr><td>Projector Cost : </td>
                                                    <td><b>&nbsp;&nbsp;Rs.{projectorval}</b></td></tr>
                                                <tr><td>Music System cost :</td>
                                                    <td><b>&nbsp;&nbsp;Rs.{musicval}</b></td></tr>
                                                <tr><td>Menu cost :</td>
                                                    <td><b>&nbsp;&nbsp;Rs.{Number(selectedmenu.banquet_menu_cost) * Number(values.noguest)}</b></td></tr>
                                                <tr><td>Fish Addon cost :</td>
                                                    <td><b>&nbsp;&nbsp;Rs.{fishaddval}</b></td></tr>
                                                <tr><td>Chicken Biryani cost :</td>
                                                    {values.cbiryani && values.cbiryani == true ? <td><b>&nbsp;&nbsp;Rs.2500</b></td> : <td><b>&nbsp;&nbsp;-</b></td>}
                                                </tr>
                                                <tr><td>Mutton Biryani cost :</td>
                                                    {values.mbiryani && values.mbiryani == true ? <td><b>&nbsp;&nbsp;Rs.3350</b></td> : <td><b>&nbsp;&nbsp;-</b></td>}
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <br/>
                                        <div className="mb-3 mt-3"><td>Total cost : <b>&nbsp;&nbsp;{totalcostval}</b></td></div>
                                        <button type="button" className="btn btn-primary main-btn" onClick={() => setDp('2')}>Previous</button>&nbsp;&nbsp;
                                        <button type="submit" className="btn btn-primary main-btn">Submit</button>
                                    </div>

                                </div>}

                            <br /> <br /> <br />


                            <div className="col-lg-5 col-md-5" />


                            <br /> <br /> <br />
                        </div>
                    </Container>
                </Form>

                {/* Title End */}
            </Layout>
        </>
    );
};

export default Booking;
