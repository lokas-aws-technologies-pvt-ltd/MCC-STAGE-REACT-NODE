/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Container, Row, Col, Form } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import * as Yup from 'yup';

const BookSeat = ({ eventItems, bookEvent, catData, selectedEvent, isOpenBookSeatModal, setIsOpenBookSeatModal }) => {
  const el = eventItems.findIndex((obj) => obj.id === selectedEvent);
  const [parentCat, setParentCat] = useState('0');
  useEffect(() => {
    if (Object.entries(eventItems).length) {
      if (el >= 0) {
        const evntcat = eventItems[el].event_category;
        // if (catData.length) {
        // eslint-disable-next-line no-unused-expressions
        const catId = catData.find((obj) => {
          return obj.id === evntcat;
        });
        setParentCat(catId.parent_id);
        // console.log('catId', catId);
      }
    }
  }, [el, eventItems]);
  //
  const currentEvent = eventItems[el];
  // console.log('currentEvent', currentEvent);
  const { isLogin, currentUser } = useSelector((state) => state.auth);

  const emptyItem = {
    event_id: currentEvent ? currentEvent.id : '',
    member_code: currentUser ? currentUser.membercode : '',
    created_by: currentUser ? currentUser.createdby : '',
    event_name: currentEvent ? currentEvent.event_name : '',
    who_is_coming: 'me',
    isMemberCharged: currentEvent ? currentEvent.is_member_charged : 'N',
    member_name: currentUser ? currentUser.name : '',
    tournament_type: currentEvent && currentEvent.tournament_type == 'Y' ? currentEvent.tournament_type : 'T',
    member_cost: currentEvent && currentEvent.is_member_charged == 'Y' ? currentEvent.price_for_member : '0',
    total_cost: currentEvent && currentEvent.is_member_charged == 'Y' ? currentEvent.price_for_member : '0',
    guest_cost: '0',
    member_age: '',
    spouse_name: '',
    spouse_age: '',
    member_pair_name: '',
    member_pair_age: '',
    member_pair_code: '',
    is_guest_coming: 'N',
    are_you_coming: 'N',
    guestPerMember: '',
    is_dependent_coming: 'N',
    parent_cat_id: '2',
    buffetWanted: 'N',
    veg_buffet: '0',
    nonVeg_buffet: '0',
    dependent_cost: '0',
    buffet_total: '0',
    is_dependent_attending: 'N',
    dependentMembers: [{ dependent_relation: '', dependent_name: '', dependent_code: '', dependent_age: '' }],
    guests: [{ guest_name: '', guest_age: '', guest_phone: '', guest_email: '' }],
    sportsDependentMembers: [
      {
        dependent_relation: '',
        dependent_name: '',
        dependent_code: '',
        dependent_age: '',
        dependent_pair_name: '',
        dependent_pair_code: '',
        dependent_pair_age: '',
      },
    ],
    comments:'',
  };

  const [selectedItem, setSelectedItem] = useState(emptyItem);
  const [isGuestComing, setIsGuestComing] = useState('N');
  const [wantBuffet, setWantBuffet] = useState('N');
  const [whoisComing, setWhoisComing] = useState('me');
  const [dependentIsComing, setDependentIsComing] = useState('N');
  const [dependentIsAttending, setDependentIsAttending] = useState('N');
  const [areYouComing, setAreYouComing] = useState('N');
  const [guestPerMember, setGuestPerMember] = useState(0);
  const [dependentDetails, setDependentDetails] = useState([]);

  const validationSchema = Yup.object().shape({
    who_is_coming: Yup.string().required('Please let us know who is coming'),
    are_you_coming: Yup.string().required('Please let us know Are is coming'),
    member_age: Yup.number().when(['are_you_coming', 'parent_cat_id'], {
      // is: (are_you_coming, who_is_coming, parent_cat_id) =>
      // (parent_cat_id == '2' && (who_is_coming === 'me' || who_is_coming === 'b')) || (parent_cat_id == '1' && are_you_coming === 'Y'),
      is: (are_you_coming, parent_cat_id) => parent_cat_id == '1' && are_you_coming === 'Y',
      then: Yup.number().positive().max(100, 'maximum 100').required('Member Age is Required'),
    }),

    spouse_name: Yup.string().when('who_is_coming', {
      is: (value) => value === 'ws' || value === 'b',
      then: Yup.string().required('Spouse Name is Required'),
    }),
    // spouse_age: Yup.number().when('who_is_coming', {
    //   is: (value) => value === 'ws' || value === 'b',
    //   then: Yup.number().positive().max(100, 'maximum 100').required('Spouse Age is Required'),
    // }),
    is_guest_coming: Yup.string().required('Is guest is allowed is required'),
    dependentMembers: Yup.array().when('is_dependent_coming', {
      is: 'Y',
      then: Yup.array()
        .min(1)
        .of(
          Yup.object().shape({
            dependent_relation: Yup.string().required('Relationship is required'),
            dependent_name: Yup.string().required('Name is required'),
            dependent_code: Yup.string().required('Code is required'),
            dependent_age: Yup.number().positive().max(100, 'maximum 100').required('Age is required'),
          })
        ),
    }),

    guests: Yup.array().when('is_guest_coming', {
      is: 'Y',
      then: Yup.array().of(
        Yup.object().shape({
          guest_name: Yup.string().required('Name is required'),
          guest_email: Yup.string().email('Invalid email format'),
          guest_phone: Yup.string()
            .matches(/^[0-9]+$/, 'Must be only digits')
            .min(10, 'Minimum 10 digits')
            .max(13, 'Maximum 13 digits')
            .required('Phone No is required'),
          guest_age: Yup.number().positive().max(100, 'maximum 100').required('Age is required'),
        })
      ),
    }),
    veg_buffet: Yup.number().when('buffetWanted', { is: 'Y', then: Yup.number().positive() }),
    nonVeg_buffet: Yup.number().when('buffetWanted', { is: 'Y', then: Yup.number().positive() }),

    member_pair_name: Yup.string().when(['tournament_type', 'are_you_coming'], {
      is: (tournament_type, are_you_coming) => tournament_type == 'D' && are_you_coming == 'Y',
      then: Yup.string().required('Pair Member Name is required'),
    }),
    member_pair_age: Yup.number().when(['tournament_type', 'are_you_coming'], {
      is: (tournament_type, are_you_coming) => tournament_type == 'D' && are_you_coming == 'Y',
      then: Yup.number().positive().max(100, 'maximum 100').required('Pair Member Age is Required'),
    }),
    member_pair_code: Yup.string().when(['tournament_type', 'are_you_coming'], {
      is: (tournament_type, are_you_coming) => tournament_type == 'D' && are_you_coming == 'Y',
      then: Yup.string().required('Pair Member Code is required'),
    }),
    sportsDependentMembers: Yup.array()
      .when(['tournament_type', 'is_dependent_attending'], {
        is: (tournament_type, is_dependent_attending) => tournament_type == 'D' && is_dependent_attending == 'Y',
        then: Yup.array().of(
          Yup.object().shape({
            dependent_pair_name: Yup.string().required('Name is required'),

            dependent_pair_code: Yup.string().required('Code is required'),

            dependent_pair_age: Yup.number().positive().max(100, 'maximum 100').required('Age is required'),
          })
        ),
      })
      .when('is_dependent_attending', {
        is: 'Y',
        then: Yup.array().of(
          Yup.object().shape({
            dependent_relation: Yup.string().required('Relationship is required'),
            dependent_name: Yup.string().required('Name is required'),
            dependent_code: Yup.string().required('Code is required'),
            dependent_age: Yup.number().positive().max(100, 'maximum 100').required('Age is required'),
          })
        ),
      }),
  });

  const onSubmit = (values, { resetForm }) => {
    if (values.member_code == '') {
      values.member_code = currentUser.membercode;
    }
    values.parentCat = parentCat;
    if (currentEvent.tournament_type == 'D') {
      values.tournament_type = currentEvent.tournament_type;
    }
    // console.log('submit form', values);
    bookEvent({ evnitem: values });
    resetForm({ values: '' });
    setIsOpenBookSeatModal(false);
  };

  // console.log(selectedItem);
  const initialValues = selectedItem;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const { handleSubmit, handleChange, setFieldValue, values, touched, errors } = formik;
  useEffect(() => {
    if (currentEvent) {
      // console.log('currentEvent', currentEvent);
      setFieldValue('event_id', currentEvent.id, false);
      setFieldValue('member_code', currentUser.membercode, false);
      setFieldValue('member_name', currentUser.name, false);
      setFieldValue('created_by',currentUser.createdby, false);
      setFieldValue('event_name', currentEvent.event_name, false);
      setFieldValue('guestPerMember', currentEvent.ticket_per_member, false);
      setFieldValue('tournament_type', currentEvent.tournament_type, false);
      setFieldValue('isMemberCharged', currentEvent.is_member_charged);
      setFieldValue('member_cost', currentEvent.is_member_charged == 'Y' ? currentEvent.price_for_member : '0');
      setGuestPerMember(currentEvent.ticket_per_member);
      setFieldValue('parent_cat_id', parentCat);
    }
  }, [currentEvent, currentUser, parentCat, setFieldValue]);

  const changeVarient = (ev) => {
    if (ev.target.checked) {
      setSelectedItem({ ...selectedItem, is_guest_coming: ev.target.value });
      setIsGuestComing(ev.target.value);
    }
  };
  const changeWhoIsComing = (ev) => {
    if (ev.target.checked) {
      setSelectedItem({ ...selectedItem, who_is_coming: ev.target.value });
      setWhoisComing(ev.target.value);
      if (ev.target.value == 'me') {
        setFieldValue('member_cost', currentEvent.is_member_charged == 'Y' ? currentEvent.price_for_member : '0');
      } else if (ev.target.value == 'ws') {
        setFieldValue('member_cost', currentEvent.is_member_charged == 'Y' ? currentEvent.price_for_member : '0');
      } else if (ev.target.value == 'b') {
        setFieldValue(
          'member_cost',
          currentEvent.is_member_charged == 'Y' ? parseInt(currentEvent.price_for_member, 10) + parseInt(currentEvent.price_for_member, 10) : '0'
        );
      }
    }
  };
  const changeDependentComing = (ev) => {
    if (ev.target.checked) {
      setSelectedItem({ ...selectedItem, is_dependent_coming: ev.target.value });
      setDependentIsComing(ev.target.value);
    }
  };
  const changeWantedBuffet = (ev) => {
    if (ev.target.checked) {
      setSelectedItem({ ...selectedItem, buffetWanted: ev.target.value });
      setWantBuffet(ev.target.value);
    }
  };
  const changeAreYouComing = (ev) => {
    if (ev.target.checked) {
      setSelectedItem({ ...selectedItem, are_you_coming: ev.target.value });
      setAreYouComing(ev.target.value);
    }
  };
  const changeDependentAttending = (ev) => {
    if (ev.target.checked) {
      setSelectedItem({ ...selectedItem, is_dependent_attending: ev.target.value });
      setDependentIsAttending(ev.target.value);
    }
  };
  useEffect(() => {
    

    if (parentCat == '1') {
       if (values.is_dependent_attending == 'N') {
        if(values.sportsDependentMembers.length>1)
        values.sportsDependentMembers=emptyItem.sportsDependentMembers;

      }
    }

    if (parentCat == '2') {
      if (values.is_guest_coming == 'Y' && Object.entries(values.guests).length > 0) {
        setFieldValue('guest_cost', parseInt(values.guests.length, 10) * parseInt(currentEvent.ticket_price_per_guest, 10));
      } else if (values.is_guest_coming == 'N') {
        setFieldValue('guest_cost', '0');
        if(values.guests.length>1)
       values.guests=emptyItem.guests;

      }
    }
    if (values.is_dependent_coming == 'Y' && Object.entries(values.dependentMembers).length > 0) {
      setFieldValue('dependent_cost', parseInt(values.dependentMembers.length, 10) * parseInt(currentEvent.price_for_dependent, 10));
    } else if (values.is_dependent_coming == 'N') {
      setFieldValue('dependent_cost', '0');
      if(values.dependentMembers.length>1)
       values.dependentMembers=emptyItem.dependentMembers;
    }
    if (values.buffetWanted == 'Y') {
      const vegFoodTotal = parseInt(values.veg_buffet, 10) > 0 ? parseInt(values.veg_buffet, 10) * parseInt(currentEvent.buffet_vprice, 10) : 0;
      const nonVegFoodTotal = parseInt(values.nonVeg_buffet, 10) > 0 ? parseInt(values.nonVeg_buffet, 10) * parseInt(currentEvent.buffet_nvprice, 10) : 0;
      setFieldValue('buffet_total', parseInt(vegFoodTotal, 10) + parseInt(nonVegFoodTotal, 10));
    } else if (values.buffetWanted == 'N') {
      setFieldValue('buffet_total', '0');
    }
  }, [
    parentCat,
    currentEvent,
    setFieldValue,
    values.is_dependent_coming,
    values.dependentMembers,
    values.buffetWanted,
    values.is_guest_coming,
    values.guests,
    values.veg_buffet,
    values.nonVeg_buffet,values.is_dependent_attending
  ]);

  // console.log('errors', errors);
  // console.log('values', values);
  return (
    <Modal className="modal-centered" size="xl" backdrop="static" keyboard={false} show={isOpenBookSeatModal} onHide={() => setIsOpenBookSeatModal(false)}>
      <Modal.Header>
        <Modal.Title>Reservation for {currentEvent ? currentEvent.event_name : ''}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {parentCat == 2 && (
            <Container fluid>
              {currentEvent && (
                <Row>
                  <Col md="12">
                    <Form.Label>Who is Attending?</Form.Label>
                  </Col>
                  <Col md="6">
                    <Row>
                      <Col md="4">
                        <Form.Check
                          type="radio"
                          label="Myself"
                          value="me"
                          id="categoryRadio3"
                          name="who_is_coming"
                          checked={values && values.who_is_coming == 'me'}
                          onChange={(e) => {
                            handleChange(e);
                            changeWhoIsComing(e);
                          }}
                        />
                      </Col>
                      <Col md="4">
                        <Form.Check
                          type="radio"
                          label="My Spouse"
                          value="ws"
                          id="categoryRadio4"
                          name="who_is_coming"
                          checked={values && values.who_is_coming == 'ws'}
                          onChange={(e) => {
                            handleChange(e);
                            changeWhoIsComing(e);
                          }}
                        />
                      </Col>
                      <Col md="4">
                        <Form.Check
                          type="radio"
                          label="Both"
                          value="b"
                          id="categoryRadio5"
                          name="who_is_coming"
                          checked={values && values.who_is_coming == 'b'}
                          onChange={(e) => {
                            handleChange(e);
                            changeWhoIsComing(e);
                          }}
                        />
                      </Col>
                    </Row>
                    {errors.who_is_coming && touched.who_is_coming && (
                      <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                        {errors.who_is_coming}
                      </div>
                    )}
                    {whoisComing == 'me' || whoisComing == 'b' ? (
                      <>
                        <br/>
                        <Row>
                        
                          <Col md="4">
                            <Form.Label>Member Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="member_name"
                              defaultValue={selectedItem ? selectedItem.member_name : values.member_name}
                              onChange={handleChange}
                              readOnly
                            />
                          </Col>
                          <Col md="4">
                            <Form.Label>Member Code</Form.Label>
                            <Form.Control
                              type="text"
                              name="member_code"
                              readOnly
                              defaultValue={selectedItem ? selectedItem.member_code : values.member_code}
                              onChange={handleChange}
                            />
                          </Col>
                          {/* <Col md="4">
                            <Form.Label>Member Age</Form.Label>
                            <Form.Control
                              type="text"
                              name="member_age"
                              defaultValue={selectedItem ? selectedItem.member_age : values.member_age}
                              onChange={handleChange}
                            />
                            {errors.member_age && touched.member_age && (
                              <div style={{ position: 'initial', transform: 'translateZ(10px)' }} className="d-block invalid-tooltip">
                                {errors.member_age}
                              </div>
                            )}
                          </Col> */}
                        </Row>
                      </>
                    ) : (
                      <></>
                    )}
                    {whoisComing == 'ws' || whoisComing == 'b' ? (
                      <>
                       <br/>
                        <Row>
                          <Col md="4">
                            <Form.Label>Spouse Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="spouse_name"
                              defaultValue={selectedItem ? selectedItem.spouse_name : values.spouse_name}
                              onChange={handleChange}
                            />
                            {errors.spouse_name && touched.spouse_name && (
                              <div style={{ position: 'initial', transform: 'translateZ(10px)' }} className="d-block invalid-tooltip">
                                {errors.spouse_name}
                              </div>
                            )}
                          </Col>
                          <Col md="4">
                            <Form.Label>Member Code</Form.Label>
                            <Form.Control
                              type="text"
                              name="member_code"
                              readOnly
                              defaultValue={selectedItem ? selectedItem.member_code : values.member_code}
                              onChange={handleChange}
                            />
                          </Col>
                          {/* <Col md="4">
                            <Form.Label>Spouse Age</Form.Label>
                            <Form.Control
                              type="text"
                              name="spouse_age"
                              defaultValue={selectedItem ? selectedItem.spouse_age : values.spouse_age}
                              onChange={handleChange}
                            />
                            {errors.spouse_age && touched.spouse_age && (
                              <div style={{ position: 'initial', transform: 'translateZ(10px)' }} className="d-block invalid-tooltip">
                                {errors.spouse_age}
                              </div>
                            )}
                          </Col> */}
                        </Row>
                      </>
                    ) : (
                      <></>
                    )}
                  </Col>
                  {/* <Col>
                    <Form.Label>Member Cost</Form.Label>
                    <Form.Control type="text" name="member_cost" style={{width:'100px'}} value={values ? values.member_cost : selectedItem.member_cost} readOnly />
                    <Form.Label>Guest Cost</Form.Label>
                    <Form.Control type="text" name="guest_cost" style={{width:'100px'}} value={values ? values.guest_cost : selectedItem.guest_cost} readOnly />
                    <Form.Label>Total</Form.Label>
                    <Form.Control
                      type="text"
                      name="total_cost" style={{width:'100px'}}
                      value={
                        values
                          ? parseInt(values.member_cost, 10) +
                          parseInt(values.dependent_cost, 10) +
                          parseInt(values.guest_cost, 10) +
                          parseInt(values.buffet_total, 10)
                          : '0'
                      }
                      readOnly
                    />
                  </Col> */}
                </Row>
              )}

              {currentEvent && currentEvent.is_dependent_allowed == 'Y' ? (
                <>
                 <br/>
                  <Row>
                    <Col md="12">
                      <Form.Label>Dependents Attending?</Form.Label>
                    </Col>
                    <Col md="6">
                      <Row>
                        <Col md="6">
                          <Form.Check
                            type="radio"
                            label="Yes"
                            value="Y"
                            id="categoryRadio7"
                            name="is_dependent_coming"
                            checked={values && values.is_dependent_coming == 'Y'}
                            onChange={(e) => {
                              handleChange(e);
                              changeDependentComing(e);
                            }}
                          />
                        </Col>
                        <Col md="6">
                          <Form.Check
                            type="radio"
                            label="No"
                            value="N"
                            id="categoryRadio5"
                            name="is_dependent_coming"
                            checked={values && values.is_dependent_coming == 'N'}
                            onChange={(e) => {
                              handleChange(e);
                              changeDependentComing(e);
                            }}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  {dependentIsComing == 'Y' && (
                    
                    <Row>
                      
                      <Col md="12">
                      
                      
                        <FormikProvider value={formik}>
                          <br/>
                          <FieldArray
                            name="dependentMembers"
                            render={(arrayHelpers) => (
                              <>
                                {values.dependentMembers && values.dependentMembers.length > 0 ? (
                                  values.dependentMembers.map((dependentMember, index) => {
                                    const dependentMemberErrors = (errors.dependentMembers?.length > 0 && errors.dependentMembers[index]) || {};
                                    const dependentMemberTouched = (touched.dependentMembers?.length > 0 && touched.dependentMembers[index]) || {};
                                    // console.log('errors', errors);

                                    return (
                                      <Row key={index}>
                                        <Col md="2">
                                       
                                        {index == 0 ? (<Form.Label>Member Relation</Form.Label>):(<Form.Label> </Form.Label>)}
                                          <Form.Select
                                            name={`dependentMembers[${index}].dependent_relation`}
                                            aria-label="Select Relationship"
                                            onChange={handleChange}
                                          >
                                            <option>Select</option>
                                            <option value="Mother">Mother</option>
                                            <option value="Father">Father</option>
                                            <option value="Daughter">Daughter</option>
                                            <option value="Son">Son</option>
                                          </Form.Select>
                                          {dependentMemberErrors.dependent_relation && dependentMemberTouched.dependent_relation && (
                                            <div style={{ position: 'initial', transform: 'translateZ(10px)' }} className="d-block invalid-tooltip">
                                              {dependentMemberErrors.dependent_relation}
                                            </div>
                                          )}
                                        </Col>
                                        <Col md="2">
                                        {index == 0 ? ( <Form.Label>Dependent Name</Form.Label>):(<Form.Label> </Form.Label>)}
                                          <Form.Control type="text" name={`dependentMembers[${index}].dependent_name`} onChange={handleChange} />
                                          {dependentMemberErrors.dependent_name && dependentMemberTouched.dependent_name && (
                                            <div style={{ position: 'initial', transform: 'translateZ(10px)' }} className="d-block invalid-tooltip">
                                              {dependentMemberErrors.dependent_name}
                                            </div>
                                          )}
                                        </Col>
                                        <Col md="2">
                                        {index == 0 ? ( <Form.Label>Dependent Code</Form.Label>):(<Form.Label> </Form.Label>)}
                                          <Form.Control type="text" name={`dependentMembers[${index}].dependent_code`} onChange={handleChange} />
                                          {dependentMemberErrors.dependent_code && dependentMemberTouched.dependent_code && (
                                            <div style={{ position: 'initial', transform: 'translateZ(10px)' }} className="d-block invalid-tooltip">
                                              {dependentMemberErrors.dependent_code}
                                            </div>
                                          )}
                                        </Col>
                                        <Col md="2">
                                        {index == 0 ? ( <Form.Label>Dependent Age</Form.Label>):(<Form.Label> </Form.Label>)}
                                          <Form.Control type="text" name={`dependentMembers[${index}].dependent_age`} onChange={handleChange} />
                                          {dependentMemberErrors.dependent_age && dependentMemberTouched.dependent_age && (
                                            <div style={{ position: 'initial', transform: 'translateZ(10px)' }} className="d-block invalid-tooltip">
                                              {dependentMemberErrors.dependent_age}
                                            </div>
                                          )}
                                        </Col>
                                        {index == 0 && (
                                        <Col md="2">
                                        
                                        <button
                                  type="button"
                                  className=" btn btn-primary"
                                  style={{ marginTop: '5%' }}
                                  onClick={() => arrayHelpers.push({ dependent_relation: '', dependent_name: '', dependent_code: '', dependent_age: '' })}
                                >
                                  <CsLineIcons icon="plus" size="13" />
                                </button>
                               
                                        </Col>
                                         )}
                                        <Col md="2">
                                          {index > 0 && (
                                            <button
                                              type="button"
                                              className=" btn btn-danger"
                                              style={{ marginTop: '17%' }}
                                              onClick={() => arrayHelpers.remove(index)}
                                            >
                                              <CsLineIcons icon="minus" size="13" />
                                            </button>
                                          )}
                                        </Col>
                                      </Row>
                                    );
                                  })
                                ) : (
                                  <></>
                                )}

                                {/* <br/>
                                <button
                                  type="button"
                                  className=" btn btn-primary"
                                  onClick={() => arrayHelpers.push({ dependent_relation: '', dependent_name: '', dependent_code: '', dependent_age: '' })}
                                >
                                  <CsLineIcons icon="plus" size="13" />
                                </button> */}
                              </>
                            )}
                          />
                        </FormikProvider>
                      </Col>
                    </Row>
                  )}
                </>
              ) : (
                <></>
              )}
              {currentEvent && currentEvent.is_guest_allowed == 'Y' && currentEvent.total_guest_tickets > currentEvent.totalguest ? (
                <>
                <br/>
                  <Row>
                    <Col md="12">
                      <Form.Label>Is Guest Coming?</Form.Label>
                    </Col>
                    <Col md="6">
                      <Row>
                        <Col md="6">
                          <Form.Check
                            type="radio"
                            label="Yes"
                            value="Y"
                            id="categoryRadio6"
                            name="is_guest_coming"
                            checked={values && values.is_guest_coming == 'Y'}
                            onChange={(e) => {
                              handleChange(e);
                              changeVarient(e);
                            }}
                          />
                        </Col>
                        <Col md="6">
                          <Form.Check
                            type="radio"
                            label="No"
                            value="N"
                            id="categoryRadio7"
                            name="is_guest_coming"
                            checked={values && values.is_guest_coming == 'N'}
                            onChange={(e) => {
                              handleChange(e);
                              changeVarient(e);
                            }}
                          />
                        </Col>
                      </Row>
                      {errors.is_guest_coming && touched.is_guest_coming && (
                        <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                          {errors.is_guest_coming}
                        </div>
                      )}
                    </Col>
                  </Row>
                </>
              ) : (
                ' '
              )}

              {isGuestComing == 'Y' && guestPerMember > 0 ? (
                <FormikProvider value={formik}>
                  <br/>
                  <FieldArray
                    name="guests"
                    render={(arrayHelpers) => (
                      <>
                        {values.guests && values.guests.length > 0 ? (
                          values.guests.map((guest, index) => {
                            const guestsErrors = (errors.guests?.length > 0 && errors.guests[index]) || {};
                            const guestsTouched = (touched.guests?.length > 0 && touched.guests[index]) || {};
                            return (
                              
                              <Row key={index}>
                                <Col md="2">
                                {index == 0 ? (<Form.Label>Name</Form.Label>):(<Form.Label> </Form.Label>)}
                                  <Form.Control type="text" name={`guests[${index}].guest_name`} onChange={handleChange} />
                                  {guestsErrors.guest_name && guestsTouched.guest_name && (
                                    <div style={{ position: 'initial', transform: 'translateZ(10px)' }} className="d-block invalid-tooltip">
                                      {guestsErrors.guest_name}
                                    </div>
                                  )}
                                </Col>
                                <Col md="2">
                                {index == 0 ? ( <Form.Label>Age</Form.Label>):(<Form.Label> </Form.Label>)}
                                  <Form.Control type="text" name={`guests[${index}].guest_age`} onChange={handleChange} />
                                  {guestsErrors.guest_age && guestsTouched.guest_age && (
                                    <div style={{ position: 'initial', transform: 'translateZ(10px)' }} className="d-block invalid-tooltip">
                                      {guestsErrors.guest_age}
                                    </div>
                                  )}
                                </Col>
                                <Col md="2">
                                  {index == 0 ? (<Form.Label>Phone</Form.Label>):(<Form.Label> </Form.Label>)}
                                  <Form.Control type="text" name={`guests[${index}].guest_phone`} onChange={handleChange} />
                                  {guestsErrors.guest_phone && guestsTouched.guest_phone && (
                                    <div style={{ position: 'initial', transform: 'translateZ(10px)' }} className="d-block invalid-tooltip">
                                      {guestsErrors.guest_phone}
                                    </div>
                                  )}
                                </Col>
                                <Col md="2">
                                 {index == 0 ? ( <Form.Label>Email</Form.Label>):(<Form.Label> </Form.Label>)}
                                  <Form.Control type="text" name={`guests[${index}].guest_email`} onChange={handleChange} />
                                  {guestsErrors.guest_email && guestsTouched.guest_email && (
                                    <div style={{ position: 'initial', transform: 'translateZ(10px)' }} className="d-block invalid-tooltip">
                                      {guestsErrors.guest_email}
                                    </div>
                                  )}
                                </Col>
                                {index == 0 && (
                                  <Col md="2">
                                {values.guests.length < guestPerMember && (
                          <button
                            type="button"
                            className=" btn btn-primary"
                            style={{ marginTop: '5%' }}
                            onClick={() => arrayHelpers.push({ guest_name: '', guest_age: '', guest_phone: '', guest_email: '' })}
                          >
                            <CsLineIcons icon="plus" size="13" />
                          </button>
                        )}
                         </Col>
                         )}
                                {index > 0 && (
                                  <Col md="2">
                                    <button type="button" className=" btn btn-danger" style={{ marginTop: '17%' }} onClick={() => arrayHelpers.remove(index)}>
                                      <CsLineIcons icon="minus" size="13" />
                                    </button>
                                  </Col>
                                )}
                              </Row>
                            );
                          })
                        ) : (
                          <></>
                        )}

                        {/* {values.guests.length < guestPerMember && (
                          <button
                            type="button"
                            className=" btn btn-primary"
                            onClick={() => arrayHelpers.push({ guest_name: '', guest_age: '', guest_phone: '', guest_email: '' })}
                          >
                            <CsLineIcons icon="plus" size="13" />
                          </button>
                        )} */}


                      </>
                    )}
                  />
                </FormikProvider>
              ) : (
                ''
              )}
              {currentEvent && currentEvent.food_served == 'Y' && currentEvent.buffet_total > currentEvent.totalbuffet ? (
                <>
                <br/>
                  <Row>
                    <Col md="12">
                      <Form.Label>Do you want buffet?</Form.Label>
                    </Col>
                    <Col md="6">
                      <Row>
                        <Col md="6">
                          <Form.Check
                            type="radio"
                            label="Yes"
                            value="Y"
                            id="categoryRadio13"
                            name="buffetWanted"
                            checked={values && values.buffetWanted == 'Y'}
                            onChange={(e) => {
                              handleChange(e);
                              changeWantedBuffet(e);
                            }}
                          />
                        </Col>
                        <Col md="6">
                          <Form.Check
                            type="radio"
                            label="No"
                            value="N"
                            id="categoryRadio4"
                            name="buffetWanted"
                            checked={values && values.buffetWanted == 'N'}
                            onChange={(e) => {
                              handleChange(e);
                              changeWantedBuffet(e);
                            }}
                          />
                        </Col>
                      </Row>
                      {errors.buffetWanted && touched.buffetWanted && (
                        <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                          {errors.buffetWanted}
                        </div>
                      )}
                    </Col>
                  </Row>
                </>
              ) : (
                ' '
              )}
              {wantBuffet == 'Y' && (
                <>
                  <Row>
                    <Col md="4">
                      <Form.Label>Veg</Form.Label>
                      <Form.Control
                        type="text"
                        name="veg_buffet"
                        defaultValue={selectedItem ? selectedItem.veg_buffet : values.veg_buffet}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      {errors.veg_buffet && touched.veg_buffet && (
                        <div style={{ position: 'initial', transform: 'translateZ(10px)' }} className="d-block invalid-tooltip">
                          {errors.veg_buffet}
                        </div>
                      )}
                    </Col>
                    <Col md="4">
                      <Form.Label>Non-Veg</Form.Label>
                      <Form.Control
                        type="text"
                        name="nonVeg_buffet"
                        defaultValue={selectedItem ? selectedItem.nonVeg_buffet : values.nonVeg_buffet}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      {errors.nonVeg_buffet && touched.nonVeg_buffet && (
                        <div style={{ position: 'initial', transform: 'translateZ(10px)' }} className="d-block invalid-tooltip">
                          {errors.nonVeg_buffet}
                        </div>
                      )}
                    </Col>
                  </Row>
                </>
              )}
              {currentEvent && currentEvent.table_book_available == 'Y' && currentEvent.is_seat_book_open == 'Y' ? (
                <>
                  <Row>
                    <Col md="12">

                      {currentEvent.seat_2 == 1 || currentEvent.seat_4 == 1 || currentEvent.seat_6 == 1 || currentEvent.seat_8 == 1 ? (
                        <>
                        <br/>
                          <Form.Label><h6>Table Booking Details : </h6></Form.Label>
                          <div>
                          <Form.Label>* &nbsp;</Form.Label>
                            {currentEvent.seat_2 == 1 ? (
                              <Form.Label> 2 seater </Form.Label>) : ''}


                            {currentEvent.seat_4 == 1 ?
                              (

                                <>
                                  {currentEvent.seat_2 == 1 ? (
                                    <Form.Label>&nbsp; and&nbsp; </Form.Label>) : ''}
                                  <Form.Label> 4 seater  </Form.Label>
                                </>

                              )
                              : ''}


                            {currentEvent.seat_6 == 1 ?
                              (

                                <>
                                  {currentEvent.seat_2 == 1 || currentEvent.seat_4 == 1? (
                                    <Form.Label>&nbsp; and&nbsp; </Form.Label>) : ''}
                                  <Form.Label> 6 seater  </Form.Label>
                                </>

                              )
                              : ''}


                            {currentEvent.seat_8 == 1 ?
                              (

                                <>
                                  {currentEvent.seat_4 == 1 || currentEvent.seat_6 == 1 || currentEvent.seat_2 == 1? (
                                    <Form.Label>&nbsp;and&nbsp; </Form.Label>) : ''}
                                  <Form.Label> 8 seater  </Form.Label>
                                </>

                              )
                              : ''}


                            <Form.Label>&nbsp; tables are available for booking. </Form.Label>
                            <br/>
                            <Form.Label>
                            *  Please specify table requirement" (Note: Club Office will finalise table allotment, based on availability and other factors)</Form.Label>
                            <Form.Label>
                            *  If you would like to make a special request for joining tables with another Member, who has also booked for this Event, specify the details</Form.Label>
                            <Col md="8">
                            <Form.Control
                              type="text"
                              name="table_book_detail"
                              as="textarea"
                              defaultValue={selectedItem ? selectedItem.table_book_detail : values.table_book_detail}
                              onChange={handleChange}
                              
                            />
                            </Col>
                          </div>
                        </>
                      ) : ''}


                    </Col>

                    
                  </Row>
                </>
              ) : (
                ' '
              )}
              <br/><br/>
<Row>


                    <h4>Event Cost Details : </h4> 
                    <br/>
                    <Col md="2">
                    <Form.Label>Member Cost :</Form.Label>
                    <Form.Control type="text" name="member_cost" style={{width:'100px'}} value={values ? values.member_cost : selectedItem.member_cost} readOnly /></Col>
                    <Col md="2"> <Form.Label>Guest Cost :</Form.Label>
                    <Form.Control type="text" name="guest_cost" style={{width:'100px'}} value={values ? values.guest_cost : selectedItem.guest_cost} readOnly /></Col>
                    <Col md="2"> <Form.Label>Total Cost:</Form.Label>
                    <Form.Control
                      type="text"
                      name="total_cost" style={{width:'100px'}}
                      value={
                        values
                          ? parseInt(values.member_cost, 10) +
                          parseInt(values.dependent_cost, 10) +
                          parseInt(values.guest_cost, 10) +
                          parseInt(values.buffet_total, 10)
                          : '0'
                      }
                      readOnly
                    /></Col>
                  
</Row>
<Row style={{ marginBottom: '2%' ,marginTop:'2%'}}>
              <Col md="5">
                              <Form.Label>Comments :</Form.Label>
                              <Form.Control
                                type="text"
                                as="textarea"
                                name="comments"
                                defaultValue={selectedItem ? selectedItem.comments : values.comments}
                                onChange={handleChange}
                              />
                              
                            </Col>
                            </Row>
                            <Row style={{ marginBottom: '5%' }}>
                <Col> </Col>
              </Row>              <Row>
                <div className="mb-3">
                  <Button variant="outline-primary" onClick={() => {setIsOpenBookSeatModal(false)}}>
                    Cancel
                  </Button>&nbsp;
                  <Button variant="primary" type="submit">
                    Warn In
                  </Button>
                </div>
              </Row>
            </Container>
          )}
          {parentCat == 1 && (
            <Container fluid>
              {currentEvent && (
                <Row>
                  
                  <Col md="12">
                    <Row>
                    <Col md="12">
                    <Form.Label>Are You Attending?</Form.Label>
                  </Col>
                      <Col md="4">
                        <Form.Check
                          type="radio"
                          label="Yes"
                          value="Y"
                          id="categoryRadio13"
                          name="are_you_coming"
                          checked={values && values.are_you_coming == 'Y'}
                          onChange={(e) => {
                            handleChange(e);
                            changeAreYouComing(e);
                          }}
                        />
                      </Col>
                      <Col md="4">
                        <Form.Check
                          type="radio"
                          label="NO"
                          value="N"
                          id="categoryRadio14"
                          name="are_you_coming"
                          checked={values && values.are_you_coming == 'N'}
                          onChange={(e) => {
                            handleChange(e);
                            changeAreYouComing(e);
                          }}
                        />
                      </Col>
                    </Row>
                    {errors.are_you_coming && touched.are_you_coming && (
                      <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                        {errors.are_you_coming}
                      </div>
                    )}
                    {areYouComing == 'Y' ? (
                      <>
                        <br/>
                        <Row>
                        
                          <Col md="2">
                            <Form.Label>Member Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="member_name"
                              defaultValue={selectedItem ? selectedItem.member_name : values.member_name}
                              onChange={handleChange}
                              readOnly
                            />
                          </Col>
                          <Col md="2">
                            <Form.Label>Member Code</Form.Label>
                            <Form.Control
                              type="text"
                              name="member_code"
                              readOnly
                              defaultValue={selectedItem ? selectedItem.member_code : values.member_code}
                              onChange={handleChange}
                            />
                          </Col>
                          <Col md="2">
                            <Form.Label>Member Age</Form.Label>
                            <Form.Control
                              type="text"
                              name="member_age"
                              defaultValue={selectedItem ? selectedItem.member_age : values.member_age}
                              onChange={handleChange}
                            />
                            {errors.member_age && touched.member_age && (
                              <div style={{ position: 'initial', transform: 'translateZ(10px)' }} className="d-block invalid-tooltip">
                                {errors.member_age}
                              </div>
                            )}
                          </Col>
                        </Row>
                        {currentEvent.tournament_type == 'D' && (
                          <Row>
                            <Col md="4">
                              <Form.Label>Pair Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="member_pair_name"
                                defaultValue={selectedItem ? selectedItem.member_pair_name : values.member_pair_name}
                                onChange={handleChange}
                              />
                              {errors.member_pair_name && touched.member_pair_name && (
                                <div style={{ position: 'initial', transform: 'translateZ(10px)' }} className="d-block invalid-tooltip">
                                  {errors.member_pair_name}
                                </div>
                              )}
                            </Col>
                            <Col md="4">
                              <Form.Label>Pair Member Code</Form.Label>
                              <Form.Control
                                type="text"
                                name="member_pair_code"
                                defaultValue={selectedItem ? selectedItem.member_pair_code : values.member_pair_code}
                                onChange={handleChange}
                              />
                              {errors.member_pair_code && touched.member_pair_code && (
                                <div style={{ position: 'initial', transform: 'translateZ(10px)' }} className="d-block invalid-tooltip">
                                  {errors.member_pair_code}
                                </div>
                              )}
                            </Col>
                            <Col md="4">
                              <Form.Label>Pair Member Age</Form.Label>
                              <Form.Control
                                type="text"
                                name="member_pair_age"
                                defaultValue={selectedItem ? selectedItem.member_pair_age : values.member_pair_age}
                                onChange={handleChange}
                              />
                              {errors.member_pair_age && touched.member_pair_age && (
                                <div style={{ position: 'initial', transform: 'translateZ(10px)' }} className="d-block invalid-tooltip">
                                  {errors.member_pair_age}
                                </div>
                              )}
                            </Col>
                          </Row>
                        
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                   <br/>
                    {currentEvent ? (
                      <>
                        <Row>
                          <Col md="12">
                            <Form.Label>Is Your Dependents Attending?</Form.Label>
                          </Col>
                         
                              <Col md="4">
                                <Form.Check
                                  type="radio"
                                  label="Yes"
                                  value="Y"
                                  id="categoryRadio7"
                                  name="is_dependent_attending"
                                  checked={values && values.is_dependent_attending == 'Y'}
                                  onChange={(e) => {
                                    handleChange(e);
                                    changeDependentAttending(e);
                                  }}
                                />
                              </Col>
                              <Col md="4">
                                <Form.Check
                                  type="radio"
                                  label="No"
                                  value="N"
                                  id="categoryRadio5"
                                  name="is_dependent_attending"
                                  checked={values && values.is_dependent_attending == 'N'}
                                  onChange={(e) => {
                                    handleChange(e);
                                    changeDependentAttending(e);
                                  }}
                                />
                              </Col>
                           
                        </Row>
                        {dependentIsAttending == 'Y' && (
                          <>
                          <br/>
                          <Row>
                             
                            <Col md="12">
                              <FormikProvider value={formik}>
                                <FieldArray
                                  name="sportsDependentMembers"
                                  render={(arrayHelpers) => (
                                    <>
                                      {values.sportsDependentMembers && values.sportsDependentMembers.length > 0 ? (
                                        values.sportsDependentMembers.map((dependentMember, index) => {
                                          const sportsDependentMemberErrors =
                                            (errors.sportsDependentMembers?.length > 0 && errors.sportsDependentMembers[index]) || {};
                                          const sportsDependentMembersTouched =
                                            (touched.sportsDependentMembers?.length > 0 && touched.sportsDependentMembers[index]) || {};
                                          // console.log('errors', errors);

                                          return (
                                            <Row key={index}>
                                              <Col md="2">
                                              {index == 0 ? (  <Form.Label>Member Relation</Form.Label>):(<Form.Label> </Form.Label>)}
                                                <Form.Select
                                                  name={`sportsDependentMembers[${index}].dependent_relation`}
                                                  aria-label="Select Relationship"
                                                  onChange={handleChange}
                                                >
                                                  <option>Select</option>
                                                  <option value="Spouse">Spouse</option>
                                                  <option value="Mother">Mother</option>
                                                  <option value="Father">Father</option>
                                                  <option value="Daughter">Daughter</option>
                                                  <option value="Son">Son</option>
                                                </Form.Select>
                                                {sportsDependentMemberErrors.dependent_relation && sportsDependentMembersTouched.dependent_relation && (
                                                  <div style={{ position: 'initial', transform: 'translateZ(10px)' }} className="d-block invalid-tooltip">
                                                    {sportsDependentMemberErrors.dependent_relation}
                                                  </div>
                                                )}
                                              </Col>
                                              <Col md="2">
                                               {index == 0 ? ( <Form.Label>Dependent Name</Form.Label>):(<Form.Label> </Form.Label>)}
                                                <Form.Control type="text" name={`sportsDependentMembers[${index}].dependent_name`} onChange={handleChange} />
                                                {sportsDependentMemberErrors.dependent_name && sportsDependentMembersTouched.dependent_name && (
                                                  <div style={{ position: 'initial', transform: 'translateZ(10px)' }} className="d-block invalid-tooltip">
                                                    {sportsDependentMemberErrors.dependent_name}
                                                  </div>
                                                )}
                                              </Col>
                                              <Col md="2">
                                               {index == 0 ? ( <Form.Label>Code</Form.Label>):(<Form.Label> </Form.Label>)}
                                                <Form.Control type="text" name={`sportsDependentMembers[${index}].dependent_code`} onChange={handleChange} />
                                                {sportsDependentMemberErrors.dependent_code && sportsDependentMembersTouched.dependent_code && (
                                                  <div style={{ position: 'initial', transform: 'translateZ(10px)' }} className="d-block invalid-tooltip">
                                                    {sportsDependentMemberErrors.dependent_code}
                                                  </div>
                                                )}
                                              </Col>
                                              <Col md="1">
                                              {index == 0 ? (  <Form.Label>Age</Form.Label>):(<Form.Label> </Form.Label>)}
                                                <Form.Control type="text" name={`sportsDependentMembers[${index}].dependent_age`} onChange={handleChange} />
                                                {sportsDependentMemberErrors.dependent_age && sportsDependentMembersTouched.dependent_age && (
                                                  <div style={{ position: 'initial', transform: 'translateZ(10px)' }} className="d-block invalid-tooltip">
                                                    {sportsDependentMemberErrors.dependent_age}
                                                  </div>
                                                )}
                                              </Col>
                                              {currentEvent.tournament_type == 'D' && (
                                                
                                                <>
                                                  <Col md="2">
                                                  {index == 0 ? (<Form.Label>Pair Name</Form.Label>):(<Form.Label> </Form.Label>)}
                                                    <Form.Control
                                                      type="text"
                                                      name={`sportsDependentMembers[${index}].dependent_pair_name`}
                                                      onChange={handleChange}
                                                    />
                                                    {sportsDependentMemberErrors.dependent_pair_name && sportsDependentMembersTouched.dependent_pair_name && (
                                                      <div style={{ position: 'initial', transform: 'translateZ(10px)' }} className="d-block invalid-tooltip">
                                                        {sportsDependentMemberErrors.dependent_pair_name}
                                                      </div>
                                                    )}
                                                  </Col>
                                                  <Col md="2">
                                                   {index == 0 ? ( <Form.Label> Code</Form.Label>):(<Form.Label> </Form.Label>)}
                                                    <Form.Control
                                                      type="text"
                                                      name={`sportsDependentMembers[${index}].dependent_pair_code`}
                                                      onChange={handleChange}
                                                    />
                                                    {sportsDependentMemberErrors.dependent_pair_code && sportsDependentMembersTouched.dependent_pair_code && (
                                                      <div style={{ position: 'initial', transform: 'translateZ(10px)' }} className="d-block invalid-tooltip">
                                                        {sportsDependentMemberErrors.dependent_pair_code}
                                                      </div>
                                                    )}
                                                  </Col>
                                                  <Col md="1">
                                                    {index == 0 ? (<Form.Label>Age</Form.Label>):(<Form.Label> </Form.Label>)}
                                                    <Form.Control
                                                      type="text"
                                                      name={`sportsDependentMembers[${index}].dependent_pair_age`}
                                                      onChange={handleChange}
                                                    />
                                                    {sportsDependentMemberErrors.dependent_pair_age && sportsDependentMembersTouched.dependent_pair_age && (
                                                      <div style={{ position: 'initial', transform: 'translateZ(10px)' }} className="d-block invalid-tooltip">
                                                        {sportsDependentMemberErrors.dependent_pair_age}
                                                      </div>
                                                    )}
                                                  </Col>
                                                </>
                                              )}
                                             
                                             {index == 0 && (
                                              <Col md="2">
                                               <button
                                               type="button"
                                               style={{ marginTop: '5%' }}
                                               className=" btn btn-primary"
                                               onClick={() =>
                                                 arrayHelpers.push({
                                                   dependent_relation: '',
                                                   dependent_name: '',
                                                   dependent_code: '',
                                                   dependent_age: '',
                                                   dependent_pair_name: '',
                                                   dependent_pair_code: '',
                                                   dependent_pair_age: '',
                                                 })
                                               }
                                             >
                                               <CsLineIcons icon="plus" size="13" />
                                             </button>
                                             </Col>
                                             )}
                                                {index > 0 && (
                                                   <Col md="2">
                                                  <button
                                                    type="button"
                                                    className=" btn btn-danger"
                                                    style={{ marginTop: '17%' }}
                                                    onClick={() => arrayHelpers.remove(index)}
                                                  >
                                                    <CsLineIcons icon="minus" size="13" />
                                                  </button>
                                                  </Col>
                                                )}
                                             
                                            </Row>
                                          );
                                        })
                                      ) : (
                                        <></>
                                      )}

                                      {/* <button
                                        type="button"
                                        className=" btn btn-primary"
                                        onClick={() =>
                                          arrayHelpers.push({
                                            dependent_relation: '',
                                            dependent_name: '',
                                            dependent_code: '',
                                            dependent_age: '',
                                            dependent_pair_name: '',
                                            dependent_pair_code: '',
                                            dependent_pair_age: '',
                                          })
                                        }
                                      >
                                        <CsLineIcons icon="plus" size="13" />
                                      </button> */}
                                    </>
                                  )}
                                />
                              </FormikProvider>
                            </Col>
                          </Row></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
              )}
             <Row style={{ marginBottom: '2%' }}>
                <Col> </Col>
              </Row>
              <Row style={{ marginBottom: '5%' }}>
              <Col md="5">
                              <Form.Label>Comments :</Form.Label>
                              <Form.Control
                                type="text"
                                as="textarea"
                                name="comments"
                                defaultValue={selectedItem ? selectedItem.comments : values.comments}
                                onChange={handleChange}
                              />
                              
                            </Col>
                            </Row>

              <Row>
                <div className="mb-3">
                  <Button variant="outline-primary" onClick={() => {setIsOpenBookSeatModal(false)}}>
                    Cancel
                  </Button>&nbsp;
                  <Button variant="primary" disabled={!!(areYouComing == 'N' && dependentIsAttending == 'N')} type="submit">
                    Warn In
                  </Button>
                </div>
              </Row>
            </Container>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
};

export default BookSeat;
