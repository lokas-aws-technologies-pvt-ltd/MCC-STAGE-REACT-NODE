/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';
import { API_URL } from 'config.js';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { catImageLivePath, itemImageLivePath } from 'constants.js';

const BarMenuAddEdit = ({ tableInstance, addItem, editItem }) => {
  const { selectedFlatRows, data, catData, catSubData, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;
  const emptyItem = {
    item_image: '',
    item_id: '',
    item_name: '',
    availability_time: '',
    cat_id: 0,
    sub_cat_id: 0,
    varient: 'V',
    active: 0,
    description: '',
    price: '',
  };
  const [selectedItem, setSelectedItem] = useState(emptyItem);
  const [menuImg, setMenuImg] = useState('');
  const [subCat, setSubCat] = useState([]);
  const refFileUpload = useRef(null);
  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
  const validationSchema = Yup.object().shape({
    item_name: Yup.string().required('Food Item Name is required'),
    varient: Yup.string().required('Veg / Non-veg is required'),
    active: Yup.string().required('Status is required'),
    cat_id: Yup.string().required('Category is required'),
    sub_cat_id: Yup.string().required('Sub Category is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required'),
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
        setSelectedItem({ ...selectedItem, item_image: loadEvent.target.result });
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
    setIsOpenAddEditModal(false);
  };
  const updateImagePath = (selectRows) => {
    // console.log('updateimagepath',selectedItem);
    if (selectRows[0].original.item_image != '') {
      // setSelectedItem({ ...selectedItem, {item_image: `${itemImageLivePath}${selectRows[0].original.item_image}`} });
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
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenAddEditModal, selectedFlatRows]);
  useEffect(() => {
    if (isOpenAddEditModal && selectedFlatRows.length === 1) {
      if (selectedFlatRows[0].original.item_image != '') {
        setMenuImg(`${itemImageLivePath}${selectedFlatRows[0].original.item_image}`);
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
  const fetchSubCategoryData = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const catId = values.cat_id;
    console.log('catId', catId);
    const response = await axios.get(`${API_URL}bar/sub_category_get`, { params: { catid: catId } });

    setTimeout(() => {
      const { result } = response.data;
      setSubCat(result);
      document.body.classList.remove('spinner');
    }, 1000);
  }, [values.cat_id]);
  useEffect(() => {
    if (values.cat_id > 0) {
      fetchSubCategoryData();
    }
  }, [fetchSubCategoryData, values.cat_id]);
  const changeActive = (event) => {
    if (event.target.checked) {
      setSelectedItem({ ...selectedItem, active: event.target.value });
    }
  };
  const changeVarient = (event) => {
    if (event.target.checked) {
      setSelectedItem({ ...selectedItem, varient: event.target.value });
    }
  };

  useEffect(() => {
    if (selectedFlatRows.length === 1) {
      // get user and set form fields
      const fields = ['item_image', 'item_id', 'item_name', 'cat_id','sub_cat_id', 'varient', 'active', 'description', 'price', 'availability_time'];
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
          <div className="mb-3 mx-auto position-relative" id="imageUpload">
            <img
              src={menuImg ? `${menuImg}` : selectedItem.item_image ? `${selectedItem.item_image}` : '/assets/images/mcc-fav.png'}
              alt="user"
              className="rounded-xl border border-separator-light border-4 sw-11 sh-11"
              id="contactThumbModal"
            />
            <Button size="sm" variant="separator-light" className="btn-icon btn-icon-only position-absolute rounded-xl s-0 b-0" onClick={onThumbChangeClick}>
              <CsLineIcons icon="upload" className="text-alternate" />
            </Button>
            <Form.Control
              type="file"
              name="item_image"
              id="item_image"
              ref={refFileUpload}
              className="file-upload d-none"
              accept="image/*"
              onChange={(e) => {
                handleChange(e);
                changeThumb(e);
                setFieldValue('file', e.currentTarget.files[0]);
              }}
            />
            {errors.item_image && touched.item_image && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.item_image}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Bar Item Name</Form.Label>
            <Form.Control type="text" name="item_name" defaultValue={selectedItem ? selectedItem.item_name : values.item_name} onChange={handleChange} />

            {errors.item_name && touched.item_name && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.item_name}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" name="price" defaultValue={selectedItem ? selectedItem.price : values.price} onChange={handleChange} />
            {errors.price && touched.price && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.price}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label>Bar Category</Form.Label>
            <Form.Select value={values ? values.cat_id : selectedItem.cat_id} name="cat_id" onChange={handleChange}>
              <option key="0" value="">
                Select any Category
              </option>
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
            <Form.Label>Bar Sub Category</Form.Label>
            <Form.Select value={values ? values.sub_cat_id : selectedItem.sub_cat_id} name="sub_cat_id" onChange={handleChange}>
              <option key="0" value="">
                Select any Category
              </option>
              {subCat.map((x, y) => (
                <option key={x.sub_id} value={x.sub_id}>
                  {x.sub_name}
                </option>
              ))}
            </Form.Select>
            {errors.sub_cat_id && touched.sub_cat_id && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.sub_cat_id}
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
              // eslint-disable-next-line eqeqeq
              checked={(values && values.active == 1) || (selectedItem && selectedItem.active == 1)}
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
              // eslint-disable-next-line eqeqeq
              checked={(values && values.active == 0) || (selectedItem && selectedItem.active == 0)}
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

          {/* <div className="mb-3">
            <Form.Label>Veg / Non-Veg</Form.Label>
            <Form.Check
              type="radio"
              label="Veg"
              value="V"
              id="categoryRadio3"
              name="varient"
              checked={(values && values.varient === 'V') || (selectedItem && selectedItem.varient === 'V')}
              onChange={(e) => {
                handleChange(e);
                changeVarient(e);
              }}
            />
            <Form.Check
              type="radio"
              label="Non-Veg"
              value="N"
              id="categoryRadio4"
              name="varient"
              checked={(values && values.varient === 'N') || (selectedItem && selectedItem.varient === 'N')}
              onChange={(e) => {
                handleChange(e);
                changeVarient(e);
              }}
            />
            {errors.varient && touched.varient && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.varient}
              </div>
            )}
          </div>
              */}
          <div className="mb-3">
            <Form.Label>Availablity Time</Form.Label>
            <Form.Control
              type="text"
              name="availability_time"
              defaultValue={selectedItem ? selectedItem.availability_time : values.availability_time}
              onChange={handleChange}
            />

            {errors.availability_time && touched.availability_time && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.availability_time}
              </div>
            )}
          </div>

          <div className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="description" as="textarea" defaultValue={selectedItem ? selectedItem.description : ''} onChange={handleChange} />
            {errors.description && touched.description && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.description}
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

export default BarMenuAddEdit;
