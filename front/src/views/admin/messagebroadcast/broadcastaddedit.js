/* eslint-disable eqeqeq */
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { SERVICE_URL, API_URL } from 'config.js';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { broadcastPath } from 'constants.js';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
// import confirm from 'react-confirm-bootstrap';  
// import { confirmAlert } from 'react-confirm-alert';

const broadcastaddedit = ({ tableInstance, addItem, editItem }) => {
  const { selectedFlatRows, data, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;
  const emptyItem = { id: '', module: '', message_template: '', imagepath: '', filepath: '', message: '', groupid: '', medium: '',eventid:'' };
  const [selectedItem, setSelectedItem] = useState(emptyItem);
  const [module, setmodule] = useState('');
  const [modulelist, setmodulelist] = useState([]);
  const [msgtemp, setmsgtemp] = useState('');
  const [messagetemplatelist, setmessagetemplatelist] = useState([]);
  const [singlemsgtempitem, setsinglemsgtempitem] = useState(null);
  const [eventdetail, seteventdetail] = useState([]);
  const [menuImg, setMenuImg] = useState('');
  const refFileUpload = useRef(null);


  const [show, setShow] = useState(false);




  const validationSchema = Yup.object().shape({
    module: Yup.string().required('Module is required'),
    message_template: Yup.string().required('Message template is required'),
     message: Yup.string().required('Message is required'),
    groupid: Yup.string().required('Groupid is required'),
    medium: Yup.string().required('Medium is required'),
    eventid: Yup.string().when('module', {
      is: 'Event',
      then: Yup.string().required('Event Name is required'),
    }),
    imagepath: Yup.string().when('module', {
      is: 'Event',
      then: Yup.string().required('Image is required'),
    }),
    //  imagepath: Yup.string().required('Image is required'),
    
    // imagepath: Yup.string().when('imagepath', {
		// 	is: (exists) => !!exists,
		// 	then: Yup.string().required('Image is required'),
		// 	otherwise: Yup.string(),
		// }),
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
    if (selectedFlatRows.length === 1) {
      editItem({ item: values });

      // const { index } = selectedFlatRows[0];
      // const newData = data.map((row, rowIndex) => (rowIndex === index ? selectedItem : row));
      // setData(newData);
    } else {
      addItem({ item: values });
    }
    resetForm({ values: '' });
    setsinglemsgtempitem(null);
    setIsOpenAddEditModal(false);
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
    if (isOpenAddEditModal && selectedFlatRows.length === 1) {
      if (selectedFlatRows[0].original.item_image != '') {
        setMenuImg(`${broadcastPath}${selectedFlatRows[0].original.imagepath}`);
      }
    }
  }, [selectedFlatRows, isOpenAddEditModal]);

  const initialValues = selectedItem;
  // console.log('initialValues', initialValues);
  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, setFieldValue, values, touched, errors } = formik;

  const handleClose = () => 
  {
    
    // setmodule('');
    
    setShow(false);
  }
  const handleShow = () => {

    setShow(true);
   
  }
  const handleconfirmClose = () => {

    handleSubmit();
    setShow(false);
  }
  const handlecancel = () => 
  {
    setmodule('');  
    
    setIsOpenAddEditModal(false);
      
    
    
  }

  const changemedium = (event) => {
    if (event.target.checked) {
      setSelectedItem({ ...selectedItem, medium: event.target.value });
    }
  };

  useEffect(() => {
    if (selectedFlatRows.length === 1) {
      // get user and set form fields
      const fields = ['id', 'module', 'message_template', 'imagepath', 'filepath', 'message', 'groupid', 'medium','eventid'];
      fields.forEach((field) => {
        // console.log('selectedItem', selectedItem[field]);
        setFieldValue(field, selectedItem[field], false);
      });
      
      // values = selectedItem;
    }
  }, [selectedItem, selectedFlatRows]);

  const fetchevent = React.useCallback(async () => {
    //   document.body.classList.add('spinner');
    if(module=="Event")
    {
       const response = await axios.get(`${API_URL}events/get_lastoneyear_events`, { params: { msgtemp } });
   
       setTimeout(() => {
         // const { result } = response.data.result;
         // console.log('response', response.data);
         seteventdetail(response.data.result);
         
        // document.body.classList.remove('spinner');
   
         
   
       }, 1000);
    }
     }, [msgtemp]);

  useEffect(() => {
    
    if (singlemsgtempitem != null) {
      setSelectedItem({ ...selectedItem, message_template: singlemsgtempitem.message_template });
      setSelectedItem({ ...selectedItem, message: singlemsgtempitem.message });
     setFieldValue('message', singlemsgtempitem.message);
     setFieldValue('message_template', singlemsgtempitem.message_template);
     setmsgtemp(singlemsgtempitem.status);
   

    }
    else {
      setSelectedItem({ ...selectedItem, message_template: '' });
      setSelectedItem({ ...selectedItem, message: '' });
      setFieldValue('message', '');
      setFieldValue('message_template', '');
      setmsgtemp('');
     
    }
    setFieldValue('eventid', "");
    setSelectedItem({ ...selectedItem, eventid: '' });
  }, [singlemsgtempitem]);

  useEffect(() => {
    
   fetchevent();
    
  }, [msgtemp]);


  const fetchmodule = React.useCallback(async () => {
    // document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}broadcast/get_broadcast_module`, { params: {} });

    setTimeout(() => {
      // const { result } = response.data.result;
      // console.log('response', response.data);
      setmodulelist(response.data.result);

      // document.body.classList.remove('spinner');    

    }, 1000);


  }, []);

 


  const fetchmessagetemplate = React.useCallback(async () => {
    // document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}broadcast/get_broadcast_message_template`, { params: { module } });

    setTimeout(() => {

      setmessagetemplatelist(response.data.result);

      if(selectedFlatRows.length>0)
      

      {
        const row = Object.values(response.data.result).find((obj) => {
          if (obj.message_template == selectedFlatRows[0].original.message_template)
            return (obj);
    
          return undefined;
        })
        if (row != undefined) {
          // setSelectedItem({ ...selectedItem, message_template: row.message_template });
          // setSelectedItem({ ...selectedItem, message: row.message });
          setsinglemsgtempitem(row);
    
    
        }
        else {
          // setSelectedItem({ ...selectedItem, message_template: '' });
          // setSelectedItem({ ...selectedItem, message: '' });
          setsinglemsgtempitem(null);
    
    
        }
      }
      else
      setsinglemsgtempitem(null);

    }, 1000);
  }, [module,selectedFlatRows]);


  useEffect(() => {
    fetchmodule();
  }, []);



  useEffect(() => {
    fetchmessagetemplate();
  }, [module]);

  const handleSearchInputChangeevent = (event) => {
    setSelectedItem({ ...selectedItem, eventid: event.target.value });
    
  };


  const handlechangemodule = (moduledrop) => {
    setmodule(moduledrop.target.value);
    setSelectedItem({ ...selectedItem, module: moduledrop.target.value });
    if(moduledrop.target.value==='Event')
    {
    // fetchevent();
    }
    else
    {
    seteventdetail([]);
    }
  };

  const handlechangemessagetemplate = (messagetemplateval) => {


    const row = Object.values(messagetemplatelist).find((obj) => {
      if (obj.message_template == messagetemplateval)
        return (obj);

      return undefined;
    })
    if (row != undefined) {
      // setSelectedItem({ ...selectedItem, message_template: row.message_template });
      // setSelectedItem({ ...selectedItem, message: row.message });
      setsinglemsgtempitem(row);


    }
    else {
      // setSelectedItem({ ...selectedItem, message_template: '' });
      // setSelectedItem({ ...selectedItem, message: '' });
      setsinglemsgtempitem(null);


    }

   

    

  };



  return (
    <Modal className="modal-right" keyboard={false} show={isOpenAddEditModal} onHide={() => {
      formik.resetForm({ values: '' });
      setmodule('');
      setmsgtemp('');
      setsinglemsgtempitem(null);
      setIsOpenAddEditModal(false);
    }}>
      <Modal.Header>
        <Modal.Title>{selectedFlatRows.length === 1 ? 'Edit' : 'Add'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control type="hidden" name="id" defaultValue={selectedItem ? selectedItem.id : ''} />

          <div className="mb-3">
            <div className="mb-3">
              <Form.Label>Module</Form.Label>
              <Form.Select name="module" value={values ? values.module : selectedItem.module}
                onChange={(e) => {
                  handleChange(e);
                  handlechangemodule(e);
                 
                }}>
                <option value="">Select</option>
                { modulelist.length > 0 && modulelist.map(function (Items) {
                  return (
                    <option value={Items.module} key={Items.module} >
                      {Items.module}
                    </option>
                  )
                })}
               
              </Form.Select>
              {errors.module && touched.module && (
                <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                  {errors.module}
                </div>
              )}
            </div>

            <div className="mb-3">
              <Form.Label>Message Template</Form.Label>
              <Form.Select name="message_template" value={values ? values.message_template : selectedItem.message_template}
                onChange={(e) => {
                  handleChange(e);
                  handlechangemessagetemplate(e.target.value);
                 
                }} >
                <option value="">Select</option>
                { messagetemplatelist.length > 0 && messagetemplatelist.map(function (Items) {
                  return (
                    <option value={Items.message_template} key={Items.message_template} >
                      {Items.message_template}
                    </option>
                  )
                })}
             
            
              </Form.Select>
              {errors.message_template && touched.message_template && (
                <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                  {errors.message_template}
                </div>
              )}
            </div>

            {module=='Event' ?
            <div className="mb-3">
              <Form.Label>Event Name</Form.Label>
              <Form.Select
                        value={values ? values.eventid : selectedItem.eventid}
                        name="eventid"
                        onChange={handleChange}
                       
                      >
                        <option key="" value="">
                          Select
                        </option>

                        {eventdetail.map(function (Items) {
                          return (
                            <option value={Items.id} key={Items.id} >
                              {Items.event_name}
                            </option>
                          )
                        })}
                        
                      </Form.Select>
 
              {errors.eventid && touched.eventid && (
                <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                  {errors.eventid }
                </div>
              )}
            </div>:''}
            <div className="mb-3">
              <Form.Label>Message</Form.Label>
              {/* <Form.Control type="text" name="message"  defaultValue={selectedItem ? selectedItem.message : ''} onChange={handleChange} /> */}

              {/* <Form.Control type="text" name="message" as="textarea" defaultValue='Dear Member , We are pleased to inform you that {{1}} event is planned at our club. You can view the details in the invite attached. We will keep you informed on when you can book from our online Portal. For further assistance kindly contact {{2}} and quote your Member ID {{3}} Thank you' onChange={handleChange} /> */}
              <Form.Control type="text" name="message" as="textarea" style={{ height: '100px' }} defaultValue={values ? values.message : ''} onChange={handleChange} />
              {errors.message && touched.message && (
                <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                  {errors.message}
                </div>
              )}
            </div>
            {singlemsgtempitem && singlemsgtempitem.imagetype == 1 ?
              <>
                <div className="mb-3">
                  <Form.Label>Choose Image</Form.Label>
                </div>

                <div className="mb-6 mx-auto position-relative" id="imageUpload">

                  <img key="img0"
                    src={menuImg ? `${menuImg}` : '/assets/images/mcc-fav.png'}
                    alt="image"
                    style={{ width: '100px', height: '100px' }}
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
                    name="imagepath"
                    id="imagepath"
                    ref={refFileUpload}
                    className="file-upload d-none"
                    accept="image/*"
                    onChange={(e) => {
                      handleChange(e);
                      changeThumb(e);
                      setFieldValue('imagepath_file', e.currentTarget.files[0]);
                    }}
                  />
                  {errors.imagepath && touched.imagepath && (
                    <div ref={element => { if (element) element.style.setProperty('width', '100%', 'important'); }} className="d-block invalid-tooltip">
                      {errors.imagepath}
                    </div>
                  )}
                  {/* {selectedFlatRows.length === 0 ? 
          <div>
            <Form.Label>Choose Image</Form.Label>
            <Form.Control type="file" name="imagepath"  accept="image/png, image/gif, image/jpeg" defaultValue={selectedItem ? selectedItem.imagepath : values.imagepath} onChange={handleChange} />
            {errors.imagepath && touched.imagepath && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.imagepath}
              </div>
            )}
            </div>

             : <img key="img0"
             
             src={`${broadcastPath}${selectedItem.imagepath}`}
             alt="image" 
             style={{width:'100px',height:'100px'}}
             
             id="contactThumbModal"
           /> } */}
                </div>

              </>
              : ''}
          </div>
          {singlemsgtempitem && singlemsgtempitem.filetype == 1 ?
            <div className="mb-3">
              <Form.Label>Choose File</Form.Label>
              <Form.Control
                type="file"
                name="filepath"
                accept="application/pdf,application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                defaultValue={selectedItem ? selectedItem.invitation_attachment : values.invitation_attachment}
                // onChange={handleChange}
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue('filepath_file', e.currentTarget.files[0]);
                }}
              />
              {errors.filepath && touched.filepath && (
                <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                  {errors.filepath}
                </div>
              )}
            </div>

            : ''}

          <div className="mb-3">
            <Form.Label>Group</Form.Label>
            <Form.Select name="groupid" value={values ? values.groupid : selectedItem.groupid} onChange={handleChange} >
              <option value="">Select</option>
              <option value="admin">Admin</option>
              <option value="all">All</option>
              {/* <option value="billiards">Billiards</option>
            <option value="badminton">Badminton</option>
            <option value="cricket">Cricket</option>
            <option value="hockey">Hockey</option>
            <option value="squash">Squash</option>
            <option value="tennis">Tennis</option>
            <option value="swimming">Swimming</option> */}
            </Form.Select>
            {errors.groupid && touched.groupid && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.groupid}
              </div>
            )}
          </div>

          <div className="mb-3">
            <Form.Label>Medium</Form.Label>
            <Form.Check
              type="radio"
              label="Whatsapp"
              value="WA"
              id="categoryRadio1"
              name="medium"
              checked={(values && values.medium === 'WA') || (selectedItem && selectedItem.medium === 'WA')}
              onChange={(e) => {
                handleChange(e);
                changemedium(e);
              }}
            />
            {/* <Form.Check
              type="radio"
              label="Email"
              value="EM"
              id="categoryRadio2"
              name="medium"
              checked={(values && values.medium === 'EM') || (selectedItem && selectedItem.medium === 'EM')}
              onChange={(e) => {
                handleChange(e);
                changeCategory(e);
              }}
            /> */}
            {errors.medium && touched.medium && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.medium}
              </div>
            )}
          </div>




          <div className="mb-3">
            <Button variant="outline-primary"  onClick={() => {
                    formik.resetForm({ values: '' });
                    setmodule('');
                    setmsgtemp('');
                    setsinglemsgtempitem(null);
                    setIsOpenAddEditModal(false);
                  }}>
              Cancel
            </Button>&nbsp;&nbsp;
            <Button variant="primary"  onClick={handleShow}>
              {selectedFlatRows.length === 1 ? 'Send' : 'Send'}
            </Button>

            {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Confirmation Message</Modal.Title>
              </Modal.Header>
              <Modal.Body>(Same Template message)</Modal.Body>
              {singlemsgtempitem && singlemsgtempitem.message_sample.length > 0 ?
              <Modal.Body>{singlemsgtempitem.message_sample}</Modal.Body>
              :''}
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleconfirmClose}>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
};

export default broadcastaddedit;
