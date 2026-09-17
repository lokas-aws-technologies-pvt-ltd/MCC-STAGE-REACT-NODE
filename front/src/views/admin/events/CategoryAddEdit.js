/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import * as Yup from 'yup';

const CategoryAddEdit = ({ tableInstance, addItem, editItem }) => {
  const { selectedFlatRows, data, parentCats, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;
  const emptyItem = { id: '', cat_name: '', parent_id: '0', cat_description: '', cat_status: '0' };
  const [selectedItem, setSelectedItem] = useState(emptyItem);
  const validationSchema = Yup.object().shape({
    cat_name: Yup.string().required('Category Name is required'),
    parent_id: Yup.string().required('Parent Category is required'),
    cat_description: Yup.string().required('Description is required'),
    cat_status: Yup.string().required('Status is required'),
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

  useEffect(() => {
    if (isOpenAddEditModal && selectedFlatRows.length === 1) {
      // console.log(selectedFlatRows[0].original.image);
      setSelectedItem(selectedFlatRows[0].original);
    } else {
      setSelectedItem(emptyItem);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenAddEditModal, selectedFlatRows]);
  const initialValues = selectedItem;

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, setFieldValue, values, touched, errors } = formik;

  const changeActive = (event) => {
    // console.log('event', event.target.value);
    if (event.target.checked) {
      setSelectedItem({ ...selectedItem, active: event.target.value });
    }
  };

  useEffect(() => {
    if (selectedFlatRows.length === 1) {
      // get user and set form fields
      const fields = ['id', 'cat_name', 'parent_id', 'cat_description', 'cat_status'];
      fields.forEach((field) => {
        // console.log( 'selectedItem', selectedItem[field]);
        setFieldValue(field, selectedItem[field], false);
      });
      // values = selectedItem;
    }
  }, [selectedItem, selectedFlatRows]);

   // console.log('values', values);
  return (
    <Modal className="modal-right" show={isOpenAddEditModal} onHide={() => setIsOpenAddEditModal(false)}>
      <Modal.Header>
        <Modal.Title>{selectedFlatRows.length === 1 ? 'Edit' : 'Add'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control type="text" name="cat_name" defaultValue={selectedItem ? selectedItem.cat_name : values.cat_name} onChange={handleChange} />
            {errors.cat_name && touched.cat_name && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.cat_name}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Parent Category</Form.Label>
            <Form.Select value={values ? values.parent_id : selectedItem.parent_id} name="parent_id" onChange={handleChange}>
              <option key="0" value="">
                Select any Category
              </option>
              <option key="99999" value="0">
                Parent Category
              </option>
              {parentCats &&
                parentCats.map((x, y) =>
                  x.parent_id == 0 ? (
                    <option key={x.id} value={x.id}>
                      {x.cat_name}
                    </option>
                  ) : (
                    ''
                  )
                )}
            </Form.Select>
            {errors.parent_id && touched.parent_id && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.parent_id}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              name="cat_description"
              defaultValue={selectedItem ? selectedItem.cat_description : values.cat_description}
              onChange={handleChange}
            />
            {errors.cat_description && touched.description && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.cat_description}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Check
              type="radio"
              label="Active"
              value="1"
              id="categoryRadio1"
              name="cat_status"
              checked={(values && values.cat_status == '1') || (selectedItem && selectedItem.cat_status == '1')}
              onChange={(e) => {
                handleChange(e);
                changeActive(e);
              }}
            />
            <Form.Check
              type="radio"
              label="Inactive"
              value="0"
              id="categoryRadio2"
              name="cat_status"
              checked={(values && values.cat_status == '0') || (selectedItem && selectedItem.cat_status == '0')}
              onChange={(e) => {
                handleChange(e);
                changeActive(e);
              }}
            />
            {errors.cat_status && touched.cat_status && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.cat_status}
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

export default CategoryAddEdit;
