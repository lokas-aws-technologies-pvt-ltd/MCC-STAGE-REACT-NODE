/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const BanquetMenuAddEdit = ({ tableInstance, addItem, editItem }) => {
  const { selectedFlatRows, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;
  const emptyItem = {
    banquet_menu_id: '',
    banquet_menu_name: '',
    banquet_menu_desc:'',
    banquet_menu_cost: '',
    no_veg_dish: '0',
    no_non_veg_dish: '0',
    no_bread: '0',
    no_rice: '0',
    no_salad: '0',
    no_curd_pickle: '0',
    no_icecream: '0',
    no_fish: '0',
    fish_addon_cost: '0',
    banquet_menu_status: '0',
    banquet_menu_type: 'N'
  };
  const [selectedItem, setSelectedItem] = useState(emptyItem);

  const validationSchema = Yup.object().shape({
    banquet_menu_name: Yup.string().required('Banquet Menu Name is required'),
    banquet_menu_desc: Yup.string().required('Banquet Menu Description is required'),
    banquet_menu_cost: Yup.string().required('Veg / Non-veg is required'),
    no_veg_dish: Yup.number().positive().required('Status is required'),
    no_non_veg_dish: Yup.number().positive().required('Category is required'),
    no_bread: Yup.number().positive().required('Sub Category is required'),
    no_rice: Yup.number().positive().required('Description is required'),
    no_salad: Yup.number().positive().required('Price is required'),
    no_curd_pickle: Yup.number().positive().required('Price is required'),
    no_icecream: Yup.number().positive().required('Price is required'),
    // no_fish: Yup.number().positive().required('Price is required'),
    fish_addon_cost: Yup.string().required('Price is required'),
    banquet_menu_status: Yup.number().positive().required('Price is required'),
    banquet_menu_type: Yup.string().required('Type is required'),
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
      setSelectedItem({ ...selectedItem, banquet_menu_status: event.target.value });
    }
  };

  const changetype = (event) => {
    if (event.target.checked) {
      setSelectedItem({ ...selectedItem, banquet_menu_type: event.target.value });
    }
  };

  useEffect(() => {
    if (selectedFlatRows.length === 1) {
      // get user and set form fields
      const fields = [
        'banquet_menu_id',
        'banquet_menu_name',
        'banquet_menu_desc',
        'banquet_menu_cost',
        'no_veg_dish',
        'no_non_veg_dish',
        'no_bread',
        'no_rice',
        'no_salad',
        'no_curd_pickle',
        'no_icecream',
         'no_fish',
        'fish_addon_cost',
        'banquet_menu_status',
        'banquet_menu_type'
      ];
      fields.forEach((field) => {
        // console.log('selectedItem', selectedItem[field]);
        setFieldValue(field, selectedItem[field], false);
      });
      // values = selectedItem;
    }
  }, [selectedItem, selectedFlatRows]);

  // console.log('selectedItem', selectedItem);
  return (
    <Modal className="modal-right" show={isOpenAddEditModal} onHide={() => setIsOpenAddEditModal(false)}>
      <Modal.Header>
        <Modal.Title>{selectedFlatRows.length === 1 ? 'Edit' : 'Add'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Form.Label>Banquet Menu Name</Form.Label>
            <Form.Control
              type="text"
              name="banquet_menu_name"
              defaultValue={selectedItem ? selectedItem.banquet_menu_name : values.banquet_menu_name}
              onChange={handleChange}
            />

            {errors.banquet_menu_name && touched.banquet_menu_name && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.banquet_menu_name}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Banquet Menu Description</Form.Label>
            <Form.Control
              type="text"
              name="banquet_menu_desc"
              as="textarea"
              defaultValue={selectedItem ? selectedItem.banquet_menu_desc : values.banquet_menu_desc}
              onChange={handleChange}
            />

            {errors.banquet_menu_desc && touched.banquet_menu_desc && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.banquet_menu_desc}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Cost / Plate</Form.Label>
            <Form.Control
              type="text"
              readOnly
              name="banquet_menu_cost"
              defaultValue={selectedItem ? selectedItem.banquet_menu_cost : values.banquet_menu_cost}
              onChange={handleChange}
            />
            {errors.banquet_menu_cost && touched.banquet_menu_cost && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.banquet_menu_cost}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>No of Veg Dishes</Form.Label>
            <Form.Control type="text" name="no_veg_dish" value={values ? values.no_veg_dish : selectedItem.no_veg_dish} onChange={handleChange} />
            {errors.no_veg_dish && touched.no_veg_dish && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.no_veg_dish}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>No of Non-veg Dishes</Form.Label>
            <Form.Control type="text" name="no_non_veg_dish" value={values ? values.no_non_veg_dish : selectedItem.no_non_veg_dish} onChange={handleChange} />
            {errors.no_non_veg_dish && touched.no_non_veg_dish && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.no_non_veg_dish}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>No of Breads</Form.Label>
            <Form.Control type="text" name="no_bread" value={values ? values.no_bread : selectedItem.no_bread} onChange={handleChange} />
            {errors.no_bread && touched.no_bread && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.no_bread}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>No of Rices</Form.Label>
            <Form.Control type="text" name="no_rice" value={values ? values.no_rice : selectedItem.no_rice} onChange={handleChange} />
            {errors.no_rice && touched.no_rice && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.no_rice}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>No of Salads</Form.Label>
            <Form.Control type="text" name="no_salad" value={values ? values.no_salad : selectedItem.no_salad} onChange={handleChange} />
            {errors.no_salad && touched.no_salad && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.no_salad}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>No of Curd Rice with Pickle</Form.Label>
            <Form.Control type="text" name="no_curd_pickle" value={values ? values.no_curd_pickle : selectedItem.no_curd_pickle} onChange={handleChange} />
            {errors.no_curd_pickle && touched.no_curd_pickle && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.no_curd_pickle}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>No of Ice Creams</Form.Label>
            <Form.Control type="text" name="no_icecream" value={values ? values.no_icecream : selectedItem.no_icecream} onChange={handleChange} />
            {errors.no_icecream && touched.no_icecream && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.no_icecream}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>No of Fish Items</Form.Label>
            <Form.Control type="text" name="no_fish" value={values ? values.no_fish : selectedItem.no_fish} onChange={handleChange} />
            {errors.no_fish && touched.no_fish && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.no_fish}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Fish Dish Addon Cost</Form.Label>
            <Form.Control type="text" name="fish_addon_cost" value={values ? values.fish_addon_cost : selectedItem.fish_addon_cost} onChange={handleChange} />
            {errors.fish_addon_cost && touched.fish_addon_cost && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.fish_addon_cost}
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
              name="banquet_menu_status"
              // eslint-disable-next-line eqeqeq
              checked={(values && values.banquet_menu_status == 1) || (selectedItem && selectedItem.banquet_menu_status == 1)}
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
              name="banquet_menu_status"
              // eslint-disable-next-line eqeqeq
              checked={(values && values.banquet_menu_status == 0) || (selectedItem && selectedItem.banquet_menu_status == 0)}
              onChange={(e) => {
                handleChange(e);
                changeActive(e);
              }}
            />
            {errors.banquet_menu_status && touched.banquet_menu_status && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.banquet_menu_status}
              </div>
            )}
          </div>

          <div className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Check
              type="radio"
              label="Veg"
              value="V"
              id="typeRadio1"
              name="banquet_menu_type"
              // eslint-disable-next-line eqeqeq
              checked={(values && values.banquet_menu_type == 'V') || (selectedItem && selectedItem.banquet_menu_type == 'V')}
              onChange={(e) => {
                handleChange(e);
                changetype(e);
              }}
            />
            <Form.Check
              type="radio"
              label="Non-veg"
              value="N"
              id="typeRadio2"
              name="banquet_menu_type"
              // eslint-disable-next-line eqeqeq
              checked={(values && values.banquet_menu_type == 'N') || (selectedItem && selectedItem.banquet_menu_type == 'N')}
              onChange={(e) => {
                handleChange(e);
                changetype(e);
              }}
            />
            {errors.banquet_menu_type && touched.banquet_menu_type && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.banquet_menu_type}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Button variant="outline-primary" onClick={() => setIsOpenAddEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {selectedFlatRows.length === 1 ? 'Done' : 'Add'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
};

export default BanquetMenuAddEdit;
