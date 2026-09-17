/* eslint-disable no-cond-assign */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Modal, Container, Row, Col } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { eventFilePath } from 'constants.js';
import { parseISO } from 'date-fns';
import moment from 'moment';

const EventAddEdit = ({ tableInstance, addItem, editItem }) => {
  const { selectedFlatRows, data, catData, parentCats, catSubData, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;
  const emptyItem = {
    id: '',
    event_image: '',
    event_name: '',
    event_description: '',
    event_category: '',
    event_date_from: '',
    event_date_to: '',
    event_status: 0,
    venue: '',
    parentCat: '2',
    is_guest_allowed: 'N',
    is_dependent_allowed: 'N',
    is_member_charged: 'N',
    food_served: 'N',
    buffet_total: '',
    buffet_vprice: '',
    buffet_nvprice: '',
    is_dependent_charged: 'N',
    price_for_dependent: '',
    total_guest_tickets: '',
    ticket_price_per_guest: '',
    price_for_member: '',
    ticket_per_member: '',
    invitation_attachment: '',
    tournament_type: 'T',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image5: '',
    image6: '',
    gvideopath: '',
    highdesc: '',
    table_book_available: 'N',
    is_seat_book_open: 'Y',
    seat_2: '',
    seat_4: '',
    seat_6: '',
    seat_8: '',
  };
  const [selectedItem, setSelectedItem] = useState(emptyItem);
  const [selectParentCat, setSelectParentCat] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [menuImg, setMenuImg] = useState('');
  const [catDrop, setCatDrop] = useState([]);
  const refFileUpload = useRef(null);
  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
  const validationSchema = Yup.object().shape({
    event_image: Yup.mixed().required('Event Banner is required'),
    event_name: Yup.string().required('Event Name is required'),
    event_description: Yup.string().required('Event Description is required'),
    event_category: Yup.string().required('Event Category is required'),
    event_date_from: Yup.date().typeError('Invalid date').required('Start Date is required'),
    // .min(new Date(), 'Start Date must be later than today'),
    event_date_to: Yup.date()
      .typeError('Invalid date')
      .when('event_date_from', (event_date_from) => {
        if (event_date_from) {
          return Yup.date().min(event_date_from, 'End Date must be after Start Date').typeError('End Date is required');
        }
      })
      .required('End Date is required')
      .min(new Date(), 'End Date must be later than today'),
    event_status: Yup.string().required('Event Status is required'),
    venue: Yup.string().required('Venue is required'),
    tournament_type: Yup.string().when('event_category', { is: '1', then: Yup.string().required('Tournament Type is required') }),
    is_guest_allowed: Yup.string().required('Is guest is allowed is required'),
    is_dependent_allowed: Yup.string().when('parentCat', {
      is: '2',
      then: Yup.string().required('Is Dependent is allowed is required'),
    }),
    is_member_charged: Yup.string().when('parentCat', {
      is: '2',
      then: Yup.string().required('is Member Charged is required'),
    }),
    price_for_member: Yup.number().when('is_member_charged', { is: 'Y', then: Yup.number().required('Member Ticket Price is required') }),
    food_served: Yup.string().when('parentCat', {
      is: '2',
      then: Yup.string().required('Is Buffet Served  is required'),
    }),
    buffet_total: Yup.number().when('food_served', { is: 'Y', then: Yup.number().required('Total buffet is required') }),
    buffet_vprice: Yup.number().when('food_served', { is: 'Y', then: Yup.number().required('Buffet Veg Price is required') }),
    buffet_nvprice: Yup.number().when('food_served', { is: 'Y', then: Yup.number().required('Buffet Non-veg Price is required') }),
    is_dependent_charged: Yup.string().when('parentCat', {
      is: '2',
      then: Yup.string().required('Is Dependent charge is required'),
    }),
    price_for_dependent: Yup.number().when('is_dependent_charged', { is: 'Y', then: Yup.number().required('Member Ticket Price is required') }),
    total_guest_tickets: Yup.number().when('is_guest_allowed', { is: 'Y', then: Yup.number().required('Total Guest Tickets allowed is required') }),
    ticket_price_per_guest: Yup.number().when('is_guest_allowed', { is: 'Y', then: Yup.number().required('Ticker per Guest is required') }),
    ticket_per_member: Yup.number().when('is_guest_allowed', { is: 'Y', then: Yup.number().required('Ticket Per Member is required') }),
    invitation_attachment: Yup.mixed().required('Invitation Attachment is required'),
    // image1: Yup.mixed().when('event_status', { is: '2', then: Yup.mixed().required('Gallery Image 1 is required') }),
    // image2: Yup.mixed().when('event_status', { is: '2', then: Yup.mixed().required('Gallery Image 2 is required') }),
    // image3: Yup.mixed().when('event_status', { is: '2', then: Yup.mixed().required('Gallery Image 3 is required') }),
    // image4: Yup.mixed().when('event_status', { is: '2', then: Yup.mixed().required('Gallery Image 4 is required') }),
    // gvideopath: Yup.mixed().when('event_status', { is: '2', then: Yup.mixed().required('Gallery Video Path is required') }),
    // highdesc: Yup.mixed().when('event_status', { is: '2', then: Yup.mixed().required('Highlight Description is required') }),




  });
  const onThumbChangeClick = () => {
    if (refFileUpload) {
      refFileUpload.current.dispatchEvent(new MouseEvent('click'));
    }
  };
  const changeThumb = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setSelectedItem({ ...selectedItem, event_image: loadEvent.target.result });
        setMenuImg(loadEvent.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const onSubmit = (values, { resetForm }) => {
    // console.log('submit form', values);
    // values.parentCat = selectParentCat;
    if (selectedFlatRows.length === 1) {
      editItem({ item: values });

      // const { index } = selectedFlatRows[0];
      // const newData = data.map((row, rowIndex) => (rowIndex === index ? selectedItem : row));
      // setData(newData);
    } else {
      addItem({ item: values });
    }
    resetForm({ values: '' });
    setIsOpenAddEditModal(false);
  };
  const updateImagePath = (selectRows) => {
    // console.log('updateimagepath',selectedItem);
    if (selectRows[0].original.item_image != '') {
      // setSelectedItem({ ...selectedItem, {event_image: `${itemImageLivePath}${selectRows[0].original.item_image}`} });
    }
  };
  useEffect(() => {
    if (isOpenAddEditModal && selectedFlatRows.length === 1) {
      setSelectedItem(selectedFlatRows[0].original);
      setMenuImg('');
    } else {
      setSelectedItem(emptyItem);
      setMenuImg('');
    }

    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenAddEditModal, selectedFlatRows]);
  useEffect(() => {
    const catloop = catData.reduce(function (r, o) {
      const k = o.parent_id; // unique `loc` key

      if (r[k] || (r[k] = [])) r[k].push(o);
      return r;
    }, {});
    setCatDrop(catloop);
  }, [catData]);
  useEffect(() => {
    if (isOpenAddEditModal && selectedFlatRows.length === 1) {
      if (selectedFlatRows[0].original.item_image != '') {
        setMenuImg(`${eventFilePath}${selectedFlatRows[0].original.event_image}`);
      }
    }
  }, [selectedFlatRows, isOpenAddEditModal]);

  // console.log(selectedItem);
  const initialValues = selectedItem;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const { handleSubmit, handleChange, setFieldValue, values, touched, errors } = formik;
  const changeActive = (event) => {
    if (event.target.checked) {
      setSelectedItem({ ...selectedItem, event_status: event.target.value });
    }
  };

  const changetablebook = (event) => {
    if (event.target.checked) {
      setSelectedItem({ ...selectedItem, table_book_available: event.target.value });
    }
  };

  const changetablebookopen = (event) => {
    if (event.target.checked) {
      setSelectedItem({ ...selectedItem, is_seat_book_open: event.target.value });
    }
  };

  const changeseat_2 = (event) => {
    if (event.target.checked) {
      setSelectedItem({ ...selectedItem, seat_2: 1 });
    }
    else
    {
      setSelectedItem({ ...selectedItem, seat_2: 0 });
    }
  };

  const changeseat_4 = (event) => {
    if (event.target.checked) {
      setSelectedItem({ ...selectedItem, seat_4: 1 });
    }
    else
    {
      setSelectedItem({ ...selectedItem, seat_4: 0 });
    }
  };

  const changeseat_6 = (event) => {
    if (event.target.checked) {
      setSelectedItem({ ...selectedItem, seat_6: 1 });
    }
    else
    {
      setSelectedItem({ ...selectedItem, seat_6: 0 });
    }
  };
  const changeseat_8 = (event) => {
    if (event.target.checked) {
      setSelectedItem({ ...selectedItem, seat_8: 1 });
    }
    else
    {
      setSelectedItem({ ...selectedItem, seat_8: 0 });
    }
  };

  const changeVaries = (event) => {
    if (event.target.checked) {
      setSelectedItem({ ...selectedItem, is_guest_allowed: event.target.value });
    }
  };
  const changeDepent = (event) => {
    if (event.target.checked) {
      setSelectedItem({ ...selectedItem, is_dependent_allowed: event.target.value });
    }
  };
  const changeMemCharge = (event) => {
    if (event.target.checked) {
      setSelectedItem({ ...selectedItem, is_member_charged: event.target.value });
    }
  };

  const changeFoodServed = (event) => {
    if (event.target.checked) {
      setSelectedItem({ ...selectedItem, food_served: event.target.value });
    }
  };
  const changeTournament = (event) => {
    if (event.target.checked) {
      setSelectedItem({ ...selectedItem, tournament_type: event.target.value });
    }
  };

  useEffect(() => {
    if (selectedFlatRows.length === 1) {
      // get user and set form fields
      // console.log('tournament_type', selectedFlatRows);
      const fields = [
        'id',
        'event_image',
        'event_name',
        'event_description',
        'event_category',
        'event_date_from',
        'event_date_to',
        'event_status',
        'venue',
        'event_category',
        'is_guest_allowed',
        'is_dependent_allowed',
        'is_member_charged',
        'price_for_member',
        'food_served',
        'is_dependent_charged',
        'price_for_dependent',
        'buffet_total',
        'buffet_vprice',
        'buffet_nvprice',
        'total_guest_tickets',
        'ticket_price_per_guest',
        'ticket_per_member',
        'invitation_attachment',
        'image1',
        'image2',
        'image3',
        'image4',
        'image5',
        'image6',
        'tournament_type', 'gvideopath', 'highdesc','table_book_available',
        'is_seat_book_open',
        'seat_2',
        'seat_4',
        'seat_6',
        'seat_8',
      ];
      fields.forEach((field) => {
        // console.log('selectedItem', selectedItem[field]);

        if (field == 'event_date_from') {
          const myStartDate = parseISO(selectedItem.event_date_from);
          // const myStartDate = format(myStartDate1, 'dd-MM-yyyy hh:mm a');
          //  const myStartDate = new Date(Date.parse(selectedItem[field].replace('-','/','g')));
          // myStartDate = moment(myStartDate).format('DD-MM-YYYYY hh:mm a')

          // console.log('myStartDate', Date.parse(myStartDate));
          setStartDate(Date.parse(myStartDate));
          setFieldValue(field, myStartDate, false);
        } else if (field == 'event_date_to') {
          //  setEndDate(selectedItem[field]);
          const myEndDate = parseISO(selectedItem[field]);
          // console.log('myEndDate', myEndDate);
          setEndDate(Date.parse(myEndDate));
          setFieldValue(field, myEndDate, false);
        } else {
          if (field == 'event_category') {
            const selectedInd = catData.findIndex((todo) => todo.id == selectedItem[field]);
            // console.log('selectedInd', selectedInd);
            if (selectedInd != '-1') {
              // console.log('catData', catData[selectedInd].parent_id);
              setSelectParentCat(catData[selectedInd].parent_id);
              setFieldValue('parentCat', catData[selectedInd].parent_id);
            }
            setFieldValue(field, selectedItem[field], false);
          }
          setFieldValue(field, selectedItem[field], false);
        }
      });
      // values = selectedItem;
    }
  }, [selectedItem, selectedFlatRows]);
  // console.log('startDate', startDate);
  const handleSelectedChange = (event) => {
    // console.log('catData', catData);
    const selectedIndese = catData.findIndex((todo) => todo.id == event.target.value);
    // console.log('parent', catData[selectedIndese].parent_id);
    // console.log(event.target.value);
    setSelectParentCat(catData[selectedIndese].parent_id);
    setSelectedItem({ ...selectedItem, parentCat: catData[selectedIndese].parent_id });
    setSelectedItem({ ...selectedItem, event_category: event.target.value });
    // setSelectedItem({ ...selectedItem, parentCat: catData[selectedIndese].parent_id });
  };
  const changeDepentCharge = (event) => {
    if (event.target.checked) {
      if (event.target.value == 'N') {
        // console.log('event.target.value', event.target.value);
        setSelectedItem({ ...selectedItem, price_for_dependent: '0' });
        setFieldValue('price_for_dependent', '0', false);
      }
      setSelectedItem({ ...selectedItem, is_dependent_charged: event.target.value });
    }
  };
  // console.log('catDrop', catDrop[0]);
  return (
    <Modal className="modal-centered" size="xl" backdrop="static" keyboard={false} show={isOpenAddEditModal} onHide={() => setIsOpenAddEditModal(false)}>
      <Modal.Header>
        <Modal.Title>{selectedFlatRows.length === 1 ? 'Edit' : 'Add'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Container fluid>
            <Row>
              <Col md="6">
                <Row>
                  <Col md="12">
                    <div className="mb-6 mx-auto position-relative" id="imageUpload">
                      <img
                        key="img0"
                        src={menuImg ? `${menuImg}` : selectedItem.item_image ? `${selectedItem.item_image}` : '/assets/images/mcc-fav.png'}
                        alt="user"
                        className="rounded-xl border border-separator-light border-4 eventimgwidth"
                        id="contactThumbModal"
                      />
                      <Button
                        size="sm"
                        variant="separator-light"
                        className="btn-icon btn-icon-only position-absolute rounded-xl s-0 b-0"
                        onClick={onThumbChangeClick}
                      >
                        <CsLineIcons icon="upload" className="text-alternate" />
                      </Button>
                      <Form.Control
                        type="file"
                        name="event_image"
                        id="event_image"
                        ref={refFileUpload}
                        className="file-upload d-none"
                        accept="image/*"
                        onChange={(e) => {
                          handleChange(e);
                          changeThumb(e);
                          setFieldValue('file', e.currentTarget.files[0]);
                        }}
                      />
                      {errors.event_image && touched.event_image && (
                        <div
                          ref={(element) => {
                            if (element) element.style.setProperty('width', '100%', 'important');
                          }}
                          className="d-block invalid-tooltip"
                        >
                          {errors.event_image}
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <div className="mb-3">
                      <Form.Label>Event Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="event_name"
                        defaultValue={selectedItem ? selectedItem.event_name : values.event_name}
                        onChange={handleChange}
                      />

                      {errors.event_name && touched.event_name && (
                        <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                          {errors.event_name}
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="mb-3">
                      <Form.Label>Event Category</Form.Label>
                      <Form.Select
                        value={values ? values.event_category : selectedItem.event_category}
                        name="event_category"
                        onChange={(e) => {
                          handleSelectedChange(e);
                          handleChange(e);
                        }}
                      >
                        <option key="0" value="">
                          Select any Category
                        </option>
                        {Object.keys(catDrop).length > 0
                          ? // let menus = '';

                          catDrop[0].map(function (itemData, ite) {
                            // console.log('childdaata', itemData);
                            return (
                              <>
                                <optgroup label={itemData.cat_name} data={itemData.id} key={`ul${ite}`}>
                                  {catDrop[itemData.id] &&
                                    Object.keys(catDrop[itemData.id]).length > 0 &&
                                    catDrop[itemData.id].map(function (Items) {
                                      // console.log(Items);
                                      return (
                                        <option value={Items.id} key={Items.id}>
                                          {Items.cat_name}
                                        </option>
                                      );
                                    })}
                                </optgroup>
                              </>
                            );
                          })
                          : ''}
                      </Form.Select>
                      {errors.event_category && touched.event_category && (
                        <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                          {errors.event_category}
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <div className="mb-3">
                      <Form.Label>Event From</Form.Label>
                      <DatePicker
                        className="form-control"
                        name="event_date_from"
                        selected={startDate}
                        minDate={new Date()}
                        shouldCloseOnSelect
                        onChange={(date) => {
                          setStartDate(date);
                          //  handleChange(date);
                          setFieldValue('event_date_from', date);
                        }}
                        showTimeSelect
                        dateFormat="dd-MM-yyyy hh:mm aa"
                      />
                      {errors.event_date_from && touched.event_date_from && (
                        <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                          {errors.event_date_from}
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="mb-3">
                      <Form.Label>Event To </Form.Label>
                      <DatePicker
                        className="form-control"
                        name="event_date_to"
                        selected={endDate}
                        minDate={startDate}
                        shouldCloseOnSelect
                        onChange={(date) => {
                          setEndDate(date);
                          //  handleChange(date);
                          setFieldValue('event_date_to', date);
                        }}
                        showTimeSelect
                        dateFormat="dd-MM-yyyy hh:mm aa"
                      />
                      {errors.event_date_to && touched.event_date_to && (
                        <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                          {errors.event_date_to}
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <div className="mb-3">
                      <Form.Label>Venue</Form.Label>
                      <Form.Control type="text" name="venue" defaultValue={selectedItem ? selectedItem.venue : values.venue} onChange={handleChange} />
                      {errors.venue && touched.venue && (
                        <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                          {errors.venue}
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="mb-3">
                      <Form.Label>Invitation</Form.Label>
                      <Form.Control
                        type="file"
                        name="invitation_attachment"
                        accept="application/pdf,application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        defaultValue={selectedItem ? selectedItem.invitation_attachment : values.invitation_attachment}
                        // onChange={handleChange}
                        onChange={(e) => {
                          handleChange(e);
                          setFieldValue('invitation_attachment_file', e.currentTarget.files[0]);
                        }}
                      />
                      {errors.invitation_attachment && touched.invitation_attachment && (
                        <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                          {errors.invitation_attachment}
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md="12">
                    <div className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type="text"
                        name="event_description"
                        as="textarea"
                        defaultValue={selectedItem ? selectedItem.event_description : ''}
                        onChange={handleChange}
                      />
                      {errors.event_description && touched.event_description && (
                        <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                          {errors.event_description}
                        </div>
                      )}
                    </div>
                  </Col>
                  {selectParentCat == '2' && (
                  <Col md="12">
                    <div className="mb-3">
                      <Form.Label>Table Booking Available</Form.Label>
                      <Row>
                        <Col md="6">
                          <Form.Check
                            type="radio"
                            label="Yes"
                            value="Y"
                            id="table_book1"
                            name="table_book_available"
                            // eslint-disable-next-line eqeqeq
                            checked={(values && values.table_book_available == 'Y') || (selectedItem && selectedItem.table_book_available == 'Y')}
                            onChange={(e) => {
                              handleChange(e);
                              changetablebook(e);
                            }}
                          />
                        </Col>
                        <Col md="6">
                          <Form.Check
                            type="radio"
                            label="No"
                            value="N"
                            id="table_book2"
                            name="table_book_available"
                            // eslint-disable-next-line eqeqeq
                            checked={(values && values.table_book_available == 'N') || (selectedItem && selectedItem.table_book_available == 'N')}
                            onChange={(e) => {
                              handleChange(e);
                              changetablebook(e);
                            }}
                          />
                        </Col>
                      </Row>
                      {errors.table_book_available && touched.table_book_available && (
                        <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                          {errors.table_book_available}
                        </div>
                      )}
                    </div>
                  </Col>)}



                  <>
                    {selectParentCat == '2' && (values.table_book_available == 'Y' || selectedItem.table_book_available == 'Y') && (

                      <Col md="12">

                        <div className="mb-3">
                          <Form.Label>Table Booking Status</Form.Label>
                          <Row>
                            <Col md="6">
                              <Form.Check
                                type="radio"
                                label="Open"
                                value="Y"
                                id="table_status1"
                                name="is_seat_book_open"
                                // eslint-disable-next-line eqeqeq
                                checked={(values && values.is_seat_book_open == 'Y') || (selectedItem && selectedItem.is_seat_book_open == 'Y')}
                                onChange={(e) => {
                                  changetablebookopen(e);
                                  handleChange(e);

                                }}
                              />
                            </Col>
                            <Col md="6">
                              <Form.Check
                                type="radio"
                                label="Close"
                                value="N"
                                id="table_status2"
                                name="is_seat_book_open"
                                // eslint-disable-next-line eqeqeq
                                checked={(values && values.is_seat_book_open == 'N') || (selectedItem && selectedItem.is_seat_book_open == 'N')}
                                onChange={(e) => {
                                  changetablebookopen(e);
                                  handleChange(e);

                                }}
                              />
                            </Col>
                          </Row>
                          {errors.is_seat_book_open && touched.is_seat_book_open && (
                            <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                              {errors.is_seat_book_open}
                            </div>
                          )}
                        </div>
                        <div className="mb-6">
                          <Form.Label>Seat Available</Form.Label>
                          <Row>
                            <Col md="3">
                              <Form.Check
                                type="checkbox"
                                name="seat_2"
                                label="2"
                                value="1"
                                checked={(selectedItem && selectedItem.seat_2 == '1')}
                                onChange={(e) => {
                                  changeseat_2(e);
                                  handleChange(e);
                                }}
                              />
                            </Col>
                            <Col md="3">
                              <Form.Check
                                type="checkbox"
                                name="seat_4"
                                label="4"
                                value="1"
                                checked={(selectedItem && selectedItem.seat_4 == '1')}
                                onChange={(e) => {
                                  changeseat_4(e);
                                  handleChange(e);
                                }}
                              /></Col>
                            <Col md="3">
                              <Form.Check
                                type="checkbox"
                                name="seat_6"
                                label="6"
                                value="1"
                                checked={(selectedItem && selectedItem.seat_6 == '1')}
                                onChange={(e) => {
                                  changeseat_6(e);
                                  handleChange(e);
                                }}
                              /></Col>
                            <Col md="3">
                              <Form.Check
                                type="checkbox"
                                name="seat_8"
                                label="8"
                                value="1"
                                checked={(selectedItem && selectedItem.seat_8 == '1')}
                                onChange={(e) => {
                                  changeseat_8(e);
                                  handleChange(e);
                                }}
                              />
                            </Col>
                          </Row>

                        </div>
                      </Col>





                    )}
                  </>
                </Row>
              </Col>


              <Col md="6">
                {selectParentCat == '2' ? (
                  <>
                    <Row>
                      <Col md="6">
                        <div className="mb-3">
                          <Form.Label>Is Member Charged ?</Form.Label>
                          <Row>
                            <Col md="6">
                              <Form.Check
                                type="radio"
                                label="Yes"
                                value="Y"
                                id="categoryRadio11"
                                name="is_member_charged"
                                checked={(values && values.is_member_charged == 'Y') || (selectedItem && selectedItem.is_member_charged == 'Y')}
                                onChange={(e) => {
                                  handleChange(e);
                                  changeMemCharge(e);
                                }}
                              />
                            </Col>
                            <Col md="6">
                              <Form.Check
                                type="radio"
                                label="No"
                                value="N"
                                id="categoryRadio12"
                                name="is_member_charged"
                                checked={(values && values.is_member_charged == 'N') || (selectedItem && selectedItem.is_member_charged == 'N')}
                                onChange={(e) => {
                                  handleChange(e);
                                  changeMemCharge(e);
                                }}
                              />
                            </Col>
                          </Row>
                          {errors.is_member_charged && touched.is_member_charged && (
                            <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                              {errors.is_member_charged}
                            </div>
                          )}
                        </div>
                      </Col>
                      {(values.is_member_charged == 'Y' || selectedItem.is_member_charged == 'Y') && (
                        <>
                          <Col>
                            <div className="mb-3">
                              <Form.Label>Price for Member</Form.Label>
                              <Form.Control
                                type="text"
                                name="price_for_member"
                                defaultValue={selectedItem ? selectedItem.price_for_member : values.price_for_member}
                                onChange={handleChange}
                              />

                              {errors.price_for_member && touched.price_for_member && (
                                <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                  {errors.price_for_member}
                                </div>
                              )}
                            </div>
                          </Col>
                        </>
                      )}
                    </Row>

                    <Row>
                      <Col md="6">
                        <div className="mb-3">
                          <Form.Label>Is Dependent Allowed?</Form.Label>
                          <Row>
                            <Col md="6">
                              <Form.Check
                                type="radio"
                                label="Yes"
                                value="Y"
                                id="categoryRadio9"
                                name="is_dependent_allowed"
                                checked={(values && values.is_dependent_allowed == 'Y') || (selectedItem && selectedItem.is_dependent_allowed == 'Y')}
                                onChange={(e) => {
                                  handleChange(e);
                                  changeDepent(e);
                                }}
                              />
                            </Col>
                            <Col md="6">
                              <Form.Check
                                type="radio"
                                label="No"
                                value="N"
                                id="categoryRadio10"
                                name="is_dependent_allowed"
                                checked={(values && values.is_dependent_allowed == 'N') || (selectedItem && selectedItem.is_dependent_allowed == 'N')}
                                onChange={(e) => {
                                  handleChange(e);
                                  changeDepent(e);
                                }}
                              />
                            </Col>
                          </Row>
                          {errors.is_dependent_allowed && touched.is_dependent_allowed && (
                            <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                              {errors.is_dependent_allowed}
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>
                    {(values.is_dependent_allowed == 'Y' || selectedItem.is_dependent_allowed == 'Y') && (
                      <>
                        <Row>
                          <Col md="6">
                            <div className="mb-3">
                              <Form.Label>Is Dependent Charged?</Form.Label>
                              <Row>
                                <Col md="6">
                                  <Form.Check
                                    type="radio"
                                    label="Yes"
                                    value="Y"
                                    id="categoryRadio9"
                                    name="is_dependent_charged"
                                    checked={(values && values.is_dependent_charged == 'Y') || (selectedItem && selectedItem.is_dependent_charged == 'Y')}
                                    onChange={(e) => {
                                      handleChange(e);
                                      changeDepentCharge(e);
                                    }}
                                  />
                                </Col>
                                <Col md="6">
                                  <Form.Check
                                    type="radio"
                                    label="No"
                                    value="N"
                                    id="categoryRadio10"
                                    name="is_dependent_charged"
                                    checked={(values && values.is_dependent_charged == 'N') || (selectedItem && selectedItem.is_dependent_charged == 'N')}
                                    onChange={(e) => {
                                      handleChange(e);
                                      changeDepentCharge(e);
                                    }}
                                  />
                                </Col>
                              </Row>
                              {errors.is_dependent_charged && touched.is_dependent_charged && (
                                <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                  {errors.is_dependent_charged}
                                </div>
                              )}
                            </div>
                          </Col>
                          {(values.is_dependent_charged == 'Y' || selectedItem.is_dependent_charged == 'Y') && (
                            <>
                              <Col>
                                <div className="mb-3">
                                  <Form.Label>Price for Dependents</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="price_for_dependent"
                                    defaultValue={selectedItem ? selectedItem.price_for_dependent : values.price_for_dependent}
                                    onChange={handleChange}
                                  />

                                  {errors.price_for_dependent && touched.price_for_dependent && (
                                    <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                      {errors.price_for_dependent}
                                    </div>
                                  )}
                                </div>
                              </Col>
                            </>
                          )}
                        </Row>
                      </>
                    )}
                    <Row>
                      <Col md="6">
                        <div className="mb-3">
                          <Form.Label>Is Buffet Served ?</Form.Label>
                          <Row>
                            <Col md="6">
                              <Form.Check
                                type="radio"
                                label="Yes"
                                value="Y"
                                id="categoryRadio13"
                                name="food_served"
                                checked={(values && values.food_served == 'Y') || (selectedItem && selectedItem.food_served == 'Y')}
                                onChange={(e) => {
                                  handleChange(e);
                                  changeFoodServed(e);
                                }}
                              />
                            </Col>
                            <Col md="6">
                              <Form.Check
                                type="radio"
                                label="No"
                                value="N"
                                id="categoryRadio14"
                                name="food_served"
                                checked={(values && values.food_served == 'N') || (selectedItem && selectedItem.food_served == 'N')}
                                onChange={(e) => {
                                  handleChange(e);
                                  changeFoodServed(e);
                                }}
                              />
                            </Col>
                          </Row>
                          {errors.food_served && touched.food_served && (
                            <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                              {errors.food_served}
                            </div>
                          )}
                        </div>
                      </Col>
                      {(selectedItem.food_served == 'Y' || values.food_served == 'B') && (
                        <>
                          <Row>
                            <Col md="4">
                              <div className="mb-3">
                                <Form.Label>Total Buffet</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="buffet_total"
                                  defaultValue={selectedItem ? selectedItem.buffet_total : values.buffet_total}
                                  onChange={handleChange}
                                />

                                {errors.buffet_total && touched.buffet_total && (
                                  <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                    {errors.buffet_total}
                                  </div>
                                )}
                              </div>
                            </Col>
                            <Col md="4">
                              <div className="mb-3">
                                <Form.Label>Veg Price</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="buffet_vprice"
                                  defaultValue={selectedItem ? selectedItem.buffet_vprice : values.buffet_vprice}
                                  onChange={handleChange}
                                />

                                {errors.buffet_vprice && touched.buffet_vprice && (
                                  <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                    {errors.buffet_vprice}
                                  </div>
                                )}
                              </div>
                            </Col>
                            <Col md="4">
                              <div className="mb-3">
                                <Form.Label>Non-veg Price</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="buffet_nvprice"
                                  defaultValue={selectedItem ? selectedItem.buffet_nvprice : values.buffet_nvprice}
                                  onChange={handleChange}
                                />

                                {errors.buffet_nvprice && touched.buffet_nvprice && (
                                  <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                    {errors.buffet_nvprice}
                                  </div>
                                )}
                              </div>
                            </Col>
                          </Row>
                        </>
                      )}
                    </Row>

                    <Row>
                      <Col md="6">
                        <div className="mb-3">
                          <Form.Label>Is Guest Allowed?</Form.Label>
                          <Row>
                            <Col md="6">
                              <Form.Check
                                type="radio"
                                label="Yes"
                                value="Y"
                                id="categoryRadio3"
                                name="is_guest_allowed"
                                checked={(values && values.is_guest_allowed == 'Y') || (selectedItem && selectedItem.is_guest_allowed == 'Y')}
                                onChange={(e) => {
                                  handleChange(e);
                                  changeVaries(e);
                                }}
                              />
                            </Col>
                            <Col md="6">
                              <Form.Check
                                type="radio"
                                label="No"
                                value="N"
                                id="categoryRadio4"
                                name="is_guest_allowed"
                                checked={(values && values.is_guest_allowed == 'N') || (selectedItem && selectedItem.is_guest_allowed == 'N')}
                                onChange={(e) => {
                                  handleChange(e);
                                  changeVaries(e);
                                }}
                              />
                            </Col>
                          </Row>
                          {errors.is_guest_allowed && touched.is_guest_allowed && (
                            <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                              {errors.is_guest_allowed}
                            </div>
                          )}
                        </div>
                      </Col>

                      <Col md="12">
                        <div className="mb-3">
                          <Form.Label>Status</Form.Label>
                          <Row>
                            <Col md="4">
                            <Form.Check
                                type="radio"
                                label="Launch"
                                value="0"
                                id="eventStatus0"
                                name="event_status"
                                // eslint-disable-next-line eqeqeq
                                checked={(values && values.event_status == 0) || (selectedItem && selectedItem.event_status == 0)}
                                onChange={(e) => {
                                  handleChange(e);
                                  changeActive(e);
                                }}
                              />
                              </Col>
                              <Col md="4">
                              <Form.Check
                                type="radio"
                                label="Open"
                                value="1"
                                id="eventStatus1"
                                name="event_status"
                                // eslint-disable-next-line eqeqeq
                                checked={(values && values.event_status == 1) || (selectedItem && selectedItem.event_status == 1)}
                                onChange={(e) => {
                                  handleChange(e);
                                  changeActive(e);
                                }}
                              />
                            </Col>
                            <Col md="4">
                              <Form.Check
                                type="radio"
                                label="Close"
                                value="2"
                                id="eventStatus2"
                                name="event_status"
                                // eslint-disable-next-line eqeqeq
                                checked={(values && values.event_status == 2) || (selectedItem && selectedItem.event_status == 2)}
                                onChange={(e) => {
                                  handleChange(e);
                                  changeActive(e);
                                }}
                              />
                            </Col>
                          </Row>
                          {errors.event_status && touched.event_status && (
                            <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                              {errors.event_status}
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>

                    <>
                      {selectedItem.is_guest_allowed == 'Y' && (
                        <Row>
                          <Col md="6">
                            <div className="mb-3">
                              <Form.Label>Total Tickets</Form.Label>
                              <Form.Control
                                type="text"
                                name="total_guest_tickets"
                                defaultValue={selectedItem ? selectedItem.total_guest_tickets : values.total_guest_tickets}
                                onChange={handleChange}
                              />

                              {errors.total_guest_tickets && touched.total_guest_tickets && (
                                <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                  {errors.total_guest_tickets}
                                </div>
                              )}
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="mb-3">
                              <Form.Label>Ticket Price / Guest</Form.Label>
                              <Form.Control
                                type="text"
                                name="ticket_price_per_guest"
                                defaultValue={selectedItem ? selectedItem.ticket_price_per_guest : values.ticket_price_per_guest}
                                onChange={handleChange}
                              />

                              {errors.ticket_price_per_guest && touched.ticket_price_per_guest && (
                                <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                  {errors.ticket_price_per_guest}
                                </div>
                              )}
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="mb-3">
                              <Form.Label>Ticket / Member</Form.Label>
                              <Form.Control
                                type="text"
                                name="ticket_per_member"
                                defaultValue={selectedItem ? selectedItem.ticket_per_member : values.ticket_per_member}
                                onChange={handleChange}
                              />

                              {errors.ticket_per_member && touched.ticket_per_member && (
                                <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                  {errors.ticket_per_member}
                                </div>
                              )}
                            </div>
                          </Col>
                        </Row>
                      )}
                    </>
                    <>
                      {(values.event_status == '2' || selectedItem.event_status == '2') && (
                        <Row>
                          <Col md="6">
                            <div className="mb-3">
                              <Form.Label>Gallery Image1</Form.Label>
                              <Form.Control
                                type="file"
                                name="image1"
                                accept="image/*"
                                onChange={(e) => {
                                  handleChange(e);
                                  setFieldValue('image1_file', e.currentTarget.files[0]);
                                }}
                              />

                              {errors.image1 && touched.image1 && (
                                <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                  {errors.image1}
                                </div>
                              )}
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="mb-3">
                              <Form.Label>Gallery Image2</Form.Label>
                              <Form.Control
                                type="file"
                                name="image2"
                                accept="image/*"
                                onChange={(e) => {
                                  handleChange(e);
                                  setFieldValue('image2_file', e.currentTarget.files[0]);
                                }}
                              />

                              {errors.image2 && touched.image2 && (
                                <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                  {errors.image2}
                                </div>
                              )}
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="mb-3">
                              <Form.Label>Gallery Image3</Form.Label>
                              <Form.Control
                                type="file"
                                name="image3"
                                accept="image/*"
                                onChange={(e) => {
                                  handleChange(e);
                                  setFieldValue('image3_file', e.currentTarget.files[0]);
                                }}
                              />

                              {errors.image3 && touched.image3 && (
                                <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                  {errors.image3}
                                </div>
                              )}
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="mb-3">
                              <Form.Label>Gallery Image4</Form.Label>
                              <Form.Control
                                type="file"
                                name="image4"
                                accept="image/*"
                                onChange={(e) => {
                                  handleChange(e);
                                  setFieldValue('image4_file', e.currentTarget.files[0]);
                                }}
                              />

                              {errors.image4 && touched.image4 && (
                                <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                  {errors.image4}
                                </div>
                              )}
                            </div>
                          </Col>

                          <Col md="6">
                            <div className="mb-3">
                              <Form.Label>Gallery Image5</Form.Label>
                              <Form.Control
                                type="file"
                                name="image5"
                                accept="image/*"
                                onChange={(e) => {
                                  handleChange(e);
                                  setFieldValue('image5_file', e.currentTarget.files[0]);
                                }}
                              />

                              {errors.image5 && touched.image5 && (
                                <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                  {errors.image5}
                                </div>
                              )}
                            </div>
                          </Col>


                          <Col md="6">
                            <div className="mb-3">
                              <Form.Label>Gallery Image6</Form.Label>
                              <Form.Control
                                type="file"
                                name="image6"
                                accept="image/*"
                                onChange={(e) => {
                                  handleChange(e);
                                  setFieldValue('image6_file', e.currentTarget.files[0]);
                                }}
                              />

                              {errors.image6 && touched.image6 && (
                                <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                  {errors.image6}
                                </div>
                              )}
                            </div>
                          </Col>


                          <Col md="12">
                            <div className="mb-3">
                              <Form.Label>Gallery Video path</Form.Label>
                              <Form.Control
                                type="text"
                                name="gvideopath"
                                defaultValue={selectedItem ? selectedItem.gvideopath : values.gvideopath}
                                onChange={handleChange}
                              />

                              {errors.gvideopath && touched.gvideopath && (
                                <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                  {errors.gvideopath}
                                </div>
                              )}
                            </div>
                          </Col>

                          <Col md="12">
                            <div className="mb-3">
                              <Form.Label>Highlight Description</Form.Label>
                              <Form.Control
                                type="text"
                                as="textarea"
                                name="highdesc"
                                defaultValue={selectedItem ? selectedItem.highdesc : values.highdesc}
                                onChange={handleChange}
                              />

                              {errors.highdesc && touched.highdesc && (
                                <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                  {errors.highdesc}
                                </div>
                              )}
                            </div>
                          </Col>
                        </Row>
                      )}
                    </>
                  </>
                ) : (
                  <>
                    <div>
                      <Row>
                        <Col md="12">
                          <div className="mb-3">
                            <Form.Label>Tournament Type ?</Form.Label>
                            <Row>
                              <Col md="4">
                                <Form.Check
                                  type="radio"
                                  label="Singles"
                                  value="S"
                                  id="categoryRadio11"
                                  name="tournament_type"
                                  checked={(values && values.tournament_type == 'S') || (selectedItem && selectedItem.tournament_type == 'S')}
                                  onChange={(e) => {
                                    handleChange(e);
                                    changeTournament(e);
                                  }}
                                />
                              </Col>
                              <Col md="4">
                                <Form.Check
                                  type="radio"
                                  label="Doubles"
                                  value="D"
                                  id="categoryRadio12"
                                  name="tournament_type"
                                  checked={(values && values.tournament_type == 'D') || (selectedItem && selectedItem.tournament_type == 'D')}
                                  onChange={(e) => {
                                    handleChange(e);
                                    changeTournament(e);
                                  }}
                                />
                              </Col>
                              <Col md="4">
                                <Form.Check
                                  type="radio"
                                  label="Tournament"
                                  value="T"
                                  id="categoryRadio12"
                                  name="tournament_type"
                                  checked={(values && values.tournament_type == 'T') || (selectedItem && selectedItem.tournament_type == 'T')}
                                  onChange={(e) => {
                                    handleChange(e);
                                    changeTournament(e);
                                  }}
                                />
                              </Col>
                            </Row>
                            {errors.tournament_type && touched.tournament_type && (
                              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                {errors.tournament_type}
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col md="12">
                          <div className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Row>
                            <Col md="4">
                            <Form.Check
                                type="radio"
                                label="Launch"
                                value="0"
                                id="eventStatus0"
                                name="event_status"
                                // eslint-disable-next-line eqeqeq
                                checked={(values && values.event_status == 0) || (selectedItem && selectedItem.event_status == 0)}
                                onChange={(e) => {
                                  handleChange(e);
                                  changeActive(e);
                                }}
                              />
                              </Col>
                              <Col md="4">
                                <Form.Check
                                  type="radio"
                                  label="Open"
                                  value="1"
                                  id="eventStatus1"
                                  name="event_status"
                                  // eslint-disable-next-line eqeqeq
                                  checked={(values && values.event_status == 1) || (selectedItem && selectedItem.event_status == 1)}
                                  onChange={(e) => {
                                    handleChange(e);
                                    changeActive(e);
                                  }}
                                />
                              </Col>
                              <Col md="4">
                                <Form.Check
                                  type="radio"
                                  label="Close"
                                  value="2"
                                  id="eventStatus2"
                                  name="event_status"
                                  // eslint-disable-next-line eqeqeq
                                  checked={(values && values.event_status == 2) || (selectedItem && selectedItem.event_status == 2)}
                                  onChange={(e) => {
                                    handleChange(e);
                                    changeActive(e);
                                  }}
                                />
                              </Col>
                            </Row>
                            {errors.event_status && touched.event_status && (
                              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                {errors.event_status}
                              </div>
                            )}
                          </div>
                        </Col>
                      </Row>
                      <>
                        {(values.event_status == '2' || selectedItem.event_status == '2') && (
                          <Row>
                            <Col md="6">
                              <div className="mb-3">
                                <Form.Label>Gallery Image1</Form.Label>
                                <Form.Control
                                  type="file"
                                  name="image1"
                                  accept="image/*"
                                  onChange={(e) => {
                                    handleChange(e);
                                    setFieldValue('image1_file', e.currentTarget.files[0]);
                                  }}
                                />

                                {errors.image1 && touched.image1 && (
                                  <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                    {errors.image1}
                                  </div>
                                )}
                              </div>
                            </Col>
                            <Col md="6">
                              <div className="mb-3">
                                <Form.Label>Gallery Image2</Form.Label>
                                <Form.Control
                                  type="file"
                                  name="image2"
                                  accept="image/*"
                                  onChange={(e) => {
                                    handleChange(e);
                                    setFieldValue('image2_file', e.currentTarget.files[0]);
                                  }}
                                />

                                {errors.image2 && touched.image2 && (
                                  <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                    {errors.image2}
                                  </div>
                                )}
                              </div>
                            </Col>
                            <Col md="6">
                              <div className="mb-3">
                                <Form.Label>Gallery Image3</Form.Label>
                                <Form.Control
                                  type="file"
                                  name="image3"
                                  accept="image/*"
                                  onChange={(e) => {
                                    handleChange(e);
                                    setFieldValue('image3_file', e.currentTarget.files[0]);
                                  }}
                                />

                                {errors.image3 && touched.image3 && (
                                  <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                    {errors.image3}
                                  </div>
                                )}
                              </div>
                            </Col>
                            <Col md="6">
                              <div className="mb-3">
                                <Form.Label>Gallery Image4</Form.Label>
                                <Form.Control
                                  type="file"
                                  name="image4"
                                  accept="image/*"
                                  onChange={(e) => {
                                    handleChange(e);
                                    setFieldValue('image4_file', e.currentTarget.files[0]);
                                  }}
                                />

                                {errors.image4 && touched.image4 && (
                                  <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                    {errors.image4}
                                  </div>
                                )}
                              </div>
                            </Col>
                            <Col md="6">
                              <div className="mb-3">
                                <Form.Label>Gallery Image5</Form.Label>
                                <Form.Control
                                  type="file"
                                  name="image5"
                                  accept="image/*"
                                  onChange={(e) => {
                                    handleChange(e);
                                    setFieldValue('image5_file', e.currentTarget.files[0]);
                                  }}
                                />

                                {errors.image5 && touched.image5 && (
                                  <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                    {errors.image5}
                                  </div>
                                )}
                              </div>
                            </Col>


                            <Col md="6">
                              <div className="mb-3">
                                <Form.Label>Gallery Image6</Form.Label>
                                <Form.Control
                                  type="file"
                                  name="image6"
                                  accept="image/*"
                                  onChange={(e) => {
                                    handleChange(e);
                                    setFieldValue('image6_file', e.currentTarget.files[0]);
                                  }}
                                />

                                {errors.image6 && touched.image6 && (
                                  <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                    {errors.image6}
                                  </div>
                                )}
                              </div>
                            </Col>
                            <Col md="12">
                              <div className="mb-3">
                                <Form.Label>Gallery Video path</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="gvideopath"
                                  defaultValue={selectedItem ? selectedItem.gvideopath : values.gvideopath}
                                  onChange={handleChange}
                                />

                                {errors.gvideopath && touched.gvideopath && (
                                  <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                    {errors.gvideopath}
                                  </div>
                                )}
                              </div>
                            </Col>
                            <Col md="12">
                              <div className="mb-3">
                                <Form.Label>Highlight Description</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="highdesc"
                                  defaultValue={selectedItem ? selectedItem.highdesc : values.highdesc}
                                  onChange={handleChange}
                                />

                                {errors.highdesc && touched.highdesc && (
                                  <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                                    {errors.highdesc}
                                  </div>
                                )}
                              </div>
                            </Col>
                          </Row>



                        )}
                      </>
                    </div>
                  </>
                )}
              </Col>
            </Row>
            <Row>
              <div className="mb-3">
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    formik.resetForm({ values: '' });
                    setIsOpenAddEditModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {selectedFlatRows.length === 1 ? 'Done' : 'Add'}
                </Button>
              </div>
            </Row>
          </Container>
        </Form>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
};

export default EventAddEdit;
