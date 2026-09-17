import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SubCategoryAddEdit = ({ tableInstance, addItem, editItem }) => {
  const { selectedFlatRows, data, currentCat, setIsOpenAddEditModal, isOpenAddEditModal, catData } = tableInstance;
  const emptyItem = { sub_id: '', cat_id: currentCat, sub_name: '', sub_desc: '', active: "0" };
  const [selectedItem, setSelectedItem] = useState(emptyItem);
  const validationSchema = Yup.object().shape({
    sub_name: Yup.string().required('Category Name is required'),
    sub_desc: Yup.string().required('Description is required'),
    active: Yup.string().required('Status is required'),
    cat_id: Yup.string().required('Parent Category is required'),
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
    if (event.target.checked) {
      setSelectedItem({ ...selectedItem, active: event.target.value });
    }
  };

  useEffect(() => {
    if (selectedFlatRows.length === 1) {
      // get user and set form fields
      const fields = ['sub_id', 'cat_id', 'sub_name', 'sub_desc', 'active'];
      fields.forEach((field) => {
        // console.log('selectedItem', selectedItem[field]);
        setFieldValue(field, selectedItem[field], false);
      });
      // values = selectedItem;
    }
  }, [selectedItem, selectedFlatRows]);

  return (
    <Modal className="modal-right" show={isOpenAddEditModal} onHide={() => setIsOpenAddEditModal(false)}>
      <Modal.Header>
        <Modal.Title>{selectedFlatRows.length === 1 ? 'Edit' : 'Add'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Form.Label>Sub Category Name</Form.Label>
            <Form.Control type="text" name="sub_name" defaultValue={selectedItem ? selectedItem.sub_name : values.sub_name} onChange={handleChange} />
            {errors.sub_name && touched.sub_name && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.sub_name}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Category</Form.Label>
            {/* <Form.Control type="text" name="cat_id" defaultValue={selectedItem ? selectedItem.cat_id :  values.cat_id} onChange={handleChange} /> */}
            <Form.Select value={selectedItem ? selectedItem.cat_id:values.cat_id} name="cat_id" onChange={handleChange}>
            <option key="0" value="">Select any Category</option>
              {catData.map((x, y) => (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              ))}
            </Form.Select>

            {errors.cat_id && touched.cat_id && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.cat_id}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              name="sub_desc"
              defaultValue={selectedItem ? selectedItem.sub_desc : values.sub_desc}
              onChange={handleChange}
            />
            {errors.sub_desc && touched.sub_desc && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.sub_desc}
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
              checked={(values && values.active === "1") || (selectedItem && selectedItem.active === "1")}
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
              checked={(values && values.active === "0") || (selectedItem && selectedItem.active === "0")}
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

export default SubCategoryAddEdit;
