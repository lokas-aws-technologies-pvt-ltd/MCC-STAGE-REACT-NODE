/* eslint-disable eqeqeq */
import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { SERVICE_URL, API_URL } from 'config.js';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { imageupload } from 'constants.js';
import CsLineIcons from 'cs-line-icons/CsLineIcons';


const ImageUploadAddEdit = ({ tableInstance, addItem, editItem }) => {
  const { selectedFlatRows, data, setIsOpenAddEditModal, isOpenAddEditModal } = tableInstance;
  const emptyItem = { id: '', category: '', name: '' };
  const [selectedItem, setSelectedItem] = useState(emptyItem);
  const [catData, setCatData] = useState([]);
  const refFileUpload = useRef(null);
  const [menuImg, setMenuImg] = useState('');
  const [selectedcategory, setselectedcategory] = useState('');
  const [imagecounterror, setimagecounterror] = useState('');
  const validationSchema = Yup.object().shape({


    // category: Yup.string().required('Category is required'),
    name: Yup.string().required('Image is required'),
    category: Yup.string()
      .required('Category is required')
      .test(
        'Check image count',
        'Image count exceeded...', // <- key, message   values.banquethall 
        function (value) {
          return new Promise((resolve, reject) => {
            axios
              .get(`${API_URL}general/check_image_category_count`, { params: { category: value, type: selectedFlatRows.length } })
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

  });




  const fetchCategoryData = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const response = await axios.get(`${API_URL}general/image_category_get`);

    setTimeout(() => {
      const { result } = response.data;
      setCatData(result);
      document.body.classList.remove('spinner');
    }, 1000);
  }, []);



  const onSubmit = async (values, { resetForm }) => {
    // console.log('submit form', values);
    const response = await axios.get(`${API_URL}general/check_image_category_count`, { params: { category: selectedcategory, type: selectedFlatRows.length } });

    if (selectedFlatRows.length === 1) {
      editItem({ item: values });
      setSelectedItem(emptyItem);
      resetForm({ values: '' });
      setIsOpenAddEditModal(false);

    } else  if (response.data.success === 0) {

        addItem({ item: values });
        setSelectedItem(emptyItem);
        resetForm({ values: '' });
        setIsOpenAddEditModal(false);
      }
      else
        setimagecounterror('1');

    

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
  const initialValues = selectedItem;
  // console.log('initialValues', initialValues);
  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, setFieldValue, values, touched, errors } = formik;

  const changeCategory = (event) => {
    setSelectedItem({ ...selectedItem, category: event.target.value });
    setimagecounterror('');
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const onThumbChangeClick = () => {
    if (refFileUpload) {
      refFileUpload.current.dispatchEvent(new MouseEvent('click'));
    }
  };
  const changeThumb = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setSelectedItem({ ...selectedItem, name: loadEvent.target.result });
        setMenuImg(loadEvent.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (selectedFlatRows.length === 1) {
      // get user and set form fields
      const fields = ['id', 'category', 'name'];
      fields.forEach((field) => {
        // console.log('selectedItem', selectedItem[field]);
        setFieldValue(field, selectedItem[field], false);
      });
      // values = selectedItem;
    }
  }, [selectedItem, selectedFlatRows]);

  useEffect(() => {
    if (isOpenAddEditModal && selectedFlatRows.length === 1) {
      if (selectedFlatRows[0].original.name != '') {
        setMenuImg(`${imageupload}${selectedFlatRows[0].original.name}`);
      }
    }
  }, [selectedFlatRows, isOpenAddEditModal]);

  useEffect(() => {
    console.log(selectedcategory);// fetchmenuitem();


  }, [selectedcategory, imagecounterror]);

  return (
    <Modal className="modal-right" show={isOpenAddEditModal} onHide={() => {
      formik.resetForm({ values: '' }); 
      setimagecounterror('');     
      setIsOpenAddEditModal(false)}}>
      <Modal.Header>
        <Modal.Title>{selectedFlatRows.length === 1 ? 'Edit' : 'Add'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Control type="hidden" name="id" defaultValue={selectedItem ? selectedItem.id : ''} />

          <div className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select value={values ? values.category : selectedItem.category} name="category" onChange={(e) => {
              setFieldValue("category", e.target.value);
              setselectedcategory(e.target.value)
              changeCategory(e);
              // handleChange(e);              



            }}>
              <option key="0" value="">
                Select any Category
              </option>
              {catData.map((x, y) => (
                <option key={x.id} value={x.id}>
                  {x.name} ({x.size})
                </option>
              ))}
            </Form.Select>
            {errors.category && touched.category && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                {errors.category}
              </div>
            )}

            {imagecounterror == '1' && (
              <div style={{ position: 'relative' }} className="d-block invalid-tooltip">
                Image limit is exceeded...
              </div>
            )}

          </div>




          <div className="mb-3">
            |    <div className="mb-6 mx-auto position-relative" id="imageUpload">

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
                name="name"
                id="name"
                ref={refFileUpload}
                className="file-upload d-none"
                accept="image/*"
                onChange={(e) => {
                  handleChange(e);
                  changeThumb(e);
                  setFieldValue('name_file', e.currentTarget.files[0]);
                }}
              />
              {errors.name && touched.name && (
                <div ref={element => { if (element) element.style.setProperty('width', '100%', 'important'); }} className="d-block invalid-tooltip">
                  {errors.name}
                </div>
              )}

            </div>


          </div>



          <div className="mb-3">
            <Button variant="outline-primary" onClick={() => { 
            formik.resetForm({ values: '' }); 
            setimagecounterror('');     
            setIsOpenAddEditModal(false)}}>
              Cancel
            </Button>&nbsp;&nbsp;
            <Button variant="primary" type="submit">
              {selectedFlatRows.length === 1 ? 'Done' : 'Add'}
            </Button>&nbsp;&nbsp;

            

          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer />

    </Modal>
  );
};

export default ImageUploadAddEdit;
