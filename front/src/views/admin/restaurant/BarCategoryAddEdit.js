/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import * as Yup from 'yup';
import { catImageLivePath, itemImageLivePath } from 'constants.js';

const BarCategoryAddEdit = ({ tableInstance, addItem, editItem }) => {
  const { selectedFlatRows, data, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;
  const emptyItem = { id: '', image:'', name: '', description: '', active: "0", };
  const [selectedItem, setSelectedItem] = useState(emptyItem);
  const [catImg, setcatImg] = useState('');
  const refFileUpload = useRef(null);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Category Name is required'),
    description: Yup.string().required('Description is required'),
    active: Yup.string().required('Status is required'),
    
  });
    
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
    setIsOpenAddEditModal(false);
  };
  const onThumbChangeClick = () => {
    if (refFileUpload) {
      refFileUpload.current.dispatchEvent(new MouseEvent('click'));
    }
  };
  const changeThumb = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setSelectedItem({ ...selectedItem, image: loadEvent.target.result });
	setcatImg(loadEvent.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  useEffect(() => {
    if (isOpenAddEditModal && selectedFlatRows.length === 1) {
// console.log(selectedFlatRows[0].original.image);
      setSelectedItem(selectedFlatRows[0].original);
setcatImg('');


      
    } else {
      setSelectedItem(emptyItem);
	setcatImg('');
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenAddEditModal, selectedFlatRows]);
  const initialValues = selectedItem;

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, setFieldValue,  values, touched, errors } = formik;

  const changeActive = (event) => {
    // console.log('event', event.target.value);
    if (event.target.checked) {
      setSelectedItem({ ...selectedItem, active: event.target.value });
    }
  };
  

  useEffect(() => {
    if (selectedFlatRows.length === 1) {
      // get user and set form fields
      const fields = ['id', 'name','image', 'description', 'active'];
      fields.forEach((field) => {
        // console.log( 'selectedItem', selectedItem[field]);
        setFieldValue(field, selectedItem[field], false)

      });
      // values = selectedItem;
    }
  }, [selectedItem, selectedFlatRows]);

useEffect(()=>{
    if (isOpenAddEditModal && selectedFlatRows.length === 1) {
	if(selectedFlatRows[0].original.image !=""){
	setcatImg(`${catImageLivePath}${selectedFlatRows[0].original.image}`);

	}
	}
},[selectedFlatRows, isOpenAddEditModal]);



  // console.log('selectedItem', selectedItem);
  return (
    <Modal className="modal-right" show={isOpenAddEditModal} onHide={() => setIsOpenAddEditModal(false)}>
      <Modal.Header>
        <Modal.Title>{selectedFlatRows.length === 1 ? 'Edit' : 'Add'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form  onSubmit={handleSubmit}>
        <div className="mb-3 mx-auto position-relative" id="imageUpload">
            <img
              src={catImg?`${catImg}`:selectedItem.image ?  `${selectedItem.image}` : '/assets/images/mcc-fav.png'}
              alt="user"
              className="rounded-xl border border-separator-light border-4 sw-11 sh-11"
              id="contactThumbModal"
            />
            <Button size="sm" variant="separator-light" className="btn-icon btn-icon-only position-absolute rounded-xl s-0 b-0" onClick={onThumbChangeClick}>
              <CsLineIcons icon="upload" className="text-alternate" />
            </Button>
            <Form.Control
              type="file"
              name="image"
              id="image"
              ref={refFileUpload}
              className="file-upload d-none"
              accept="image/*"
              onChange={(e) => {
                handleChange(e);
                changeThumb(e);
                setFieldValue("file", e.currentTarget.files[0]);
              }}
            />
            {errors.image && touched.image && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.image}
              </div>
            )}
          </div>
        <div className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control type="text" name="name" defaultValue={selectedItem ? selectedItem.name : values.name} onChange={handleChange} />
            {errors.name && touched.name && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.name}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" as="textarea" name="description" defaultValue={selectedItem ? selectedItem.description : values.description} onChange={handleChange} />
            {errors.description && touched.description && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.description}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Check
              type="radio"
              label="Available"
              value="1"
              id="categoryRadio1"
              name="active"
              checked={(values && values.active == "1") || (selectedItem && selectedItem.active == "1")}
              onChange={(e) => {
                handleChange(e);
                changeActive(e);
              }}
              
            />
            <Form.Check
              type="radio"
              label="Unavailable"
              value="0"
              id="categoryRadio2"
              name="active"
              checked={(values && values.active == "0") || (selectedItem && selectedItem.active == "0")}
              onChange={(e) => {
                handleChange(e);
                changeActive(e);
              }}
            />
            {errors.active && touched.active && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.active}
              </div>
            )}
          </div>
          <div className="mb-3">
          <Button variant="outline-primary" onClick={() => setIsOpenAddEditModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" type="Submit">
          {selectedFlatRows.length === 1 ? 'Done' : 'Add'}
        </Button>
        </div>
        </Form>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
};

export default BarCategoryAddEdit;
